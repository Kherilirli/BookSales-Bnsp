import { useEffect, useState } from "react";
import { getTransactions } from "../../../_services/transactions";
import { Link } from "react-router-dom";
import { bookImageStorage } from "../../../_api";

export default function AdminTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [openDropdownId, setOpenDropdownId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTransactions();
            setTransactions(data);
        };
        fetchData();
    }, []);

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    const filteredTransactions = transactions.filter((trx) =>
        trx.book?.title.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <>
            <section className="max-w-7xl mx-auto">
                {/* HEADER */}
                <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Transactions
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage all customer transactions.
                        </p>
                    </div>
                </div>

                {/* CARD */}
                <div className="overflow-hidden bg-white border border-orange-100 shadow-sm rounded-3xl">
                    {/* SEARCH */}
                    <div className="p-5 border-b border-orange-100">
                        <input
                            type="text"
                            placeholder="Search transaction..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-3 text-sm border border-orange-200 rounded-2xl outline-none md:w-80 focus:ring-2 focus:ring-orange-300"
                        />
                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-orange-50">
                                <tr className="text-sm text-left text-gray-600">
                                    <th className="px-6 py-4 font-semibold">
                                        ID
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Order
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Customer
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
                                    
                                    <th className="px-6 py-4 font-semibold">
                                        Action
                                    </th>

                                    <th className="px-6 py-4 font-semibold"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredTransactions.length > 0 ? (
                                    filteredTransactions.map((trx) => (
                                        <tr
                                            key={trx.id}
                                            className="transition border-b border-orange-100 hover:bg-orange-50/40"
                                        >
                                            <td className="px-6 py-5 text-sm text-gray-700">
                                                #{trx.id}
                                            </td>

                                            <td className="max-w-[180px] px-6 py-5 text-sm font-medium text-gray-800 break-words whitespace-normal">
                                                {trx.order_number}
                                            </td>

                                            <td className="max-w-[180px] px-6 py-5 text-sm text-gray-700 break-words whitespace-normal">
                                                {trx.user?.name || "-"}
                                            </td>

                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={`${bookImageStorage}/${trx.book?.cover_photo}`}
                                                        alt=""
                                                        className="object-cover w-12 h-16 border border-orange-100 rounded-xl"
                                                        onError={(e) => {
                                                            e.target.src =
                                                                "https://via.placeholder.com/50";
                                                        }}
                                                    />

                                                    <span className="max-w-[220px] text-sm font-medium text-gray-800 break-words whitespace-normal">
                                                        {trx.book?.title}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-5 text-sm text-gray-700">
                                                {trx.quantity}
                                            </td>

                                            <td className="px-6 py-5 text-sm font-semibold text-orange-500">
                                                {formatRupiah(trx.total_amount)}
                                            </td>

                                            <td className="px-6 py-5 text-sm text-gray-500">
                                                {new Date(
                                                    trx.created_at,
                                                ).toLocaleDateString()}
                                            </td>

                                            <td className="relative px-6 py-5 text-right">
                                                <button
                                                    onClick={() =>
                                                        toggleDropdown(trx.id)
                                                    }
                                                    className="flex items-center justify-center w-9 h-9 ml-auto transition rounded-xl hover:bg-orange-100"
                                                >
                                                    <iconify-icon
                                                        icon="mdi:dots-vertical"
                                                        width="20"
                                                        className="text-gray-600"
                                                    ></iconify-icon>
                                                </button>

                                                {openDropdownId === trx.id && (
                                                    <div className="absolute right-6 top-14 z-20 w-40 overflow-hidden bg-white border border-orange-100 shadow-xl rounded-2xl">
                                                        <Link
                                                            to={`/admin/transactions/detail/${trx.id}`}
                                                            className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 transition hover:bg-orange-50"
                                                        >
                                                            <iconify-icon
                                                                icon="mdi:eye-outline"
                                                                width="17"
                                                            ></iconify-icon>
                                                            Detail
                                                        </Link>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="8"
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
