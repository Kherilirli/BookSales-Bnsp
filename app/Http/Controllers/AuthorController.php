<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthorController extends Controller
{
    //
    public function index() {
        $authors = Author::all();

        if ($authors->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resource data not found",
            ]);
        }

        return response()->json([
            "success" => true,
            "message" => "Get all authors",
            "data" => $authors
        ], 200);
    }

    public function store(Request $request) {
        //validator
        $validator = Validator::make($request->all(), [
            "name" => "required|string|max:100",
            "photo" => "required|image|mimes:jpeg,png,jpg|max:2048",
            "bio" => "required|string"
        ]);

        //cek validation
        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => $validator->errors()
            ], 422);
        }

        //upload image
        $image = $request->file('photo');
        $image->store('authors', 'public');

        //tambah data
        $authors = Author::create([
            "name" => $request->name,
            "photo" => $image->hashName(),
            "bio" => $request->bio
        ]);

        //response
        return response()->json([
            "success" => true,
            "message" => "Author created successfully",
            "data" => $authors
        ], 201);
    }
}
