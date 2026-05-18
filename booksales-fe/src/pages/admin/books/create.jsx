import { useEffect, useState } from "react";
import { getGenres } from "../../../_services/genres";
import { getAuthors } from "../../../_services/authors";
import { useNavigate } from "react-router-dom";
import { createBook } from "../../../_services/books";

export default function BookCreate() {
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        price: 0,
        stock: 0,
        genre_id: 0,
        author_id: 0,
        cover_photo: null,
        description: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const [genresData, authorsData] = await Promise.all([
                getGenres(),
                getAuthors(),
            ]);

            (setGenres(genresData), setAuthors(authorsData));
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "cover_photo") {
            setFormData({
                ...formData,
                cover_photo: files[0],
            });
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
            const playload = new FormData();
            for (const key in formData) {
                playload.append(key, formData[key]);
            }

            await createBook(playload);
            navigate("/admin/books");
        } catch (error) {
            console.log(error);
            alert("Error creating book");
        }
    };

    console.log(formData);

    return (
        <>
            <section className="max-w-4xl mx-auto">
                {/* HEADER */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Create New Book
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Add new book into your bookstore collection.
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
                                    required
                                />
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
                                />
                            </div>
                        </div>

                        {/* BUTTON */}
                        <div className="flex items-center gap-3 mt-8">
                            <button
                                type="submit"
                                className="px-5 py-3 text-sm font-semibold text-white transition bg-orange-500 rounded-2xl hover:bg-orange-600"
                            >
                                Create Book
                            </button>

                            <button
                                type="reset"
                                className="px-5 py-3 text-sm font-semibold text-gray-600 transition border border-orange-200 rounded-2xl hover:bg-orange-50"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
