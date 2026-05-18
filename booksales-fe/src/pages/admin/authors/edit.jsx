import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showAuthor, updateAuthor } from "../../../_services/authors";

export default function AuthorEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        photo: null,
        bio: "",
        _method: "PUT",
    });

    useEffect(() => {
        const fetchData = async () => {
            const authorData = await showAuthor(id);

            setFormData({
                name: authorData.name,
                photo: authorData.photo,
                bio: authorData.bio,
                _method: "PUT",
            });
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "photo") {
            setFormData({
                ...formData,
                photo: files[0],
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
            const payload = new FormData();

            for (const key in formData) {
                if (key === "photo") {
                    if (formData.photo instanceof File) {
                        payload.append("photo", formData.photo);
                    }
                } else {
                    payload.append(key, formData[key]);
                }
            }

            await updateAuthor(id, payload);
            navigate("/admin/authors");
        } catch (error) {
            console.log(error);
            alert("Error updating author");
        }
    };

    return (
        <>
            <section className="max-w-3xl mx-auto">
                {/* HEADER */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Edit Author
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Update author information.
                    </p>
                </div>

                {/* CARD */}
                <div className="p-6 bg-white border border-orange-100 shadow-sm rounded-3xl">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-5">
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Author Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter author name"
                                    className="w-full px-4 py-3 text-sm border border-orange-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-300"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Photo
                                </label>

                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-sm border border-orange-200 rounded-2xl cursor-pointer"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Bio
                                </label>

                                <textarea
                                    name="bio"
                                    rows="5"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    placeholder="Write author biography..."
                                    className="w-full px-4 py-3 text-sm border border-orange-200 rounded-2xl outline-none resize-none focus:ring-2 focus:ring-orange-300"
                                />
                            </div>
                        </div>

                        <div className="mt-8">
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
