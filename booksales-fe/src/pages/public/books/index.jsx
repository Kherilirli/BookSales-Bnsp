import { useEffect, useState } from "react";
import { getBooks } from "../../../_services/books";
import { Link } from "react-router-dom";
import { getGenres } from "../../../_services/genres";
import { getAuthors } from "../../../_services/authors";
import { bookImageStorage } from "../../../_api";

export default function Books() {
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");
    const [selectedGenre, setSelectedGenre] = useState(null);

    const [visibleBooks, setVisibleBooks] = useState(8);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [booksData, genresData, authorsData] = await Promise.all([
                    getBooks(),
                    getGenres(),
                    getAuthors(),
                ]);

                setBooks(booksData);
                setGenres(genresData);
                setAuthors(authorsData);
            } catch (error) {
                setError(
                    error?.response?.data?.message ||
                        "Terjadi kesalahan saat mengambil data",
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getGenreName = (id) => {
        const genre = genres.find((genre) => genre.id === id);
        return genre ? genre.name : "Unknown Genre";
    };

    const getAuthorName = (id) => {
        const author = authors.find((author) => author.id === id);
        return author ? author.name : "Unknown Author";
    };

    const genreIcons = {
        fiksi: "mdi:book-open-variant",
        "non-fiksi": "mdi:book-education",
        romantis: "mdi:heart",
        sejarah: "mdi:bank",
        horor: "mdi:ghost",
    };

    const getGenreIcon = (genreName) => {
        return (
            genreIcons[genreName.toLowerCase()] || "mdi:book-open-page-variant"
        );
    };

    const filteredBooks = books.filter((book) => {
        const matchSearch = book.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchGenre = selectedGenre
            ? book.genre_id === selectedGenre
            : true;

        return matchSearch && matchGenre;
    });

    return (
        <>
            <section className="min-h-screen py-12 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
                <div className="max-w-screen-xl px-6 mx-auto">
                    {/* HEADER */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 lg:text-5xl">
                            Koleksi Buku
                            <span className="text-orange-500"> BookSales</span>
                        </h1>

                        <p className="max-w-2xl mx-auto mt-4 text-gray-600">
                            Temukan berbagai buku favorit mulai dari teknologi,
                            bisnis, edukasi, hingga novel terbaik.
                        </p>
                    </div>

                    {/* LOADING */}
                    {loading ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {[...Array(8)].map((_, index) => (
                                <div
                                    key={index}
                                    className="p-5 bg-white border border-orange-100 shadow-md rounded-3xl animate-pulse"
                                >
                                    <div className="w-full bg-orange-100 rounded-2xl h-60"></div>

                                    <div className="pt-5">
                                        <div className="w-24 h-6 bg-orange-100 rounded-full"></div>

                                        <div className="w-3/4 h-6 mt-4 bg-orange-100 rounded"></div>

                                        <div className="w-1/2 h-4 mt-4 bg-orange-100 rounded"></div>

                                        <div className="w-24 h-6 mt-4 bg-orange-100 rounded-full"></div>

                                        <div className="w-32 h-8 mt-5 bg-orange-100 rounded"></div>

                                        <div className="w-full h-12 mt-5 bg-orange-100 rounded-xl"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        /* ERROR */
                        <div className="py-10 text-center">
                            <p className="text-lg text-red-500">{error}</p>
                        </div>
                    ) : (
                        <>
                            {/* GENRE CATEGORY */}
                            <div className="grid grid-cols-2 gap-5 mb-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                {/* ALL */}
                                <div
                                    onClick={() => setSelectedGenre(null)}
                                    className={`flex flex-col items-center justify-center p-5 transition cursor-pointer rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl ${
                                        selectedGenre === null
                                            ? "bg-orange-500 text-white"
                                            : "bg-white"
                                    }`}
                                >
                                    <div
                                        className={`flex items-center justify-center w-16 h-16 mb-4 rounded-2xl shadow-lg ${
                                            selectedGenre === null
                                                ? "bg-white text-orange-500"
                                                : "bg-orange-500 text-white"
                                        }`}
                                    >
                                        <iconify-icon
                                            icon="mdi:apps"
                                            width="30"
                                        ></iconify-icon>
                                    </div>

                                    <h3 className="text-sm font-bold">Semua</h3>
                                </div>

                                {genres.map((genre) => (
                                    <div
                                        key={genre.id}
                                        onClick={() =>
                                            setSelectedGenre(genre.id)
                                        }
                                        className={`flex flex-col items-center justify-center p-5 transition cursor-pointer rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl ${
                                            selectedGenre === genre.id
                                                ? "bg-orange-500 text-white"
                                                : "bg-white"
                                        }`}
                                    >
                                        <div
                                            className={`flex items-center justify-center w-16 h-16 mb-4 rounded-2xl shadow-lg ${
                                                selectedGenre === genre.id
                                                    ? "bg-white text-orange-500"
                                                    : "bg-orange-500 text-white"
                                            }`}
                                        >
                                            <iconify-icon
                                                icon={getGenreIcon(genre.name)}
                                                width="30"
                                            ></iconify-icon>
                                        </div>

                                        <h3 className="text-sm font-bold text-center">
                                            {genre.name}
                                        </h3>
                                    </div>
                                ))}
                            </div>

                            {/* SEARCH */}
                            <div className="relative max-w-md mb-10">
                                <input
                                    type="text"
                                    placeholder="Cari Buku"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full py-3 pl-5 pr-12 bg-white border border-orange-200 shadow-sm outline-none rounded-2xl focus:ring-2 focus:ring-orange-300"
                                />

                                <div className="absolute text-gray-400 -translate-y-1/2 right-5 top-10">
                                    <iconify-icon
                                        icon="mdi:magnify"
                                        width="22"
                                    ></iconify-icon>
                                </div>
                            </div>

                            {/* BOOKS */}
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {filteredBooks.length > 0 ? (
                                    filteredBooks
                                        .slice(0, visibleBooks)
                                        .map((book) => (
                                            <div
                                                key={book.id}
                                                className="p-5 transition bg-white border border-orange-100 shadow-md rounded-3xl hover:-translate-y-2 hover:shadow-2xl"
                                            >
                                                <div className="overflow-hidden rounded-2xl h-60">
                                                    <Link
                                                        to={`show/${book.id}`}
                                                    >
                                                        <img
                                                            className="object-cover w-full h-full transition hover:scale-105"
                                                            src={`${bookImageStorage}/${book.cover_photo}`}
                                                            alt=""
                                                        />
                                                    </Link>
                                                </div>

                                                <div className="pt-5">
                                                    <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-500 bg-orange-100 rounded-full">
                                                        {getGenreName(
                                                            book.genre_id,
                                                        )}
                                                    </span>

                                                    <h2 className="mt-4 text-lg font-bold leading-tight text-gray-900">
                                                        {book.title}
                                                    </h2>

                                                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                                                        <iconify-icon
                                                            icon="mdi:account"
                                                            width="18"
                                                        ></iconify-icon>

                                                        <p>
                                                            {getAuthorName(
                                                                book.author_id,
                                                            )}
                                                        </p>
                                                    </div>

                                                    <div className="mt-4">
                                                        <p className="text-2xl font-extrabold text-orange-500">
                                                            {formatRupiah(
                                                                book.price,
                                                            )}
                                                        </p>
                                                    </div>

                                                    <Link
                                                        to={`show/${book.id}`}
                                                        className="flex items-center justify-center w-full gap-2 px-5 py-3 mt-5 text-sm font-semibold text-white transition bg-orange-500 rounded-xl hover:bg-orange-600"
                                                    >
                                                        <iconify-icon
                                                            icon="mdi:eye"
                                                            width="20"
                                                        ></iconify-icon>
                                                        View Detail
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <div className="col-span-full text-center">
                                        <p className="text-lg text-gray-500">
                                            Buku tidak ditemukan
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* SHOW MORE */}
                            {visibleBooks < filteredBooks.length && (
                                <div className="mt-14 text-center">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setVisibleBooks((prev) => prev + 4)
                                        }
                                        className="px-8 py-3 font-semibold text-orange-500 transition border border-orange-500 rounded-xl hover:bg-orange-50"
                                    >
                                        Show More
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
