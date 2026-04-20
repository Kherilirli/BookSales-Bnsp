<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    //
    private $genres = [
        [
            'id' => 1,
            'name' => 'Fiksi',
            'description' => 'Buku cerita Fiksi'
        ],
        [
            'id' => 2,
            'name' => 'Non-Fiksi',
            'description' => 'Buku cerita Non-Fiksi'
        ],
        [
            'id' => 3,
            'name' => 'Romantis',
            'description' => 'Buku cerita Romantis'
        ],
        [
            'id' => 4,
            'name' => 'Sejarah',
            'description' => 'Buku cerita Sejarah'
        ],
        [
            'id' => 5,
            'name' => 'Horror',
            'description' => 'Buku cerita Horror'
        ]
    ];

    public function getGenres() {
        return $this->genres;
    }
}
