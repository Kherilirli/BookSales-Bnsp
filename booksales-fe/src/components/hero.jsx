import { useEffect, useState } from "react";
import { getBooks } from "../_services/books";
import { bookImageStorage } from "../_api";
import { Link } from "react-router-dom";

export default function Hero() {
    const token = localStorage.getItem("accessToken");
    const [books, setBooks] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) return;

        const fetchBooks = async () => {
            try {
                const data = await getBooks();

                // ambil 2 buku pertama
                setBooks(data.slice(0, 2));
            } catch (error) {
                setError(
                    error?.response?.data?.message ||
                        "Gagal mengambil data buku",
                );
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [token]);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    return (
        <>
            <section className="bg-gradient-to-br from-orange-50 via-white to-yellow-50">
                <div className="max-w-screen-xl px-6 py-16 mx-auto lg:flex lg:items-center lg:gap-16">
                    {/* LEFT CONTENT */}
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="mb-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                            Temukan Buku <br />
                            Favoritmu di{" "}
                            <span className="text-orange-500">BookSales</span>
                        </h1>

                        <p className="max-w-2xl mb-8 text-lg text-gray-600">
                            BookSales adalah platform toko buku online yang
                            menyediakan berbagai koleksi buku edukasi, novel,
                            teknologi, dan bisnis dengan harga terjangkau serta
                            proses pembelian yang mudah.
                        </p>

                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                            <button className="px-6 py-3 text-white transition bg-orange-500 rounded-xl hover:bg-orange-600">
                                Jelajahi Buku
                            </button>

                            <button className="px-6 py-3 text-orange-500 transition border border-orange-500 rounded-xl hover:bg-orange-50">
                                About Us
                            </button>
                        </div>

                        {/* STATS */}
                        <div className="grid grid-cols-3 gap-6 mt-12 text-center lg:text-left">
                            <div>
                                <h2 className="text-3xl font-bold text-orange-500">
                                    500+
                                </h2>

                                <p className="text-gray-500">Koleksi Buku</p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-orange-500">
                                    1K+
                                </h2>

                                <p className="text-gray-500">Customer</p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-orange-500">
                                    24/7
                                </h2>

                                <p className="text-gray-500">Support</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    {token && (
                        <div className="flex-1 mt-14 lg:mt-0">
                            {loading ? (
                                <div className="grid grid-cols-2 gap-5">
                                    {[...Array(2)].map((_, index) => (
                                        <div
                                            key={index}
                                            className={`p-4 bg-white shadow-xl rounded-2xl animate-pulse ${
                                                index === 1 ? "mt-10" : ""
                                            }`}
                                        >
                                            <div className="w-full h-64 bg-orange-100 rounded-xl"></div>

                                            <div className="w-3/4 h-6 mt-4 bg-orange-100 rounded"></div>

                                            <div className="w-1/2 h-5 mt-3 bg-orange-100 rounded"></div>

                                            <div className="w-24 h-4 mt-5 bg-orange-100 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : error ? (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-lg text-red-500">
                                        {error}
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-5">
                                    {books.map((book, index) => (
                                        <div
                                            key={book.id}
                                            className={`p-4 transition bg-white shadow-xl rounded-2xl hover:-translate-y-2 ${
                                                index === 1 ? "mt-10" : ""
                                            }`}
                                        >
                                            <img
                                                src={`${bookImageStorage}/${book.cover_photo}`}
                                                alt={book.title}
                                                className="object-cover w-full h-64 rounded-xl"
                                            />

                                            <h3 className="mt-4 text-lg font-bold text-gray-800">
                                                {book.title}
                                            </h3>

                                            <p className="mt-1 font-semibold text-orange-500">
                                                {formatRupiah(book.price)}
                                            </p>

                                            <Link
                                                to={`/books/show/${book.id}`}
                                                className="inline-block mt-4 text-sm font-medium text-orange-500 hover:underline"
                                            >
                                                View Detail →
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
