<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Cart;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Snap;

class PaymentController extends Controller
{
    private function midtransConfig()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }

    /*
    |--------------------------------------------------------------------------
    | BUY NOW
    |--------------------------------------------------------------------------
    */
    public function checkoutBuyNow(Request $request) {
        $this->midtransConfig();

        $request->validate([
            'book_id' => 'required|exists:books,id',
            'quantity' => 'required|integer|min:1',

            'address_id' => 'required|exists:addresses,id',
            'shipping_service_id' => 'required|exists:shipping_services,id',
        ]);

        $user = auth()->guard('api')->user();

        $book = Book::find($request->book_id);

        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Book tidak ditemukan'
            ], 404);
        }

        // VALIDASI STOCK
        if ($book->stock < $request->quantity) {
            return response()->json([
                'success' => false,
                'message' => 'Stock buku tidak cukup'
            ], 400);
        }

        // GET ADDRESS
        $address = \App\Models\Address::find($request->address_id);

        if (!$address) {
            return response()->json([
                'success' => false,
                'message' => 'Address tidak ditemukan'
            ], 404);
        }

        // GET SHIPPING SERVICE
        $shippingService = \App\Models\ShippingService::with('courier')
            ->find($request->shipping_service_id);

        if (!$shippingService) {
            return response()->json([
                'success' => false,
                'message' => 'Shipping service tidak ditemukan'
            ], 404);
        }

        $quantity = $request->quantity;

        $subtotal = $book->price * $quantity;

        $shippingCost = $shippingService->price;

        $grossAmount = $subtotal + $shippingCost;

        $orderNumber = 'ORDER-' . time();

        // KURANGI STOCK
        $book->stock -= $quantity;
        $book->save();

        // SIMPAN TRANSACTION
        $transaction = Transaction::create([
            'order_number' => $orderNumber,

            'customer_id' => $user->id,

            'book_id' => $book->id,
            'quantity' => $quantity,

            'address_id' => $address->id,
            'shipping_service_id' => $shippingService->id,

            'subtotal' => $subtotal,
            'shipping_cost' => $shippingCost,
            'total_amount' => $grossAmount,

            // SNAPSHOT SHIPPING
            'shipping_courier' => $shippingService->courier->name,
            'shipping_service' => $shippingService->service_name,
            'shipping_etd' => $shippingService->estimation,

            // SNAPSHOT ADDRESS
            'receiver_name' => $address->receiver_name,
            'phone' => $address->phone,

            'province' => $address->province,
            'city' => $address->city,
            'district' => $address->district,
            'postal_code' => $address->postal_code,
            'full_address' => $address->full_address,

            'payment_status' => 'pending',
            'shipping_status' => 'pending',
            'transaction_status' => 'pending',
        ]);

        $params = [
            'transaction_details' => [
                'order_id' => $orderNumber,
                'gross_amount' => (int) $grossAmount,
            ],

            'item_details' => [
                [
                    'id' => $book->id,
                    'price' => (int) $book->price,
                    'quantity' => $quantity,
                    'name' => $book->title,
                ],
                [
                    'id' => 'ONGKIR',
                    'price' => (int) $shippingCost,
                    'quantity' => 1,
                    'name' => 'Ongkos Kirim',
                ]
            ],

            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
            ],
        ];

        $snapToken = Snap::getSnapToken($params);

        return response()->json([
            'success' => true,
            'snap_token' => $snapToken,
            'transaction' => $transaction,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | CART CHECKOUT
    |--------------------------------------------------------------------------
    */
    public function checkoutCart(Request $request) {
        $this->midtransConfig();

        $user = auth()->guard('api')->user();

        // VALIDASI
        $request->validate([
            'items' => 'required|array|min:1',

            'shipping_cost' => 'required|numeric',
            'shipping_courier' => 'required|string',
            'shipping_service' => 'required|string',

            'receiver_name' => 'required|string',
            'phone' => 'required|string',

            'province' => 'required|string',
            'city' => 'required|string',
            'district' => 'required|string',
            'postal_code' => 'required|string',
            'full_address' => 'required|string',
        ]);

        // AMBIL CART IDS DARI ITEMS
        $cartIds = collect($request->items)
            ->pluck('cart_id')
            ->toArray();

        $carts = Cart::with('book')
            ->whereIn('id', $cartIds)
            ->where('user_id', $user->id)
            ->get();

        if ($carts->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Cart kosong'
            ], 400);
        }

        $grossAmount = 0;

        $items = [];

        $transactions = [];

        $orderNumber = 'ORDER-' . time();

        foreach ($carts as $cart) {

            // VALIDASI STOCK
            if ($cart->book->stock < $cart->quantity) {
                return response()->json([
                    'success' => false,
                    'message' => 'Stock buku ' . $cart->book->title . ' tidak cukup'
                ], 400);
            }

            $subtotal = $cart->book->price * $cart->quantity;

            $grossAmount += $subtotal;

            // ITEM MIDTRANS
            $items[] = [
                'id' => $cart->book->id,
                'price' => (int) $cart->book->price,
                'quantity' => $cart->quantity,
                'name' => $cart->book->title,
            ];

            // KURANGI STOCK
            $cart->book->stock -= $cart->quantity;
            $cart->book->save();

            // CREATE TRANSACTION
            $transaction = Transaction::create([
                'order_number' => $orderNumber,
                'customer_id' => $user->id,
                'book_id' => $cart->book_id,
                'quantity' => $cart->quantity,

                'address_id' => $request->address_id,
                'shipping_service_id' => $request->shipping_service_id,

                'shipping_cost' => $request->shipping_cost,
                'shipping_courier' => $request->shipping_courier,
                'shipping_service' => $request->shipping_service,
                'shipping_etd' => $request->shipping_etd,

                'receiver_name' => $request->receiver_name,
                'phone' => $request->phone,

                'province' => $request->province,
                'city' => $request->city,
                'district' => $request->district,
                'postal_code' => $request->postal_code,
                'full_address' => $request->full_address,

                'payment_status' => 'pending',
                'transaction_status' => 'pending',

                'total_amount' => $subtotal + $request->shipping_cost,
            ]);

            $transactions[] = $transaction;
        }

        // ONGKIR
        $grossAmount += $request->shipping_cost;

        $items[] = [
            'id' => 'ONGKIR',
            'price' => (int) $request->shipping_cost,
            'quantity' => 1,
            'name' => 'Ongkos Kirim',
        ];

        // MIDTRANS PARAMS
        $params = [
            'transaction_details' => [
                'order_id' => $orderNumber,
                'gross_amount' => (int) $grossAmount,
            ],

            'item_details' => $items,

            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
            ],
        ];

        $snapToken = Snap::getSnapToken($params);

        return response()->json([
            'success' => true,
            'snap_token' => $snapToken,
            'transactions' => $transactions,
        ]);
    }
}
