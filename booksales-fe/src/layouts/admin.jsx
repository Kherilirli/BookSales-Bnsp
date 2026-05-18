import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout, useDecodeToken } from "../_services/auth";
import { useEffect } from "react";
import Footer from "../components/footer";

export default function AdminLayout() {
    const navigate = useNavigate();

    const token = localStorage.getItem("accessToken");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const decodedToken = useDecodeToken(token);

    useEffect(() => {
        if (!token || !decodedToken || !decodedToken.success) {
            navigate("/login");
            return;
        }

        if (userInfo?.role !== "admin") {
            navigate("/");
        }
    }, [token, decodedToken, navigate, userInfo]);

    const handleLogout = async () => {
        if (token) {
            await logout({ token });
            localStorage.removeItem("userInfo");
        }

        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    const menuClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
            isActive
                ? "bg-orange-500 text-white shadow-lg"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
        }`;

    return (
        <>
            <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
                {/* NAVBAR */}
                <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
                    <div className="flex items-center justify-between max-w-screen-2xl px-6 py-4 mx-auto">
                        {/* LOGO */}
                        <NavLink
                            to="/admin"
                            className="flex items-center gap-3"
                        >
                            <div className="flex items-center justify-center w-11 h-11 text-white bg-orange-500 rounded-xl shadow-lg">
                                <iconify-icon
                                    icon="solar:book-bold"
                                    width="28"
                                ></iconify-icon>
                            </div>

                            <div>
                                <h1 className="text-2xl font-extrabold text-gray-800">
                                    BookSales
                                </h1>

                                <p className="text-xs text-gray-500">
                                    Admin Dashboard
                                </p>
                            </div>
                        </NavLink>

                        {/* USER */}
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-orange-50 rounded-xl">
                                <div className="flex items-center justify-center w-10 h-10 text-white bg-orange-500 rounded-full font-bold">
                                    {userInfo?.name?.charAt(0)}
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        {userInfo?.name}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Administrator
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="px-5 py-2.5 text-sm font-semibold text-white transition bg-red-500 rounded-xl hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                <div className="flex">
                    {/* SIDEBAR */}
                    <aside className="hidden md:flex flex-col w-72 min-h-screen p-6 bg-white border-r border-orange-100 shadow-sm">
                        <div className="space-y-2">
                            <p className="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase">
                                Main Menu
                            </p>

                            <NavLink to="/admin" end className={menuClass}>
                                <iconify-icon
                                    icon="mdi:view-dashboard"
                                    width="22"
                                ></iconify-icon>

                                <span>Dashboard</span>
                            </NavLink>

                            <NavLink to="/admin/books" className={menuClass}>
                                <iconify-icon
                                    icon="mdi:book-open-page-variant"
                                    width="22"
                                ></iconify-icon>

                                <span>Books</span>
                            </NavLink>

                            <NavLink to="/admin/authors" className={menuClass}>
                                <iconify-icon
                                    icon="mdi:account-edit"
                                    width="22"
                                ></iconify-icon>

                                <span>Authors</span>
                            </NavLink>

                            <NavLink to="/admin/genres" className={menuClass}>
                                <iconify-icon
                                    icon="mdi:shape"
                                    width="22"
                                ></iconify-icon>

                                <span>Genres</span>
                            </NavLink>

                            <NavLink
                                to="/admin/transactions"
                                className={menuClass}
                            >
                                <iconify-icon
                                    icon="mdi:cart-outline"
                                    width="22"
                                ></iconify-icon>

                                <span>Transactions</span>
                            </NavLink>

                            <NavLink to="/admin/users" className={menuClass}>
                                <iconify-icon
                                    icon="mdi:account-group"
                                    width="22"
                                ></iconify-icon>

                                <span>Users</span>
                            </NavLink>
                            
                            <NavLink to="/admin/help" className={menuClass}>
                                <iconify-icon
                                    icon="mdi:message-processing"
                                    width="22"
                                ></iconify-icon>

                                <span>Help Center</span>
                            </NavLink>
                        </div>

                        {/* BOTTOM */}
                        <div className="pt-6 mt-8 border-t border-orange-100">
                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center w-full gap-2 px-4 py-3 font-semibold text-red-500 transition border border-red-200 rounded-2xl hover:bg-red-50"
                            >
                                <iconify-icon
                                    icon="mdi:logout"
                                    width="20"
                                ></iconify-icon>
                                Logout
                            </button>
                        </div>
                    </aside>

                    {/* CONTENT */}
                    <main className="flex-1 p-6">
                        <div className="min-h-[80vh] p-6 bg-white border border-orange-100 shadow-md rounded-3xl">
                            <Outlet />
                        </div>

                        <div className="mt-8">
                            <Footer />
                        </div>
                    </main>
                </div>
            </section>
        </>
    );
}
