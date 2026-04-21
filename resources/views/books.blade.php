<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Selamat Datang</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>Selamat datang di toko BookSales</p>

    @foreach ($books as $item)
        <ul>
            <li>Title: {{ $item['title'] }}</li>
            <li>Deskripsi: {{ $item['description'] }}</li>
            <li>Harga: {{ $item['price'] }}</li>
            <li>Stok: {{ $item['stock'] }}</li>
            <li>Foto: {{ $item['cover_photo'] }}</li>
            <li>Genre: {{ $item->genre->name }}</li>
            <li>Author: {{ $item->author->name }}</li>
        </ul>
    @endforeach
</body>
</html>