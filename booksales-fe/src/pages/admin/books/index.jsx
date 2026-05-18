import { useEffect, useState } from "react";
import { deleteBook, getBooks } from "../../../_services/books";
import { getGenres } from "../../../_services/genres";
import { getAuthors } from "../../../_services/authors";
import { Link } from "react-router-dom";
import { bookImageStorage } from "../../../_api";

export default function AdminBooks() {
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);

    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [openDropdownId, setOpenDropdownId] = useState(null);

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
                console.log(error);
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

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this book?",
        );

        if (confirmDelete) {
            await deleteBook(id);

            setBooks(books.filter((book) => book.id !== id));
        }
    };

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <>
            <section>
                {/* HEADER */}
                <div className="flex flex-col gap-5 mb-8 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-800">
                            Books Management
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Manage all books available in BookSales.
                        </p>
                    </div>

                    <Link
                        to="create"
                        className="flex items-center justify-center gap-2 px-5 py-3 font-semibold text-white transition bg-orange-500 shadow-lg rounded-2xl hover:bg-orange-600"
                    >
                        <iconify-icon icon="mdi:plus" width="20"></iconify-icon>
                        Add Book
                    </Link>
                </div>

                {/* SEARCH */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full py-3 pl-12 pr-5 bg-white border border-orange-200 shadow-sm outline-none rounded-2xl focus:ring-2 focus:ring-orange-300"
                    />

                    <div className="absolute text-gray-400 left-4 top-3.5">
                        <iconify-icon
                            icon="mdi:magnify"
                            width="22"
                        ></iconify-icon>
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto bg-white border border-orange-100 shadow-sm rounded-2xl">
                    <table className="w-full min-w-[900px]">
                        {/* HEADER */}
                        <thead className="bg-orange-50 border-b border-orange-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase text-gray-500">
                                    Book
                                </th>

                                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase text-gray-500">
                                    Genre
                                </th>

                                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase text-gray-500">
                                    Author
                                </th>

                                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase text-gray-500">
                                    Price
                                </th>

                                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase text-gray-500">
                                    Stock
                                </th>

                                <th className="px-4 py-3 text-right text-[11px] font-bold uppercase text-gray-500">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        {/* BODY */}
                        <tbody>
                            {loading ? (
                                [...Array(5)].map((_, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-orange-100 animate-pulse"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-14 bg-orange-100 rounded-lg"></div>

                                                <div className="space-y-2">
                                                    <div className="w-32 h-3 bg-orange-100 rounded"></div>
                                                    <div className="w-16 h-2 bg-orange-100 rounded"></div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="w-16 h-5 bg-orange-100 rounded-full"></div>
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="w-24 h-3 bg-orange-100 rounded"></div>
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="w-20 h-3 bg-orange-100 rounded"></div>
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="w-14 h-5 bg-orange-100 rounded-full"></div>
                                        </td>

                                        <td className="px-4 py-3 text-right">
                                            <div className="w-7 h-7 ml-auto bg-orange-100 rounded-lg"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : filteredBooks.length > 0 ? (
                                filteredBooks.map((book) => (
                                    <tr
                                        key={book.id}
                                        className="border-b border-orange-100 hover:bg-orange-50/40 transition"
                                    >
                                        {/* BOOK */}
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={`${bookImageStorage}/${book.cover_photo}`}
                                                    alt={book.title}
                                                    className="object-cover w-12 h-14 rounded-lg"
                                                    onError={(e) => {
                                                        e.target.src =
                                                            "https://via.placeholder.com/80x100";
                                                    }}
                                                />

                                                <div>
                                                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                                                        {book.title}
                                                    </h3>

                                                    <p className="text-xs text-gray-400">
                                                        ID #{book.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* GENRE */}
                                        <td className="px-4 py-3">
                                            <span className="px-2.5 py-1 text-[11px] font-semibold text-orange-500 bg-orange-100 rounded-full">
                                                {getGenreName(book.genre_id)}
                                            </span>
                                        </td>

                                        {/* AUTHOR */}
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            {getAuthorName(book.author_id)}
                                        </td>

                                        {/* PRICE */}
                                        <td className="px-4 py-3">
                                            <span className="text-sm font-bold text-orange-500">
                                                {formatRupiah(book.price)}
                                            </span>
                                        </td>

                                        {/* STOCK */}
                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-2.5 py-1 text-[11px] font-semibold rounded-full ${
                                                    book.stock > 0
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-red-100 text-red-600"
                                                }`}
                                            >
                                                {book.stock > 0
                                                    ? `${book.stock} Stock`
                                                    : "Out Stock"}
                                            </span>
                                        </td>

                                        {/* ACTION */}
                                        <td className="relative px-4 py-3 text-right">
                                            <button
                                                onClick={() =>
                                                    toggleDropdown(book.id)
                                                }
                                                className="flex items-center justify-center w-9 h-9 ml-auto transition rounded-xl hover:bg-orange-100"
                                            >
                                                <iconify-icon
                                                    icon="mdi:dots-vertical"
                                                    width="20"
                                                    className="text-gray-600"
                                                ></iconify-icon>
                                            </button>

                                            {openDropdownId === book.id && (
                                                <div className="absolute right-4 top-12 z-20 w-36 overflow-hidden bg-white border border-orange-100 shadow-xl rounded-2xl">
                                                    <Link
                                                        to={`/admin/books/edit/${book.id}`}
                                                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 transition hover:bg-orange-50"
                                                    >
                                                        <iconify-icon
                                                            icon="mdi:pencil"
                                                            width="17"
                                                        ></iconify-icon>
                                                        Edit
                                                    </Link>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                book.id,
                                                            )
                                                        }
                                                        className="flex items-center w-full gap-2 px-4 py-3 text-sm text-red-500 transition hover:bg-red-50"
                                                    >
                                                        <iconify-icon
                                                            icon="mdi:delete"
                                                            width="17"
                                                        ></iconify-icon>
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-12 text-center text-gray-400"
                                    >
                                        <div className="flex flex-col items-center justify-center">
                                            <iconify-icon
                                                icon="mdi:book-off-outline"
                                                width="42"
                                                class="mb-2 text-orange-200"
                                            ></iconify-icon>

                                            <p className="text-sm font-medium">
                                                Data buku tidak ditemukan
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}
