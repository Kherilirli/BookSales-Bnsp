<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    //
    public function register(Request $request) {
        //Setup validator
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:8'
        ]);

        //Cek validator
        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //Create User
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        //Cek keberhasilan
        if($user){
            return response()->json([
                'success' => true,
                'message' => 'User created successfully',
                'data' => $user
            ], 201);
        }
        //Cek Gagal
        return response()->json([
            'success' => false,
            'message' => 'User creation faild'
        ], 409); //conflict
    }

    public function login(Request $request) {
        //setup validator
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        //cek validator
        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //get kredensial dari request
        $credentials = $request->only('email', 'password');

        //cek isField
        if(!$token = auth()->guard('api')->attempt($credentials)){
            return response()->json([
                'success' => false,
                'message' => 'Email atau Password Anda salah!'
            ], 401);
        }

        //cek isSuccess
        return response()->json([
            'success' => true,
            'message' => 'Login Successfully',
            'user' => auth()->guard('api')->user(),
            'token' => $token
        ], 200);
    }

    public function logout(Request $request) {
        //try
        //invalidate token
        //cek isSuccess
        //catch
        //cek isfailed

        try{
            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json([
                'success' => true,
                'message' => 'Logout Successfully'
            ], 200);
        } catch(JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Logout Failed!'
            ], 500);
        }
    }
}
