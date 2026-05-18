import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

export default function RevenueChart({ data }) {
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
    ];

    // mapping data disini
    const chartData =
        data?.map((item) => ({
            month: monthNames[item.month - 1],
            total: item.total,
        })) || [];

    return (
        <div className="p-6 bg-white shadow-lg rounded-3xl">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Grafik Pendapatan
                </h2>

                <p className="text-gray-500">
                    Pendapatan transaksi per bulan
                </p>
            </div>

            <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#f97316"
                            strokeWidth={4}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}