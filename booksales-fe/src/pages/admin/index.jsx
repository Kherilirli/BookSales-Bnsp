import { useEffect, useState } from "react";
import { getDashboardData } from "../../_services/dashboard";
import RevenueChart from "../../components/revenue-cart";

export default function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await getDashboardData();

                setStats(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchDashboard();
    }, []);

    const formatRupiah = (number) => {
        if (number >= 1000000000) {
            return `Rp ${(number / 1000000000).toFixed(1).replace(".0", "")} M`;
        }

        if (number >= 1000000) {
            return `Rp ${(number / 1000000).toFixed(1).replace(".0", "")} Juta`;
        }

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(number);
    };

    if (!stats) {
        return (
            <div className="p-6">
                <h1 className="text-xl font-bold">Loading...</h1>
            </div>
        );
    }

    return (
        <section className="p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-800">
                    Dashboard Admin
                </h1>

                <p className="mt-2 text-gray-500">Statistik toko buku.</p>
            </div>

            {/* CARD */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <div className="p-6 bg-white shadow-lg rounded-3xl">
                    <p className="text-gray-500">Buku Tersedia</p>

                    <h2 className="mt-2 text-4xl font-extrabold text-gray-800">
                        {stats.total_books}
                    </h2>
                </div>

                <div className="p-6 bg-white shadow-lg rounded-3xl">
                    <p className="text-gray-500">Semua Stock</p>

                    <h2 className="mt-2 text-4xl font-extrabold text-gray-800">
                        {stats.total_stock}
                    </h2>
                </div>

                <div className="p-6 bg-white shadow-lg rounded-3xl">
                    <p className="text-gray-500">Buku Terjual</p>

                    <h2 className="mt-2 text-4xl font-extrabold text-gray-800">
                        {stats.books_sold}
                    </h2>
                </div>

                <div className="p-6 bg-white shadow-lg rounded-3xl">
                    <p className="text-gray-500">Pendapatan</p>

                    <h2 className="mt-2 text-2xl font-extrabold text-orange-500">
                        {formatRupiah(stats.total_revenue)}
                    </h2>
                </div>
            </div>

            {/* CHART */}
            <RevenueChart data={stats.monthly_revenue} />
        </section>
    );
}
