<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Book;
use App\Models\ShippingService;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use function PHPUnit\Framework\returnArgument;

class TransactionController extends Controller
{
    //
    public function index()
    {
        $user = auth('api')->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized!'
            ], 401);
        }

        // ADMIN -> semua transaksi
        if ($user->role === 'admin') {

            $transactions = Transaction::with([
                'user',
                'book',
                'address',
                'shippingService.courier'
            ])
                ->latest()
                ->get();
        }

        // CUSTOMER -> transaksi miliknya
        else {

            $transactions = Transaction::with([
                'book',
                'address',
                'shippingService.courier'
            ])
                ->where('customer_id', $user->id)
                ->latest()
                ->get();
        }

        return response()->json([
            "success" => true,
            "message" => "Get transactions",
            "data" => $transactions
        ], 200);
    }

    // SHOW DETAIL TRANSACTION
    public function show(string $id)
    {
        $transaction = Transaction::with([
            'user',
            'book',
            'address',
            'shippingService.courier'
        ])->find($id);

        if (!$transaction) {
            return response()->json([
                "success" => false,
                "message" => "Resource not found"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Get detail resource",
            "data" => $transaction
        ], 200);
    }

    // CREATE TRANSACTION
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'book_id' => 'required|exists:books,id',
            'quantity' => 'required|integer|min:1',

            'address_id' => 'required|exists:addresses,id',
            'shipping_service_id' => 'required|exists:shipping_services,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => 'Validator Error',
                "data" => $validator->errors()
            ], 422);
        }

        $user = auth('api')->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized!'
            ], 401);
        }

        $book = Book::find($request->book_id);

        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Book not found'
            ], 404);
        }

        // CHECK STOCK
        if ($book->stock < $request->quantity) {
            return response()->json([
                'success' => false,
                'message' => 'Stok barang tidak cukup!'
            ], 400);
        }

        // GET ADDRESS
        $address = Address::find($request->address_id);

        if (!$address) {
            return response()->json([
                'success' => false,
                'message' => 'Address not found'
            ], 404);
        }

        // GET SHIPPING SERVICE
        $shippingService = ShippingService::with('courier')
            ->find($request->shipping_service_id);

        if (!$shippingService) {
            return response()->json([
                'success' => false,
                'message' => 'Shipping service not found'
            ], 404);
        }

        // CALCULATE
        $subtotal = $book->price * $request->quantity;

        $shippingCost = $shippingService->price;

        $grandTotal = $subtotal + $shippingCost;

        // REDUCE STOCK
        $book->stock -= $request->quantity;
        $book->save();

        // CREATE TRANSACTION
        $transaction = Transaction::create([
            'order_number' => 'ORDER-' . time(),

            'customer_id' => $user->id,

            'address_id' => $address->id,
            'shipping_service_id' => $shippingService->id,

            'book_id' => $request->book_id,
            'quantity' => $request->quantity,

            'subtotal' => $subtotal,
            'shipping_cost' => $shippingCost,
            'total_amount' => $grandTotal,

            // SIMPAN SNAPSHOT SHIPPING
            'shipping_courier' => $shippingService->courier->name,
            'shipping_service' => $shippingService->service_name,
            'shipping_etd' => $shippingService->estimation,

            // SIMPAN SNAPSHOT ADDRESS
            'receiver_name' => $address->receiver_name,
            'phone' => $address->phone,

            'province' => $address->province,
            'city' => $address->city,
            'district' => $address->district,
            'postal_code' => $address->postal_code,
            'full_address' => $address->full_address,

            'transaction_status' => 'pending',
            'shipping_status' => 'pending',
            'payment_status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Transaction created successfully',
            'data' => $transaction
        ], 201);
    }

    // UPDATE TRANSACTION
    public function update(Request $request, string $id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json([
                "success" => false,
                "message" => "Resource not found"
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'transaction_status' => 'nullable|in:pending,paid,processed,shipped,completed,cancelled',
            'payment_status' => 'nullable|in:pending,paid,failed',
            'shipping_status' => 'nullable|in:pending,processed,shipped,delivered',
            'tracking_number' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => "Validator Error",
                "data" => $validator->errors()
            ], 422);
        }

        $transaction->update([
            'transaction_status' => $request->transaction_status ?? $transaction->transaction_status,
            'payment_status' => $request->payment_status ?? $transaction->payment_status,
            'shipping_status' => $request->shipping_status ?? $transaction->shipping_status,
            'tracking_number' => $request->tracking_number ?? $transaction->tracking_number,
        ]);

        return response()->json([
            "success" => true,
            "message" => "Transaction updated successfully",
            "data" => $transaction
        ], 200);
    }

    // DELETE TRANSACTION
    public function destroy(string $id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json([
                "success" => false,
                "message" => "Resource not found"
            ], 404);
        }

        // RETURN STOCK
        $book = Book::find($transaction->book_id);

        if ($book) {
            $book->stock += $transaction->quantity;
            $book->save();
        }

        $transaction->delete();

        return response()->json([
            "success" => true,
            "message" => "Delete resource successfully"
        ], 200);
    }
}
