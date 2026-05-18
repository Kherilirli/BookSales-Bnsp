import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, useDecodeToken } from "../../_services/auth";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("accessToken");
    const decodedToken = useDecodeToken(token);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await login(formData);
            localStorage.setItem("accessToken", response.token);
            localStorage.setItem("userInfo", JSON.stringify(response.user));

            //Cara 2
            return navigate(response.user.role === "admin" ? "/admin" : "/");

            //Cara 1
            // if(response.user.role === "admin"){
            //     return navigate("/admin")
            // } else {
            //     return navigate("/")
            // }
        } catch (error) {
            setError(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (token && user) {
            navigate(user.role === "admin" ? "/admin" : "/");
        }
    }, [token, navigate]);

    console.log(decodedToken);

    return (
        <>
            <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
                <div className="flex items-center justify-center min-h-screen px-6 py-12">
                    <div className="grid items-center w-full max-w-6xl gap-10 lg:grid-cols-2">
                        {/* LEFT SIDE */}
                        <div className="hidden lg:block">
                            <span className="inline-block px-4 py-2 text-sm font-semibold text-orange-500 bg-orange-100 rounded-full">
                                Welcome to BookSales
                            </span>

                            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-gray-900">
                                Temukan Buku
                                <span className="text-orange-500">
                                    {" "}
                                    Favoritmu
                                </span>
                            </h1>

                            <p className="max-w-lg mt-6 text-lg leading-relaxed text-gray-600">
                                Login untuk melanjutkan pembelian buku terbaik
                                dengan pengalaman modern dan nyaman.
                            </p>

                            <div className="flex gap-6 mt-10">
                                <div className="p-5 bg-white border border-orange-100 shadow-lg rounded-3xl">
                                    <h3 className="text-3xl font-extrabold text-orange-500">
                                        100+
                                    </h3>

                                    <p className="mt-2 text-gray-600">
                                        Koleksi Buku
                                    </p>
                                </div>

                                <div className="p-5 bg-white border border-orange-100 shadow-lg rounded-3xl">
                                    <h3 className="text-3xl font-extrabold text-orange-500">
                                        24/7
                                    </h3>

                                    <p className="mt-2 text-gray-600">
                                        Online Access
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="w-full">
                            <div className="p-8 bg-white border border-orange-100 shadow-2xl rounded-3xl md:p-10">
                                <div className="mb-8 text-center">
                                    <div className="flex items-center justify-center w-20 h-20 mx-auto mb-5 bg-orange-100 rounded-full">
                                        <iconify-icon
                                            icon="mdi:book-open-page-variant"
                                            width="40"
                                            className="text-orange-500"
                                        ></iconify-icon>
                                    </div>

                                    <h2 className="text-3xl font-extrabold text-gray-900">
                                        Sign In
                                    </h2>

                                    <p className="mt-2 text-gray-500">
                                        Masuk untuk melanjutkan ke akunmu
                                    </p>
                                </div>

                                {error && (
                                    <div className="px-4 py-3 mb-5 text-sm font-medium text-red-500 border border-red-200 bg-red-50 rounded-xl">
                                        {error}
                                    </div>
                                )}

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    {/* EMAIL */}
                                    <div>
                                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Masukkan email"
                                            className="w-full px-5 py-4 transition bg-white border border-orange-200 outline-none rounded-2xl focus:ring-2 focus:ring-orange-300"
                                            required
                                        />
                                    </div>

                                    {/* PASSWORD */}
                                    <div>
                                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Masukkan password"
                                            className="w-full px-5 py-4 transition bg-white border border-orange-200 outline-none rounded-2xl focus:ring-2 focus:ring-orange-300"
                                            required
                                        />
                                    </div>

                                    {/* TERMS */}
                                    <div className="flex items-start gap-3">
                                        <input
                                            id="terms"
                                            type="checkbox"
                                            className="w-5 h-5 rounded
                                                    border-2 border-orange-400
                                                    accent-orange-500
                                                    cursor-pointer
                                                    focus:ring-2 focus:ring-orange-300"
                                            required
                                        />

                                        <label
                                            htmlFor="terms"
                                            className="text-sm text-gray-600"
                                        >
                                            Saya menyetujui{" "}
                                            <Link
                                                to={""}
                                                className="font-semibold text-orange-500 hover:underline"
                                            >
                                                Terms & Conditions
                                            </Link>
                                        </label>
                                    </div>

                                    {/* BUTTON */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full px-5 py-4 font-semibold text-white transition bg-orange-500 rounded-2xl hover:bg-orange-600 disabled:bg-orange-300"
                                    >
                                        {loading ? "Signing in..." : "Sign In"}
                                    </button>

                                    {/* REGISTER */}
                                    <p className="text-sm text-center text-gray-500">
                                        Belum punya akun?{" "}
                                        <Link
                                            to="/register"
                                            className="font-semibold text-orange-500 hover:underline"
                                        >
                                            Register sekarang
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
