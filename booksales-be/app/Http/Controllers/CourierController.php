<?php

namespace App\Http\Controllers;

use App\Models\Courier;
use Illuminate\Http\Request;

class CourierController extends Controller
{
    //
    public function index() {
        $couriers = Courier::where('is_active', true)
            ->with('services')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $couriers
        ]);
    }
}
