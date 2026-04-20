<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    //
    private $authors = [
        [
            'id' => 1,
            'name' => 'Tere Liye',
            'bio' => 'Penulis novel populer Indonesia dengan gaya narasi yang kuat.'
        ],
        [
            'id' => 2,
            'name' => 'Andrea Hirata',
            'bio' => 'Penulis Laskar Pelangi yang inspiratif.'
        ],
        [
            'id' => 3,
            'name' => 'Risa Saraswati',
            'bio' => 'Penulis cerita horor dan pengalaman supranatural.'
        ],
        [
            'id' => 4,
            'name' => 'Sejarawan Nusantara',
            'bio' => 'Penulis buku sejarah Indonesia.'
        ],
        [
            'id' => 5,
            'name' => 'Joko Anwar',
            'bio' => 'Penulis dan sutradara cerita horor Indonesia.'
        ]
    ];
    
    public function getAuthors() {
        return $this->authors;
    }
}
