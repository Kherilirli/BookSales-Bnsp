<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            //
            $table->decimal('subtotal', 12, 2)
                ->default(0)
                ->after('quantity');

            $table->string('shipping_courier')
                ->nullable()
                ->after('shipping_cost');

            $table->string('shipping_service')
                ->nullable()
                ->after('shipping_courier');

            $table->string('shipping_etd')
                ->nullable()
                ->after('shipping_service');

            $table->string('receiver_name')
                ->nullable()
                ->after('shipping_etd');

            $table->string('phone')
                ->nullable()
                ->after('receiver_name');

            $table->string('province')
                ->nullable()
                ->after('phone');

            $table->string('city')
                ->nullable()
                ->after('province');

            $table->string('district')
                ->nullable()
                ->after('city');

            $table->string('postal_code')
                ->nullable()
                ->after('district');

            $table->text('full_address')
                ->nullable()
                ->after('postal_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            //
            $table->dropColumn([
                'subtotal',

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
            ]);
        });
    }
};
