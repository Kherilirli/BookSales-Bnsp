<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use function PHPUnit\Framework\returnArgument;

class GenreController extends Controller
{
    //
    public function index() {
        $genres = Genre::all();

        if ($genres->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resource data not found",
            ]);
        }

        return response()->json([
            "success" => true,
            "message" => "Get all genres",
            "data" => $genres
        ], 200);
    }

    public function store(Request $request) {
        //validator
        $validator = Validator::make($request->all(), [
            "name" => "required|string|max:100",
            "description" => "required|string"
        ]);

        //cek validation
        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => $validator->errors()
            ], 422);
        }

        //tambah data
        $genres = Genre::create([
            "name" => $request->name,
            "description" => $request->description
        ]);

        //response
        return response()->json([
            "success" => true,
            "message" => "Genre created successfully",
            "data" => $genres
        ], 201);
    }

    public function show(string $id) {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                "success" => false,
                "message" => "Resource not found"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Get detail resource",
            "data" => $genre
        ], 200);
    }

    public function update(string $id, Request $request) {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                "success" => false,
                "message" => "Resource not found"
            ], 404);
        }

        // validator
        $validator = Validator::make($request->all(), [
            "name" => "required|string|max:100",
            "description" => "required|string"
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => $validator->errors()
            ], 422);
        }

        // update data
        $genre->update([
            "name" => $request->name,
            "description" => $request->description
        ]);

        return response()->json([
            "success" => true,
            "message" => "Resource updated successfully",
            "data" => $genre
        ], 200);
    }

    public function destroy(string $id) {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                "success" => false,
                "message" => "Resource not found"
            ], 404);
        }

        $genre->delete();

        return response()->json([
            "success" => true,
            "message" => "Delete resource successfully"
        ], 200);
    }
}
