import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
} from "../../../_services/address";

export default function Address() {
    const navigate = useNavigate();
    const location = useLocation();

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        receiver_name: "",
        phone: "",
        province: "",
        city: "",
        district: "",
        postal_code: "",
        full_address: "",
    });

    // FETCH ADDRESS
    useEffect(() => {
        const loadAddresses = async () => {
            try {
                const data = await getAddresses();

                setAddresses(data);
            } catch (error) {
                console.log(error);
            }
        };

        loadAddresses();
    }, []);

    // BACK TO CHECKOUT
    const handleFinish = () => {
        const checkoutPath =
            location.state?.from || "/books";

        navigate(checkoutPath);
    };

    // RESET FORM
    const resetForm = () => {
        setFormData({
            receiver_name: "",
            phone: "",
            province: "",
            city: "",
            district: "",
            postal_code: "",
            full_address: "",
        });

        setEditingId(null);
    };

    // HANDLE INPUT
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (editingId) {
                await updateAddress(editingId, formData);

                alert("Alamat berhasil diupdate");
            } else {
                await createAddress(formData);

                alert("Alamat berhasil ditambahkan");
            }

            // REFRESH ADDRESS
            const updatedAddresses = await getAddresses();

            setAddresses(updatedAddresses);

            resetForm();
        } catch (error) {
            console.log(error);

            alert(
                error?.response?.data?.message ||
                    "Terjadi kesalahan",
            );
        } finally {
            setLoading(false);
        }
    };

    // EDIT
    const handleEdit = (address) => {
        setEditingId(address.id);

        setFormData({
            receiver_name: address.receiver_name || "",
            phone: address.phone || "",
            province: address.province || "",
            city: address.city || "",
            district: address.district || "",
            postal_code: address.postal_code || "",
            full_address: address.full_address || "",
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // DELETE
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Yakin ingin menghapus alamat ini?",
        );

        if (!confirmDelete) return;

        try {
            await deleteAddress(id);

            setAddresses((prev) =>
                prev.filter((item) => item.id !== id),
            );

            alert("Alamat berhasil dihapus");
        } catch (error) {
            console.log(error);

            alert(
                error?.response?.data?.message ||
                    "Gagal menghapus alamat",
            );
        }
    };

    return (
        <>
            <section className="min-h-screen py-12 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
                <div className="max-w-screen-xl px-6 mx-auto">
                    {/* HEADER */}
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 lg:text-5xl">
                            Kelola
                            <span className="text-orange-500">
                                {" "}
                                Alamat
                            </span>
                        </h1>

                        <p className="mt-4 text-gray-600">
                            Tambahkan alamat pengiriman untuk
                            checkout buku favoritmu.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* FORM */}
                        <div className="lg:col-span-1">
                            <div className="sticky p-8 bg-white border border-orange-100 shadow-xl top-28 rounded-3xl">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingId
                                        ? "Edit Alamat"
                                        : "Tambah Alamat"}
                                </h2>

                                <form
                                    onSubmit={handleSubmit}
                                    className="mt-6 space-y-5"
                                >
                                    {/* NAMA */}
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-700">
                                            Nama Penerima
                                        </label>

                                        <input
                                            type="text"
                                            name="receiver_name"
                                            value={
                                                formData.receiver_name
                                            }
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-300"
                                        />
                                    </div>

                                    {/* PHONE */}
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-700">
                                            Nomor HP
                                        </label>

                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-300"
                                        />
                                    </div>

                                    {/* PROVINCE */}
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-700">
                                            Provinsi
                                        </label>

                                        <input
                                            type="text"
                                            name="province"
                                            value={formData.province}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-300"
                                        />
                                    </div>

                                    {/* CITY */}
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-700">
                                            Kota
                                        </label>

                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-300"
                                        />
                                    </div>

                                    {/* DISTRICT */}
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-700">
                                            Kecamatan
                                        </label>

                                        <input
                                            type="text"
                                            name="district"
                                            value={formData.district}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-300"
                                        />
                                    </div>

                                    {/* POSTAL CODE */}
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-700">
                                            Kode Pos
                                        </label>

                                        <input
                                            type="text"
                                            name="postal_code"
                                            value={
                                                formData.postal_code
                                            }
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-300"
                                        />
                                    </div>

                                    {/* FULL ADDRESS */}
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-700">
                                            Alamat Lengkap
                                        </label>

                                        <textarea
                                            rows={4}
                                            name="full_address"
                                            value={
                                                formData.full_address
                                            }
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-300"
                                        ></textarea>
                                    </div>

                                    {/* BUTTON */}
                                    <div className="flex gap-3">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 py-4 font-semibold text-white transition bg-orange-500 rounded-2xl hover:bg-orange-600 disabled:bg-gray-400"
                                        >
                                            {loading
                                                ? "Menyimpan..."
                                                : editingId
                                                  ? "Update Alamat"
                                                  : "Tambah Alamat"}
                                        </button>

                                        {editingId && (
                                            <button
                                                type="button"
                                                onClick={resetForm}
                                                className="px-6 py-4 font-semibold text-gray-700 transition border border-gray-300 rounded-2xl hover:bg-gray-100"
                                            >
                                                Batal
                                            </button>
                                        )}
                                    </div>

                                    {/* FINISH BUTTON */}
                                    <button
                                        type="button"
                                        onClick={handleFinish}
                                        className="w-full py-4 mt-4 font-semibold text-orange-500 transition bg-white border border-orange-300 rounded-2xl hover:bg-orange-50"
                                    >
                                        Selesai
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* LIST */}
                        <div className="space-y-6 lg:col-span-2">
                            {addresses.length === 0 ? (
                                <div className="p-10 text-center bg-white border border-orange-100 shadow-xl rounded-3xl">
                                    <iconify-icon
                                        icon="mdi:map-marker-off"
                                        width="70"
                                        className="text-orange-400"
                                    ></iconify-icon>

                                    <h2 className="mt-5 text-2xl font-bold text-gray-900">
                                        Belum Ada Alamat
                                    </h2>

                                    <p className="mt-2 text-gray-500">
                                        Tambahkan alamat terlebih dahulu sebelum
                                        checkout.
                                    </p>
                                </div>
                            ) : (
                                addresses.map((address) => (
                                    <div
                                        key={address.id}
                                        className="p-6 bg-white border border-orange-100 shadow-xl rounded-3xl"
                                    >
                                        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-900">
                                                    {address.receiver_name}
                                                </h2>

                                                <p className="mt-2 font-medium text-orange-500">
                                                    {address.phone}
                                                </p>

                                                <p className="mt-4 leading-relaxed text-gray-600">
                                                    {address.full_address},{" "}
                                                    {address.district},{" "}
                                                    {address.city},{" "}
                                                    {address.province}{" "}
                                                    {address.postal_code}
                                                </p>
                                            </div>

                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(address)
                                                    }
                                                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-orange-500 border border-orange-200 rounded-xl hover:bg-orange-50"
                                                >
                                                    <iconify-icon
                                                        icon="mdi:pencil"
                                                        width="18"
                                                    ></iconify-icon>
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(address.id)
                                                    }
                                                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-500 border border-red-200 rounded-xl hover:bg-red-50"
                                                >
                                                    <iconify-icon
                                                        icon="mdi:trash-can"
                                                        width="18"
                                                    ></iconify-icon>
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}