import { useEffect, useState } from "react";
import { getUsers } from "../../../_services/user";
import { Link } from "react-router-dom";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUsers();

                // FILTER CUSTOMER ONLY
                const customers = data.filter(
                    (user) => user.role === "customer",
                );

                setUsers(customers);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // SEARCH
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <>
            <section className="max-w-7xl mx-auto">
                {/* HEADER */}
                <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Customers
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage all registered customers.
                        </p>
                    </div>
                </div>

                {/* CARD */}
                <div className="overflow-hidden bg-white border border-orange-100 shadow-sm rounded-3xl">
                    {/* SEARCH */}
                    <div className="p-5 border-b border-orange-100">
                        <input
                            type="text"
                            placeholder="Search customer..."
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
                                        Name
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Email
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Role
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Registered
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="transition border-b border-orange-100 hover:bg-orange-50/40"
                                        >
                                            <td className="px-6 py-5 font-semibold text-gray-800">
                                                {user.name}
                                            </td>

                                            <td className="px-6 py-5 text-sm text-gray-600">
                                                {user.email}
                                            </td>

                                            <td className="px-6 py-5">
                                                <span className="px-3 py-1 text-xs font-semibold text-orange-600 bg-orange-100 rounded-full">
                                                    {user.role}
                                                </span>
                                            </td>

                                            <td className="px-6 py-5 text-sm text-gray-600">
                                                {new Date(
                                                    user.created_at,
                                                ).toLocaleDateString("id-ID")}
                                            </td>

                                            <td className="px-6 py-5">
                                                <Link
                                                    to={`/admin/users/detail/${user.id}`}
                                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition bg-orange-500 rounded-xl hover:bg-orange-600"
                                                >
                                                    <iconify-icon
                                                        icon="mdi:eye"
                                                        width="18"
                                                    ></iconify-icon>
                                                    Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="py-10 text-center text-gray-400"
                                        >
                                            No customers found.
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
