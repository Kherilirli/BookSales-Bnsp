<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\CourierController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ShippingServiceController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/refresh', [AuthController::class, 'refresh']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');

Route::middleware(['auth:api'])->group(function () {
    Route::apiResource('/books', BookController::class)->only(['index', 'show']);
    Route::apiResource('/genres', GenreController::class)->only(['index', 'show']);
    Route::apiResource('/authors', AuthorController::class)->only(['index', 'show']);
    Route::apiResource('/transactions', TransactionController::class)->only(['index']);
    Route::middleware(['role:customer'])->group(function () {
        Route::apiResource('/carts', CartController::class);
        Route::apiResource('/addresses', AddressController::class);
        Route::get('/couriers', [CourierController::class, 'index']);
        Route::get('/shipping-services', [ShippingServiceController::class, 'index']);
        Route::post('/checkout/buy-now', [PaymentController::class, 'checkoutBuyNow']);
        Route::post('/checkout/cart', [PaymentController::class, 'checkoutCart']);
        Route::apiResource('/transactions', TransactionController::class)->only(['update', 'store', 'show']);
        Route::post('/chat/conversation', [ChatController::class, 'createConversation']);
        Route::get('/chat/messages/{id}', [ChatController::class, 'messages']);
        Route::post('/chat/send', [ChatController::class, 'send']);
        });

        Route::middleware(['role:admin'])->group(function () {
            Route::apiResource('/dashboard', DashboardController::class)->only(['index']);
            Route::apiResource('/users', UserController::class)->only(['index', 'show']);
            Route::apiResource('/books', BookController::class)->only(['store', 'update', 'destroy']);
            Route::apiResource('/genres', GenreController::class)->only(['store', 'update', 'destroy']);
            Route::apiResource('/authors', AuthorController::class)->only(['store', 'update', 'destroy']);
            Route::apiResource('/transactions', TransactionController::class)->only(['destroy', 'show']);
            Route::get('/admin/chat/conversations', [ChatController::class, 'conversations']);
            Route::get('/admin/chat/messages/{id}', [ChatController::class, 'messages']);
            Route::post('/admin/chat/send', [ChatController::class, 'send']);
    });
});
