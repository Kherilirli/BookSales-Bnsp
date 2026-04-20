<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Authors</title>
</head>
<body>
    <h1>Ini adalah halaman Authors</h1>
    @foreach ($authors as $author)
        <ul>
            <li>Nama: {{ $author['name'] }}</li>
            <li>Bio: {{ $author['bio'] }}</li>
        </ul>
    @endforeach
</body>
</html>