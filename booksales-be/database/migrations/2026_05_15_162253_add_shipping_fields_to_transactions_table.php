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
            $table->foreignId('address_id')
                ->nullable()
                ->after('customer_id')
                ->constrained('addresses')
                ->nullOnDelete();

            $table->foreignId('shipping_service_id')
                ->nullable()
                ->after('address_id')
                ->constrained('shipping_services')
                ->nullOnDelete();

            $table->integer('shipping_cost')->default(0);

            $table->string('tracking_number')->nullable();

            $table->enum('shipping_status', [
                'pending',
                'processed',
                'shipped',
                'delivered',
            ])->default('pending');

            $table->enum('payment_status', [
                'pending',
                'paid',
                'failed',
            ])->default('pending');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            //
            $table->dropForeign(['address_id']);
            $table->dropForeign(['shipping_service_id']);

            $table->dropColumn([
                'address_id',
                'shipping_service_id',
                'shipping_cost',
                'tracking_number',
                'shipping_status',
                'payment_status',
            ]);
        });
    }
};
