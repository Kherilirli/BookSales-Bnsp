import { useEffect, useState } from "react";
import { getTransactions } from "../../../_services/transactions";
import { bookImageStorage } from "../../../_api";

export default function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleTransactions, setVisibleTransactions] = useState(6);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    const getPaymentStatus = (status) => {
        switch (status) {
            case "paid":
                return "bg-green-100 text-green-600";

            case "pending":
                return "bg-yellow-100 text-yellow-600";

            case "failed":
                return "bg-red-100 text-red-600";

            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    const getShippingStatus = (status) => {
        switch (status) {
            case "pending":
                return "Menunggu Diproses";

            case "processed":
                return "Sedang Diproses";

            case "shipped":
                return "Sedang Dikirim";

            case "delivered":
                return "Pesanan Selesai";

            default:
                return status;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTransactions();

                const sortedData = data.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at),
                );

                setTransactions(sortedData);
            } catch (error) {
                console.log(error);

                setError(error?.response?.data?.message || "Terjadi kesalahan");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <section className="min-h-screen py-12 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
                <div className="max-w-screen-xl px-6 mx-auto">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 lg:text-5xl">
                            Riwayat
                            <span className="text-orange-500"> Transaksi</span>
                        </h1>

                        <p className="max-w-2xl mx-auto mt-4 text-gray-600">
                            Semua pembelian buku yang pernah kamu lakukan akan
                            tampil di halaman ini.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-32">
                            <div className="w-14 h-14 border-4 border-orange-200 rounded-full border-t-orange-500 animate-spin"></div>
                        </div>
                    ) : error ? (
                        <div className="py-20 text-center">
                            <p className="text-lg font-semibold text-red-500">
                                {error}
                            </p>
                        </div>
                    ) : transactions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-white border border-orange-100 shadow-lg rounded-3xl">
                            <iconify-icon
                                icon="mdi:cart-off"
                                width="80"
                                class="text-orange-400"
                            ></iconify-icon>

                            <h2 className="mt-6 text-2xl font-bold text-gray-800">
                                Belum Ada Transaksi
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Yuk mulai beli buku favoritmu sekarang.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {transactions
                                    .slice(0, visibleTransactions)
                                    .map((trx) => (
                                        <div
                                            key={trx.id}
                                            className="p-5 transition bg-white border border-orange-100 shadow-md rounded-3xl hover:-translate-y-2 hover:shadow-2xl"
                                        >
                                            <div className="overflow-hidden rounded-2xl h-60">
                                                <img
                                                    src={`${bookImageStorage}/${trx.book?.cover_photo}`}
                                                    alt={trx.book?.title}
                                                    className="object-cover w-full h-full transition hover:scale-105"
                                                    onError={(e) => {
                                                        e.target.src =
                                                            "https://via.placeholder.com/300x400";
                                                    }}
                                                />
                                            </div>

                                            <div className="pt-5">
                                                <div className="flex flex-wrap gap-2">
                                                    <span
                                                        className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full ${getPaymentStatus(
                                                            trx.payment_status,
                                                        )}`}
                                                    >
                                                        <iconify-icon
                                                            icon="mdi:credit-card"
                                                            width="16"
                                                        ></iconify-icon>

                                                        {trx.payment_status}
                                                    </span>

                                                    <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                                                        <iconify-icon
                                                            icon="mdi:truck-delivery"
                                                            width="16"
                                                        ></iconify-icon>

                                                        {getShippingStatus(
                                                            trx.shipping_status,
                                                        )}
                                                    </span>
                                                </div>

                                                <h2 className="mt-4 text-xl font-bold leading-tight text-gray-900">
                                                    {trx.book?.title}
                                                </h2>

                                                <div className="mt-4 space-y-3 text-sm text-gray-600">
                                                    <div className="flex items-center justify-between">
                                                        <span className="flex items-center gap-2">
                                                            <iconify-icon
                                                                icon="mdi:cash"
                                                                width="18"
                                                            ></iconify-icon>
                                                            Harga
                                                        </span>

                                                        <span className="font-semibold">
                                                            {formatRupiah(
                                                                trx.book?.price,
                                                            )}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <span className="flex items-center gap-2">
                                                            <iconify-icon
                                                                icon="mdi:cart"
                                                                width="18"
                                                            ></iconify-icon>
                                                            Jumlah
                                                        </span>

                                                        <span className="font-semibold">
                                                            {trx.quantity} pcs
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <span className="flex items-center gap-2">
                                                            <iconify-icon
                                                                icon="mdi:truck"
                                                                width="18"
                                                            ></iconify-icon>
                                                            Ongkir
                                                        </span>

                                                        <span className="font-semibold">
                                                            {formatRupiah(
                                                                trx.shipping_cost,
                                                            )}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <span className="flex items-center gap-2">
                                                            <iconify-icon
                                                                icon="mdi:map-marker"
                                                                width="18"
                                                            ></iconify-icon>
                                                            Kota
                                                        </span>

                                                        <span className="font-semibold">
                                                            {trx.address
                                                                ?.city ||
                                                                trx.city ||
                                                                "-"}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <span className="flex items-center gap-2">
                                                            <iconify-icon
                                                                icon="mdi:truck-fast"
                                                                width="18"
                                                            ></iconify-icon>
                                                            Kurir
                                                        </span>

                                                        <span className="font-semibold uppercase">
                                                            {trx
                                                                .shipping_service
                                                                ?.courier
                                                                ?.name ||
                                                                trx.shipping_courier ||
                                                                "-"}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <span className="flex items-center gap-2">
                                                            <iconify-icon
                                                                icon="mdi:package-variant"
                                                                width="18"
                                                            ></iconify-icon>
                                                            Service
                                                        </span>

                                                        <span className="font-semibold">
                                                            {typeof trx.shipping_service ===
                                                            "object"
                                                                ? trx
                                                                      .shipping_service
                                                                      ?.service_name
                                                                : trx.shipping_service ||
                                                                  "-"}
                                                        </span>
                                                    </div>

                                                    {trx.tracking_number && (
                                                        <div className="flex items-center justify-between">
                                                            <span className="flex items-center gap-2">
                                                                <iconify-icon
                                                                    icon="mdi:barcode"
                                                                    width="18"
                                                                ></iconify-icon>
                                                                Resi
                                                            </span>

                                                            <span className="font-semibold">
                                                                {
                                                                    trx.tracking_number
                                                                }
                                                            </span>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center justify-between">
                                                        <span className="flex items-center gap-2">
                                                            <iconify-icon
                                                                icon="mdi:calendar"
                                                                width="18"
                                                            ></iconify-icon>
                                                            Tanggal
                                                        </span>

                                                        <span className="font-semibold">
                                                            {new Date(
                                                                trx.created_at,
                                                            ).toLocaleDateString(
                                                                "id-ID",
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="pt-5 mt-5 border-t border-orange-100">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-xs text-gray-400">
                                                                Order ID
                                                            </p>

                                                            <p className="font-semibold text-gray-700">
                                                                {
                                                                    trx.order_number
                                                                }
                                                            </p>
                                                        </div>

                                                        <div className="text-right">
                                                            <p className="text-xs text-gray-400">
                                                                Total
                                                            </p>

                                                            <p className="text-2xl font-extrabold text-orange-500">
                                                                {formatRupiah(
                                                                    trx.total_amount,
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/* <Link
                                                        to={`/transactions/detail/${trx.id}`}
                                                        className="inline-flex items-center justify-center w-full gap-2 py-3 mt-5 font-semibold text-white transition bg-orange-500 rounded-xl hover:bg-orange-600"
                                                    >
                                                        <iconify-icon
                                                            icon="mdi:file-document-outline"
                                                            width="20"
                                                        ></iconify-icon>
                                                        Lihat Detail
                                                    </Link> */}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            {visibleTransactions < transactions.length && (
                                <div className="mt-12 text-center">
                                    <button
                                        onClick={() =>
                                            setVisibleTransactions(
                                                (prev) => prev + 6,
                                            )
                                        }
                                        className="px-8 py-3 font-semibold text-orange-500 transition border border-orange-500 rounded-xl hover:bg-orange-50"
                                    >
                                        Show More
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
