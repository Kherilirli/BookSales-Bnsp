import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGenres } from "../../../_services/genres";
import { getAuthors } from "../../../_services/authors";
import { showBook, updateBook } from "../../../_services/books";
import { bookImageStorage } from "../../../_api";

export default function BookEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);

    const [preview, setPreview] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        price: 0,
        stock: 0,
        genre_id: "",
        author_id: "",
        cover_photo: null,
        description: "",
        _method: "PUT",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [genresData, authorsData, bookData] = await Promise.all([
                    getGenres(),
                    getAuthors(),
                    showBook(id),
                ]);

                setGenres(genresData);
                setAuthors(authorsData);

                setFormData({
                    title: bookData.title,
                    price: bookData.price,
                    stock: bookData.stock,
                    genre_id: bookData.genre_id,
                    author_id: bookData.author_id,
                    cover_photo: null,
                    description: bookData.description,
                    _method: "PUT",
                });

                setPreview(`${bookImageStorage}/${bookData.cover_photo}`);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "cover_photo") {
            const file = files[0];

            setFormData({
                ...formData,
                cover_photo: file,
            });

            if (file) {
                setPreview(URL.createObjectURL(file));
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = new FormData();

            for (const key in formData) {
                if (key === "cover_photo") {
                    if (formData.cover_photo instanceof File) {
                        payload.append("cover_photo", formData.cover_photo);
                    }
                } else {
                    payload.append(key, formData[key]);
                }
            }

            await updateBook(id, payload);

            navigate("/admin/books");
        } catch (error) {
            console.log(error);
            alert("Error update book");
        }
    };

    return (
        <>
            <section className="max-w-4xl mx-auto">
                {/* HEADER */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Edit Book
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Update your book information and details.
                    </p>
                </div>

                {/* CARD */}
                <div className="p-6 bg-white border border-orange-100 shadow-sm rounded-3xl">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-5 sm:grid-cols-2">
                            {/* TITLE */}
                            <div className="sm:col-span-2">
                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Book Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter book title"
                                    className="w-full px-4 py-3 text-sm border border-orange-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-300"
                                    required
                                />
                            </div>

                            {/* PRICE */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="150000"
                                    className="w-full px-4 py-3 text-sm border border-orange-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-300"
                                    required
                                />
                            </div>

                            {/* STOCK */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Stock
                                </label>

                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="20"
                                    className="w-full px-4 py-3 text-sm border border-orange-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-300"
                                    required
                                />
                            </div>

                            {/* GENRE */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Genre
                                </label>

                                <select
                                    name="genre_id"
                                    value={formData.genre_id}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-sm border border-orange-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-300"
                                >
                                    <option value="">Select Genre</option>

                                    {genres.map((genre) => (
                                        <option key={genre.id} value={genre.id}>
                                            {genre.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* AUTHOR */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Author
                                </label>

                                <select
                                    name="author_id"
                                    value={formData.author_id}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-sm border border-orange-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-300"
                                >
                                    <option value="">Select Author</option>

                                    {authors.map((author) => (
                                        <option
                                            key={author.id}
                                            value={author.id}
                                        >
                                            {author.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* COVER */}
                            <div className="sm:col-span-2">
                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Cover Photo
                                </label>

                                <input
                                    type="file"
                                    name="cover_photo"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-sm border border-orange-200 rounded-2xl cursor-pointer"
                                />

                                {preview && (
                                    <div className="mt-4">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="object-cover w-24 h-32 border border-orange-100 rounded-2xl shadow-sm"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* DESCRIPTION */}
                            <div className="sm:col-span-2">
                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    rows="5"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Write book description..."
                                    className="w-full px-4 py-3 text-sm border border-orange-200 rounded-2xl outline-none resize-none focus:ring-2 focus:ring-orange-300"
                                ></textarea>
                            </div>
                        </div>

                        {/* BUTTON */}
                        <div className="flex items-center gap-3 mt-8">
                            <button
                                type="submit"
                                className="px-5 py-3 text-sm font-semibold text-white transition bg-orange-500 rounded-2xl hover:bg-orange-600"
                            >
                                Save Changes
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/admin/books")}
                                className="px-5 py-3 text-sm font-semibold text-gray-600 transition border border-orange-200 rounded-2xl hover:bg-orange-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
