<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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

    public function show(string $id) {
        $author = Author::find($id);

        if (!$author) {
            return response()->json([
                "success" => false,
                "message" => "Resource not found"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Get detail resource",
            "data" => $author
        ], 200);
    }

    public function update(string $id, Request $request) {
        $author = Author::find($id);

        if (!$author) {
            return response()->json([
                "success" => false,
                "message" => "Resource not found"
            ], 404);
        }

        // validator
        $validator = Validator::make($request->all(), [
            "name" => "required|string|max:100",
            "photo" => "nullable|image|mimes:jpeg,png,jpg|max:2048",
            "bio" => "required|string"
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => $validator->errors()
            ], 422);
        }

        // data update
        $data = [
            "name" => $request->name,
            "bio" => $request->bio
        ];

        // handle image
        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $image->store('authors', 'public');

            // hapus foto lama
            if ($author->photo) {
                Storage::disk('public')->delete('authors/' . $author->photo);
            }

            $data['photo'] = $image->hashName();
        }

        $author->update($data);

        return response()->json([
            "success" => true,
            "message" => "Resource updated successfully",
            "data" => $author
        ], 200);
    }

    public function destroy(string $id) {
        $author = Author::find($id);

        if (!$author) {
            return response()->json([
                "success" => false,
                "message" => "Resource not found"
            ], 404);
        }

        // hapus file photo
        if ($author->photo) {
            Storage::disk('public')->delete('authors/' . $author->photo);
        }

        $author->delete();

        return response()->json([
            "success" => true,
            "message" => "Delete resource successfully"
        ], 200);
    }
}
