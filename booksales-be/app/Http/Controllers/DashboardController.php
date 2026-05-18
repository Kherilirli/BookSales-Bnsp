<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    //
    public function index() {
        // total jenis buku
        $totalBooks = Book::count();

        // total semua stock buku
        $totalStock = Book::sum('stock');

        // total buku terjual
        $booksSold = Transaction::sum('quantity');

        // total pendapatan
        $totalRevenue = Transaction::sum('total_amount');

        // grafik pendapatan per bulan
        $monthlyRevenue = Transaction::select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('SUM(total_amount) as total')
            )
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'total_books' => $totalBooks,
                'total_stock' => $totalStock,
                'books_sold' => $booksSold,
                'total_revenue' => $totalRevenue,
                'monthly_revenue' => $monthlyRevenue
            ]
        ]);
    }
}
