import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { showBook } from "../../../_services/books";
import { addToCart } from "../../../_services/carts";

import { bookImageStorage } from "../../../_api";

export default function ShowBook() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [book, setBook] = useState({});
    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const accessToken = localStorage.getItem("accessToken");

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await showBook(id);

                setBook(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const handleBuyNow = () => {
        if (!accessToken) {
            navigate("/login");
            return;
        }

        if (quantity < 1) {
            setError("Jumlah minimal 1");
            return;
        }

        navigate(`/checkout/${id}?quantity=${quantity}`);
    };

    const handleAddToCart = async () => {
        if (!accessToken) {
            navigate("/login");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                book_id: id,
                quantity: Number(quantity),
            };

            await addToCart(payload);

            window.dispatchEvent(new Event("cartUpdated"));

            alert("Buku berhasil ditambahkan ke keranjang");

            navigate("/cart");
        } catch (error) {
            console.log(error);

            setError(
                error?.response?.data?.message ||
                    "Gagal menambahkan ke keranjang",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="min-h-screen py-12 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
                <div className="max-w-screen-xl px-6 mx-auto">
                    <div className="grid items-start gap-10 lg:grid-cols-2">
                        <div className="p-6 bg-white border border-orange-100 shadow-xl rounded-3xl">
                            <div className="overflow-hidden rounded-2xl">
                                <img
                                    className="object-cover w-full transition hover:scale-105"
                                    src={`${bookImageStorage}/${book.cover_photo}`}
                                    alt={book.title}
                                    onError={(e) => {
                                        e.target.src =
                                            "https://via.placeholder.com/400x500";
                                    }}
                                />
                            </div>
                        </div>

                        <div className="p-8 bg-white border border-orange-100 shadow-xl rounded-3xl">
                            <span className="inline-block px-4 py-1 text-sm font-semibold text-orange-500 bg-orange-100 rounded-full">
                                Buku Premium
                            </span>

                            <h1 className="mt-5 text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl">
                                {book.title}
                            </h1>

                            <div className="flex items-center gap-3 mt-5">
                                <div className="flex items-center text-yellow-400">
                                    {[...Array(5)].map((_, index) => (
                                        <iconify-icon
                                            key={index}
                                            icon="mdi:star"
                                            width="22"
                                        ></iconify-icon>
                                    ))}
                                </div>

                                <p className="font-medium text-gray-500">
                                    5.0 Rating
                                </p>
                            </div>

                            <div className="mt-6">
                                <h2 className="text-4xl font-extrabold text-orange-500">
                                    {formatRupiah(book.price)}
                                </h2>
                            </div>

                            <div className="mt-5">
                                <span
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                                        book.stock > 0
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                    }`}
                                >
                                    <iconify-icon
                                        icon={
                                            book.stock > 0
                                                ? "mdi:check-circle"
                                                : "mdi:close-circle"
                                        }
                                        width="18"
                                    ></iconify-icon>

                                    {book.stock > 0
                                        ? `Stock tersedia : ${book.stock}`
                                        : "Stock Habis"}
                                </span>
                            </div>

                            <div className="mt-8">
                                <h3 className="mb-3 text-lg font-bold text-gray-900">
                                    Deskripsi Buku
                                </h3>

                                <p className="leading-relaxed text-gray-600">
                                    {book.description}
                                </p>
                            </div>

                            <div className="mt-10 space-y-5">
                                {error && (
                                    <div className="p-4 text-sm text-red-500 border border-red-200 bg-red-50 rounded-xl">
                                        {error}
                                    </div>
                                )}

                                <div>
                                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                                        Jumlah Pembelian
                                    </label>

                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        value={quantity}
                                        min={1}
                                        max={book.stock}
                                        onChange={(e) =>
                                            setQuantity(e.target.value)
                                        }
                                        className="w-32 px-4 py-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    />
                                </div>

                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={handleBuyNow}
                                        disabled={loading || book.stock < 1}
                                        className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold transition ${
                                            book.stock > 0
                                                ? "bg-orange-500 hover:bg-orange-600"
                                                : "bg-gray-400 cursor-not-allowed"
                                        }`}
                                    >
                                        <iconify-icon
                                            icon="mdi:cart"
                                            width="22"
                                        ></iconify-icon>

                                        {book.stock > 0
                                            ? "Beli Sekarang"
                                            : "Stock Habis"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleAddToCart}
                                        disabled={loading || book.stock < 1}
                                        className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold border transition ${
                                            book.stock > 0
                                                ? "border-orange-500 text-orange-500 hover:bg-orange-50"
                                                : "border-gray-300 text-gray-400 cursor-not-allowed"
                                        }`}
                                    >
                                        <iconify-icon
                                            icon="mdi:cart-plus"
                                            width="22"
                                        ></iconify-icon>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
