<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    //
    private $books = [
        [
            'title' => 'Pulang',
            'description' => 'Petualangan seorang pemuda yang kembali ke desa kelahirannya.',
            'price' => 40000,
            'stock' => 15,
            'cover_photo' => 'pulang.jpg',
            'genre_id' => 1,
            'author_id' => 1
        ],
        [
            'title' => 'Laskar Pelangi',
            'description' => 'Kisah inspiratif tentang sekelompok anak di Belitung yang berjuang untuk mendapatkan pendidikan.',
            'price' => 50000,
            'stock' => 10,
            'cover_photo' => 'laskar_pelangi.jpg',
            'genre_id' => 2,
            'author_id' => 2
        ],
        [
            'title' => 'Siksa Kubur',
            'description' => 'Kisah mengerikan tentang seorang pemuda yang terjerat dalam kubur.',
            'price' => 60000,
            'stock' => 20,
            'cover_photo' => 'siksa_kubur.jpg',
            'genre_id' => 2,
            'author_id' => 3
        ],
        [
            'title' => 'Jejak Kerajaan Nusantara',
            'description' => 'Sejarah kerajaan besar di Indonesia.',
            'price' => 65000,
            'stock' => 5,
            'cover_photo' => 'kerajaan.jpg',
            'genre_id' => 4,
            'author_id' => 4
        ],
        [
            'title' => 'Rumah Tua di Ujung Jalan',
            'description' => 'Teror dari rumah yang sudah lama ditinggalkan.',
            'price' => 48000,
            'stock' => 10,
            'cover_photo' => 'rumah.jpg',
            'genre_id' => 5,
            'author_id' => 5
        ]
    ];

    public function getBooks() {
        return $this->books;
    }
}
