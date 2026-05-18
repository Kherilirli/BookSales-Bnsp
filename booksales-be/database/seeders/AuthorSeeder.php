<?php

namespace Database\Seeders;

use App\Models\Author;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AuthorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Author::create([
            'name' => 'Tere Liye',
            'photo' => 'tere.jpg',
            'bio' => 'Penulis novel populer Indonesia dengan gaya narasi yang kuat.'
        ]);
        Author::create([
            'name' => 'Andrea Hirata',
            'photo' => 'andrea.jpg',
            'bio' => 'Penulis Laskar Pelangi yang inspiratif.'
        ]);
        Author::create([
            'name' => 'Risa Saraswati',
            'photo' => 'risa.jpg',
            'bio' => 'Penulis cerita horor dan pengalaman supranatural.'
        ]);
        Author::create([
            'name' => 'Sejarawan Nusantara',
            'photo' => 'sejarawan.jpg',
            'bio' => 'Penulis buku sejarah Indonesia.'
        ]);
        Author::create([
            'name' => 'Joko Anwar',
            'photo' => 'joko.jpg',
            'bio' => 'Penulis dan sutradara cerita horor Indonesia.'
        ]);
    }
}
