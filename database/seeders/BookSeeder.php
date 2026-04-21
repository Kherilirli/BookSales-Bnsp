<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Book::create([
            'title' => 'Pulang',
            'description' => 'Petualangan seorang pemuda yang kembali ke desa kelahirannya.',
            'price' => 40000,
            'stock' => 15,
            'cover_photo' => 'pulang.jpg',
            'genre_id' => 1,
            'author_id' => 1
        ]);
        Book::create([
            'title' => 'Laskar Pelangi',
            'description' => 'Kisah inspiratif tentang sekelompok anak di Belitung yang berjuang untuk mendapatkan pendidikan.',
            'price' => 50000,
            'stock' => 10,
            'cover_photo' => 'laskar_pelangi.jpg',
            'genre_id' => 2,
            'author_id' => 2
        ]);
        Book::create([
            'title' => 'Siksa Kubur',
            'description' => 'Kisah mengerikan tentang seorang pemuda yang terjerat dalam kubur.',
            'price' => 60000,
            'stock' => 20,
            'cover_photo' => 'siksa_kubur.jpg',
            'genre_id' => 2,
            'author_id' => 3
        ]);
        Book::create([
            'title' => 'Jejak Kerajaan Nusantara',
            'description' => 'Sejarah kerajaan besar di Indonesia.',
            'price' => 65000,
            'stock' => 5,
            'cover_photo' => 'kerajaan.jpg',
            'genre_id' => 4,
            'author_id' => 4
        ]);
        Book::create([
            'title' => 'Rumah Tua di Ujung Jalan',
            'description' => 'Teror dari rumah yang sudah lama ditinggalkan.',
            'price' => 48000,
            'stock' => 10,
            'cover_photo' => 'rumah.jpg',
            'genre_id' => 5,
            'author_id' => 5
        ]);
    }
}
