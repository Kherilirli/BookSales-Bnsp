<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    //
    public function index(Request $request) {
        $carts = Cart::with('book')
            ->where('user_id', $request->user()->id)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $carts
        ]);
    }

    // ADD TO CART
    public function store(Request $request) {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = Cart::where('user_id', $request->user()->id)
            ->where('book_id', $request->book_id)
            ->first();

        // jika buku sudah ada di cart
        if ($cart) {
            $cart->quantity += $request->quantity;
            $cart->save();
        } else {
            $cart = Cart::create([
                'user_id' => $request->user()->id,
                'book_id' => $request->book_id,
                'quantity' => $request->quantity
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Added to cart',
            'data' => $cart
        ]);
    }

    public function show(Request $request , string $id) {
        $cart = Cart::with('book')
            ->where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$cart) {
            return response()->json([
                'success' => false,
                'message' => 'Cart not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $cart
        ]);
    }

    public function update(Request $request, string $id) {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = Cart::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$cart) {
            return response()->json([
                'success' => false,
                'message' => 'Cart not found'
            ], 404);
        }

        $cart->update([
            'quantity' => $request->quantity
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Cart updated',
            'data' => $cart
        ]);
    }

    // DELETE CART ITEM
    public function destroy(Request $request, string $id) {
        $cart = Cart::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$cart) {
            return response()->json([
                'success' => false,
                'message' => 'Cart not found'
            ], 404);
        }

        $cart->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item removed'
        ]);
    }
}
