<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    //
    public function index(Request $request)
    {
        $addresses = Address::where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $addresses
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'receiver_name' => 'required',
            'phone' => 'required',
            'province' => 'required',
            'city' => 'required',
            'district' => 'required',
            'postal_code' => 'required',
            'full_address' => 'required',
        ]);

        $address = Address::create([
            'user_id' => $request->user()->id,
            'receiver_name' => $request->receiver_name,
            'phone' => $request->phone,
            'province' => $request->province,
            'city' => $request->city,
            'district' => $request->district,
            'postal_code' => $request->postal_code,
            'full_address' => $request->full_address,
            'is_default' => false,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Address created',
            'data' => $address
        ]);
    }

    public function update(Request $request, string $id) {
        $request->validate([
            'receiver_name' => 'required',
            'phone' => 'required',
            'province' => 'required',
            'city' => 'required',
            'district' => 'required',
            'postal_code' => 'required',
            'full_address' => 'required',
        ]);

        $address = Address::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$address) {
            return response()->json([
                'success' => false,
                'message' => 'Address not found'
            ], 404);
        }

        $address->update([
            'receiver_name' => $request->receiver_name,
            'phone' => $request->phone,
            'province' => $request->province,
            'city' => $request->city,
            'district' => $request->district,
            'postal_code' => $request->postal_code,
            'full_address' => $request->full_address,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Address updated',
            'data' => $address
        ]);
    }

    public function destroy(Request $request, string $id)
    {
        $address = Address::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$address) {
            return response()->json([
                'success' => false,
                'message' => 'Address not found'
            ], 404);
        }

        $address->delete();

        return response()->json([
            'success' => true,
            'message' => 'Address deleted'
        ]);
    }
}
