<?php

namespace App\Http\Controllers;

use App\Models\ShippingService;
use Illuminate\Http\Request;

class ShippingServiceController extends Controller
{
    //
    public function index(Request $request)
    {
        $query = ShippingService::with('courier');

        if ($request->courier_id) {
            $query->where('courier_id', $request->courier_id);
        }

        $services = $query->get();

        return response()->json([
            'success' => true,
            'data' => $services
        ]);
    }

    public function show(string $id)
    {
        $service = ShippingService::with('courier')
            ->find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Shipping service not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $service
        ]);
    }
}
