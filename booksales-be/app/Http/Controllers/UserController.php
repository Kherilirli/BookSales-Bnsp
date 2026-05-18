<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function index(){
        $user = auth('api')->user();

        if (!$user || $user->role !== 'admin') {
            return response()->json([
                "success" => false,
                "message" => "Unauthorized"
            ], 403);
        }

        $users = User::latest()->get();

        return response()->json([
            "success" => true,
            "message" => "Get all users",
            "data" => $users
        ], 200);
    }

    // GET DETAIL USER
    public function show(string $id){
        $user = User::with(['transactions.book', 'carts.book'])
            ->find($id);

        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "User not found"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Get detail user",
            "data" => $user
        ], 200);
    }
}
