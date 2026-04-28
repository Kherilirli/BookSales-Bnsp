<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use function PHPUnit\Framework\returnArgument;

class TransactionController extends Controller
{
    //
    public function index() {
        $transaction = Transaction::with('user', 'book')->get();

        if ($transaction->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resource data not found",
            ]);
        }

        return response()->json([
            "success" => true,
            "message" => "Get all books",
            "data" => $transaction
        ], 200);
    }

    public function show(string $id){
        $transaction = Transaction::with('user','book')->find($id);

        if(!$transaction){
            return response()->json([
                "success" => false,
                "message" => "Resource not found"
            ],404);
        }

        return response()->json([
            "success" => true,
            "message" => "Get detail resource",
            "data" => $transaction
        ],200);
    }

    public function store(Request $request) {
        //Validator & cek Validator
        $validator = Validator::make($request->all(), [
            'book_id' => 'required|exists:books,id',
            'quantity' => 'required|integer|min:1'
        ]);

        if($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => 'Validator Error',
                "data" => $validator->errors()
            ], 422);
        }

        //generate orderNumber -> unique | ORD-0003
        $uniqueCode = "ORD-" . strtoupper(uniqid());

        //ambil user yang sedang login & cek login
        $user = auth('api')->user();

        if(!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized!'
            ], 401);
        }

        //mencari data buku dari request
        $book = Book::find($request->book_id);

        //cek stock buku
        if($book->stock < $request->quantity) {
            return response()->json([
                'success' => false,
                'message' => 'Stok barang tidak cukup!'
            ], 400);
        }

        //hitung total harga = price * quantity
        $totalAmount = $book->price * $request->quantity;

        //kurangi stock buku
        $book->stock -= $request->quantity;
        $book->save();

        //simpan data transaksi
        $transaction = Transaction::create([
            'order_number' => $uniqueCode,
            'customer_id' => $user->id,
            'book_id' => $request->book_id,
            'total_amount' => $totalAmount
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Transactions created successfully',
            'data' => $transaction
        ], 201);
    }

    public function update(Request $request, string $id) {
        $transaction = Transaction::find($id);

        if(!$transaction){
            return response()->json([
                "success"=>false,
                "message"=>"Resource not found"
            ], 404);
        }

        $validator = Validator::make($request->all(),[
            'book_id'=>'required|exists:books,id',
            'quantity'=>'required|integer|min:1'
        ]);

        if($validator->fails()){
            return response()->json([
                "success"=>false,
                "message"=>"Validator Error",
                "data"=>$validator->errors()
            ], 422);
        }

        $book = Book::find($request->book_id);

        if(!$book){
            return response()->json([
                "success"=>false,
                "message"=>"Book not found"
            ], 404);
        }

        if($book->stock < $request->quantity){
            return response()->json([
                "success"=>false,
                "message"=>"Stock not enough"
            ], 400);
        }

        // hitung total baru
        $totalAmount = $book->price * $request->quantity;

        $transaction->update([
            'book_id' => $request->book_id,
            'total_amount' => $totalAmount
        ]);

        return response()->json([
            "success"=>true,
            "message"=>"Transaction updated successfully",
            "data"=>$transaction
        ], 200);
    }

    public function destroy(string $id) {
        $transaction = Transaction::find($id);

        if(!$transaction){
            return response()->json([
                "success"=>false,
                "message"=>"Resource not found"
            ], 404);
        }

        $book = Book::find($transaction->book_id);

        if($book){
            $book->stock += 1; 
            $book->save();
        }

        $transaction->delete();

        return response()->json([
            "success"=>true,
            "message"=>"Delete resource successfully"
        ],200);
    }
}
