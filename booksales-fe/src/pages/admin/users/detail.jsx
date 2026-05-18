import { Link, useParams } from "react-router-dom";
import { showUser } from "../../../_services/user";
import { useEffect, useState } from "react";

export default function AdminUserDetail() {
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await showUser(id);

                setUser(userData);

                // ambil relasi langsung dari backend
                setTransactions(userData.transactions || []);
                setCartItems(userData.carts || []);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    // TOTAL BUKU DIBELI
    const totalBooksBought = transactions.reduce(
        (total, trx) => total + Number(trx.quantity || 0),
        0,
    );

    // TOTAL BELANJA
    const totalSpent = transactions.reduce(
        (total, trx) => total + Number(trx.total_amount || 0),
        0,
    );

    // TOTAL ITEM CART
    const totalCartItems = cartItems.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0,
    );

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    if (!user) {
        return (
            <div className="py-20 text-center text-gray-500">
                Loading...
            </div>
        );
    }

    return (
        <>
            <section className="max-w-6xl mx-auto">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            User Detail
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Detail informasi customer bookstore.
                        </p>
                    </div>

                    <Link
                        to="/admin/users"
                        className="px-5 py-3 text-sm font-semibold text-white transition bg-orange-500 rounded-2xl hover:bg-orange-600"
                    >
                        Back
                    </Link>
                </div>

                {/* PROFILE */}
                <div className="p-8 bg-white border border-orange-100 shadow-sm rounded-3xl">
                    <div className="flex flex-col gap-8 lg:flex-row">
                        {/* LEFT */}
                        <div className="flex flex-col items-center lg:w-72">
                            <div className="flex items-center justify-center w-32 h-32 text-5xl font-bold text-white bg-orange-500 rounded-full shadow-lg">
                                {user.name?.charAt(0)}
                            </div>

                            <h2 className="mt-5 text-2xl font-bold text-gray-800">
                                {user.name}
                            </h2>

                            <p className="mt-1 text-gray-500">
                                {user.email}
                            </p>

                            <span
                                className={`mt-4 px-4 py-2 rounded-full text-sm font-semibold ${
                                    user.role === "admin"
                                        ? "bg-red-100 text-red-600"
                                        : "bg-green-100 text-green-600"
                                }`}
                            >
                                {user.role}
                            </span>
                        </div>

                        {/* RIGHT */}
                        <div className="flex-1">
                            {/* STATS */}
                            <div className="grid gap-5 md:grid-cols-3">
                                <div className="p-6 border border-orange-100 rounded-3xl bg-orange-50">
                                    <p className="text-sm text-gray-500">
                                        Total Transactions
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold text-gray-800">
                                        {transactions.length}
                                    </h3>
                                </div>

                                <div className="p-6 border border-orange-100 rounded-3xl bg-orange-50">
                                    <p className="text-sm text-gray-500">
                                        Books Purchased
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold text-gray-800">
                                        {totalBooksBought}
                                    </h3>
                                </div>

                                <div className="p-6 border border-orange-100 rounded-3xl bg-orange-50">
                                    <p className="text-sm text-gray-500">
                                        Cart Items
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold text-gray-800">
                                        {totalCartItems}
                                    </h3>
                                </div>
                            </div>

                            {/* INFO */}
                            <div className="grid gap-5 mt-8 md:grid-cols-2">
                                <div className="p-6 border border-orange-100 rounded-3xl">
                                    <p className="text-sm text-gray-500">
                                        User ID
                                    </p>

                                    <h3 className="mt-2 text-lg font-bold text-gray-800">
                                        #{user.id}
                                    </h3>
                                </div>

                                <div className="p-6 border border-orange-100 rounded-3xl">
                                    <p className="text-sm text-gray-500">
                                        Registered At
                                    </p>

                                    <h3 className="mt-2 text-lg font-bold text-gray-800">
                                        {new Date(
                                            user.created_at,
                                        ).toLocaleDateString()}
                                    </h3>
                                </div>

                                <div className="p-6 border border-orange-100 rounded-3xl md:col-span-2">
                                    <p className="text-sm text-gray-500">
                                        Total Spending
                                    </p>

                                    <h3 className="mt-2 text-3xl font-extrabold text-orange-500">
                                        {formatRupiah(totalSpent)}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TRANSACTIONS */}
                <div className="mt-8 overflow-hidden bg-white border border-orange-100 shadow-sm rounded-3xl">
                    <div className="p-6 border-b border-orange-100">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Purchase History
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-orange-50">
                                <tr className="text-sm text-left text-gray-600">
                                    <th className="px-6 py-4 font-semibold">
                                        Order
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Book
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Qty
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Total
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Date
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions.length > 0 ? (
                                    transactions.map((trx) => (
                                        <tr
                                            key={trx.id}
                                            className="border-b border-orange-100 hover:bg-orange-50/40"
                                        >
                                            <td className="px-6 py-5 text-sm font-medium text-gray-700">
                                                {trx.order_number}
                                            </td>

                                            <td className="px-6 py-5 text-sm text-gray-700">
                                                {trx.book?.title}
                                            </td>

                                            <td className="px-6 py-5 text-sm text-gray-700">
                                                {trx.quantity}
                                            </td>

                                            <td className="px-6 py-5 text-sm font-semibold text-orange-500">
                                                {formatRupiah(
                                                    trx.total_amount,
                                                )}
                                            </td>

                                            <td className="px-6 py-5 text-sm text-gray-500">
                                                {new Date(
                                                    trx.created_at,
                                                ).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="py-10 text-center text-gray-400"
                                        >
                                            No transactions found.
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