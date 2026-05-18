import { useEffect, useState } from "react";
import { deleteGenre, getGenres } from "../../../_services/genres";
import { Link } from "react-router-dom";

export default function AdminGenres() {
    const [genres, setGenres] = useState([]);
    const [search, setSearch] = useState("");

    const [openDropdownId, setOpenDropdownId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getGenres();
            setGenres(data);
        };
        fetchData();
    }, []);

    const filteredGenres = genres.filter((g) =>
        g.name.toLowerCase().includes(search.toLowerCase()),
    );

    const toogleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want delete this genre?",
        );

        if (confirmDelete) {
            await deleteGenre(id);
            setGenres(genres.filter((genre) => genre.id !== id));
        }
    };

    return (
        <>
            <section className="max-w-7xl mx-auto">
                {/* HEADER */}
                <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Genres
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage all bookstore genres.
                        </p>
                    </div>

                    <Link
                        to={"create"}
                        className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white transition bg-orange-500 rounded-2xl hover:bg-orange-600"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            />
                        </svg>
                        Add Genre
                    </Link>
                </div>

                {/* CARD */}
                <div className="overflow-hidden bg-white border border-orange-100 shadow-sm rounded-3xl">
                    {/* SEARCH */}
                    <div className="p-5 border-b border-orange-100">
                        <input
                            type="text"
                            placeholder="Search genre..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-3 text-sm border border-orange-200 rounded-2xl outline-none md:w-80 focus:ring-2 focus:ring-orange-300"
                        />
                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed">
                            <thead className="bg-orange-50">
                                <tr className="text-sm text-left text-gray-600">
                                    <th className="px-6 py-4 font-semibold">
                                        ID
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Genre
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Description
                                    </th>

                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredGenres.length > 0 ? (
                                    filteredGenres.map((genre) => (
                                        <tr
                                            key={genre.id}
                                            className="transition border-b border-orange-100 hover:bg-orange-50/40"
                                        >
                                            <td className="px-6 py-5 text-sm text-gray-700">
                                                {genre.id}
                                            </td>

                                            <td className="px-6 py-5 font-semibold text-gray-800">
                                                {genre.name}
                                            </td>

                                            <td className="max-w-xs px-6 py-5 text-sm text-gray-600 break-words whitespace-normal">
                                                {genre.description}
                                            </td>

                                            <td className="relative px-6 py-5">
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() =>
                                                            toogleDropdown(
                                                                genre.id,
                                                            )
                                                        }
                                                        className="p-2 transition rounded-xl hover:bg-orange-100"
                                                    >
                                                        <svg
                                                            className="w-5 h-5 text-gray-600"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                {openDropdownId ===
                                                    genre.id && (
                                                    <div className="absolute right-6 z-20 w-40 mt-2 overflow-hidden bg-white border border-orange-100 shadow-lg rounded-2xl">
                                                        <Link
                                                            to={`/admin/genres/edit/${genre.id}`}
                                                            className="block px-4 py-3 text-sm text-gray-700 transition hover:bg-orange-50"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    genre.id,
                                                                )
                                                            }
                                                            className="block w-full px-4 py-3 text-sm text-left text-red-500 transition hover:bg-red-50"
                                                        >
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
                                            colSpan="4"
                                            className="py-10 text-center text-gray-400"
                                        >
                                            No genres found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}
