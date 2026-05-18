<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    //
    protected $table = 'transactions';

    protected $fillable = [
        'order_number',
        'customer_id',
        'book_id',
        'quantity',

        'address_id',
        'shipping_service_id',

        'subtotal',
        'shipping_cost',
        'total_amount',

        'shipping_courier',
        'shipping_service',
        'shipping_etd',

        'receiver_name',
        'phone',
        'province',
        'city',
        'district',
        'postal_code',
        'full_address',

        'tracking_number',

        'transaction_status',
        'shipping_status',
        'payment_status',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function book() {
        return $this->belongsTo(Book::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function shippingService()
    {
        return $this->belongsTo(ShippingService::class, 'shipping_service_id');
    }
}
