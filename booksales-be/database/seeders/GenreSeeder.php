<?php

namespace Database\Seeders;

use App\Models\Genre;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Genre::create([
            'name' => 'Fiksi',
            'description' => 'Buku cerita Fiksi'
        ]);
        Genre::create([
            'name' => 'Non-Fiksi',
            'description' => 'Buku cerita Non-Fiksi'
        ]);
        Genre::create([
            'name' => 'Romantis',
            'description' => 'Buku cerita Romantis'
        ]);
        Genre::create([
            'name' => 'Sejarah',
            'description' => 'Buku cerita Sejarah'
        ]);
        Genre::create([
            'name' => 'Horror',
            'description' => 'Buku cerita Horror'
        ]);
    }
}
