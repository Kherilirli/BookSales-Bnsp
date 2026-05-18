import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../_services/auth";
import { getCarts } from "../_services/carts";
import { useEffect, useState } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                if (token) {
                    const data = await getCarts();

                    setCartCount(data.length);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchCartCount();

        window.addEventListener("cartUpdated", fetchCartCount);

        return () => {
            window.removeEventListener("cartUpdated", fetchCartCount);
        };
    }, [token]);

    const handleLogout = async () => {
        if (token) {
            await logout({ token });
            localStorage.removeItem("userInfo");
        }
        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    return (
        <>
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
                <nav className="max-w-screen-xl px-6 py-4 mx-auto">
                    <div className="flex items-center justify-between">
                        {/* LOGO */}
                        <Link to="/" className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-11 h-11 text-white bg-orange-500 rounded-xl shadow-lg">
                                <iconify-icon
                                    icon="solar:book-bold"
                                    width="32"
                                    class="text-white-500"
                                ></iconify-icon>
                            </div>

                            <div>
                                <h1 className="text-2xl font-extrabold text-gray-800">
                                    BookSales
                                </h1>

                                <p className="text-xs text-gray-500">
                                    Online Book Store
                                </p>
                            </div>
                        </Link>

                        {/* MENU */}
                        <ul className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `transition hover:text-orange-500 ${
                                            isActive
                                                ? "text-orange-500 font-semibold"
                                                : ""
                                        }`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>

                            {/* Akan muncul jika sudah login */}
                            {token && (
                                <>
                                    <li>
                                        <NavLink
                                            to="/books"
                                            className={({ isActive }) =>
                                                `transition hover:text-orange-500 ${
                                                    isActive
                                                        ? "text-orange-500 font-semibold"
                                                        : ""
                                                }`
                                            }
                                        >
                                            Buku
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/transactions"
                                            className={({ isActive }) =>
                                                `transition hover:text-orange-500 ${
                                                    isActive
                                                        ? "text-orange-500 font-semibold"
                                                        : ""
                                                }`
                                            }
                                        >
                                            Riwayat
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `transition hover:text-orange-500 ${
                                            isActive
                                                ? "text-orange-500 font-semibold"
                                                : ""
                                        }`
                                    }
                                >
                                    About Us
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        `transition hover:text-orange-500 ${
                                            isActive
                                                ? "text-orange-500 font-semibold"
                                                : ""
                                        }`
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                        </ul>

                        {/* RIGHT SIDE */}
                        <div className="flex items-center gap-4">
                            {token && (
                                <Link
                                    to="/cart"
                                    className="relative flex items-center justify-center w-11 h-11 transition bg-orange-50 rounded-xl hover:bg-orange-100"
                                >
                                    <iconify-icon
                                        icon="mdi:cart-outline"
                                        width="24"
                                        className="text-orange-500"
                                    ></iconify-icon>

                                    {/* BADGE */}
                                    <span className="absolute flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-orange-500 rounded-full -top-1 -right-1">
                                        {cartCount}
                                    </span>
                                </Link>
                            )}
                            {token && userInfo ? (
                                <>
                                    <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-orange-50 rounded-xl">
                                        <div className="flex items-center justify-center w-9 h-9 text-white bg-orange-500 rounded-full">
                                            {userInfo.name.charAt(0)}
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">
                                                {userInfo.name}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                Customer
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleLogout}
                                        className="px-5 py-2.5 text-sm font-semibold text-white transition bg-red-500 rounded-xl hover:bg-red-600"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:text-orange-500"
                                    >
                                        Masuk
                                    </Link>

                                    <Link
                                        to="/register"
                                        className="px-5 py-2.5 text-sm font-semibold text-white transition bg-orange-500 rounded-xl hover:bg-orange-600 shadow-md"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
