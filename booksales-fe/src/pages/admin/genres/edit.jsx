import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showGenre, updateGenre } from "../../../_services/genres";

export default function GenreEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        _method: "PUT",
    });

    useEffect(() => {
        const fetchData = async () => {
            const [genresData] = await Promise.all([showGenre(id)]);

            setFormData({
                name: genresData.name,
                description: genresData.description,
                _method: "PUT",
            });
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = new FormData();

            for (const key in formData) {
                payload.append(key, formData[key]);
            }

            await updateGenre(id, payload);
            navigate("/admin/genres");
        } catch (error) {
            console.log(error.response?.data);
            alert("Gagal menambahkan genre");
        }
    };

    return (
        <>
            <section className="max-w-4xl mx-auto">
                {/* HEADER */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Edit Genre
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Update genre information.
                    </p>
                </div>

                {/* CARD */}
                <div className="p-6 bg-white border border-orange-100 shadow-sm rounded-3xl">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-5">
                            {/* NAME */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Genre Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter genre name"
                                    required
                                    className="w-full px-4 py-3 text-sm border border-orange-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-300"
                                />
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Write genre description..."
                                    rows="5"
                                    required
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
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
