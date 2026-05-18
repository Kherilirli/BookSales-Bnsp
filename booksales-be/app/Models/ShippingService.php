<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShippingService extends Model
{
    //
    protected $fillable = [
        'courier_id',
        'service_name',
        'service_code',
        'price',
        'estimation',
    ];

    public function courier()
    {
        return $this->belongsTo(Courier::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
