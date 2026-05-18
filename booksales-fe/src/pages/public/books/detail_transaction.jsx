import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { showTransaction } from "../../../_services/transactions";
import { bookImageStorage } from "../../../_api";

export default function TransactionDetailCustomer() {
    const { id } = useParams();

    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await showTransaction(id);

                console.log(data);

                setTransaction(data);
            } catch (error) {
                console.log(error);

                setError(
                    error?.response?.data?.message ||
                        "Gagal mengambil detail transaksi",
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number || 0);
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
                return status || "-";
        }
    };

    if (loading) {
        return (
            <section className="max-w-6xl px-6 py-10 mx-auto">
                <div className="flex items-center justify-center py-32 bg-white border border-orange-100 shadow-sm rounded-3xl">
                    <div className="w-14 h-14 border-4 border-orange-200 rounded-full border-t-orange-500 animate-spin"></div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="max-w-6xl px-6 py-10 mx-auto">
                <div className="p-10 text-center bg-white border border-red-100 rounded-3xl">
                    <p className="text-lg font-semibold text-red-500">
                        {error}
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen py-12 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
            <div className="max-w-6xl px-6 mx-auto">

                {/* HEADER */}
                <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">

                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900">
                            Detail
                            <span className="text-orange-500">
                                {" "}Transaksi
                            </span>
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Informasi lengkap transaksi pembelian buku.
                        </p>
                    </div>

                    <Link
                        to="/transactions"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-orange-500 transition border border-orange-200 rounded-2xl hover:bg-orange-50"
                    >
                        <iconify-icon
                            icon="mdi:arrow-left"
                            width="18"
                        ></iconify-icon>

                        Kembali
                    </Link>
                </div>

                {/* CARD */}
                <div className="p-6 bg-white border border-orange-100 shadow-sm rounded-3xl">
                    <div className="grid gap-8 lg:grid-cols-2">

                        {/* IMAGE */}
                        <div>
                            <div className="overflow-hidden border border-orange-100 shadow-sm rounded-3xl">
                                <img
                                    src={`${bookImageStorage}/${transaction?.book?.cover_photo}`}
                                    alt={transaction?.book?.title}
                                    className="object-cover w-full h-[500px]"
                                    onError={(e) => {
                                        e.target.src =
                                            "https://via.placeholder.com/500x700";
                                    }}
                                />
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div>

                            {/* STATUS */}
                            <div className="flex flex-wrap gap-3">

                                {/* PAYMENT */}
                                <span
                                    className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full ${getPaymentStatus(
                                        transaction?.payment_status,
                                    )}`}
                                >
                                    <iconify-icon
                                        icon="mdi:credit-card"
                                        width="18"
                                    ></iconify-icon>

                                    {transaction?.payment_status || "-"}
                                </span>

                                {/* SHIPPING */}
                                <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                                    <iconify-icon
                                        icon="mdi:truck-delivery"
                                        width="18"
                                    ></iconify-icon>

                                    {getShippingStatus(
                                        transaction?.shipping_status,
                                    )}
                                </span>
                            </div>

                            {/* TITLE */}
                            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-gray-900">
                                {transaction?.book?.title}
                            </h1>

                            {/* DESCRIPTION */}
                            <p className="mt-5 leading-relaxed text-gray-600">
                                {transaction?.book?.description ||
                                    "No description available."}
                            </p>

                            {/* INFO */}
                            <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2">

                                <div className="p-5 border border-orange-100 rounded-2xl bg-orange-50/40">
                                    <p className="text-sm text-gray-500">
                                        Order Number
                                    </p>

                                    <h3 className="mt-2 text-lg font-bold text-gray-800 break-words">
                                        {transaction?.order_number}
                                    </h3>
                                </div>

                                <div className="p-5 border border-orange-100 rounded-2xl bg-orange-50/40">
                                    <p className="text-sm text-gray-500">
                                        Quantity
                                    </p>

                                    <h3 className="mt-2 text-lg font-bold text-gray-800">
                                        {transaction?.quantity} pcs
                                    </h3>
                                </div>

                                <div className="p-5 border border-orange-100 rounded-2xl bg-orange-50/40">
                                    <p className="text-sm text-gray-500">
                                        Book Price
                                    </p>

                                    <h3 className="mt-2 text-lg font-bold text-gray-800">
                                        {formatRupiah(
                                            transaction?.book?.price,
                                        )}
                                    </h3>
                                </div>

                                <div className="p-5 border border-orange-100 rounded-2xl bg-orange-50/40">
                                    <p className="text-sm text-gray-500">
                                        Subtotal
                                    </p>

                                    <h3 className="mt-2 text-lg font-bold text-orange-500">
                                        {formatRupiah(
                                            Number(transaction?.subtotal) > 0
                                                ? transaction?.subtotal
                                                : (transaction?.book?.price || 0) *
                                                      (transaction?.quantity || 0),
                                        )}
                                    </h3>
                                </div>

                                <div className="p-5 border border-orange-100 rounded-2xl bg-orange-50/40">
                                    <p className="text-sm text-gray-500">
                                        Courier
                                    </p>

                                    <h3 className="mt-2 text-lg font-bold text-gray-800 uppercase">
                                        {transaction?.shipping_service?.courier
                                            ?.name ||
                                            transaction?.shipping_courier ||
                                            "-"}
                                    </h3>
                                </div>

                                <div className="p-5 border border-orange-100 rounded-2xl bg-orange-50/40">
                                    <p className="text-sm text-gray-500">
                                        Shipping Service
                                    </p>

                                    <h3 className="mt-2 text-lg font-bold text-gray-800">
                                        {transaction?.shipping_service
                                            ?.service_name ||
                                            transaction?.shipping_service ||
                                            "-"}
                                    </h3>
                                </div>

                                <div className="p-5 border border-orange-100 rounded-2xl bg-orange-50/40">
                                    <p className="text-sm text-gray-500">
                                        Shipping Cost
                                    </p>

                                    <h3 className="mt-2 text-lg font-bold text-gray-800">
                                        {formatRupiah(
                                            transaction?.shipping_cost,
                                        )}
                                    </h3>
                                </div>

                                <div className="p-5 border border-orange-100 rounded-2xl bg-orange-50/40">
                                    <p className="text-sm text-gray-500">
                                        Tracking Number
                                    </p>

                                    <h3 className="mt-2 text-lg font-bold text-gray-800 break-words">
                                        {transaction?.tracking_number || "-"}
                                    </h3>
                                </div>

                            </div>

                            {/* ADDRESS */}
                            <div className="p-5 mt-6 border border-orange-100 rounded-2xl bg-orange-50/30">

                                <h3 className="text-lg font-bold text-gray-800">
                                    Alamat Pengiriman
                                </h3>

                                <div className="grid gap-4 mt-5 sm:grid-cols-2">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Nama Penerima
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-800">
                                            {transaction?.receiver_name || "-"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Nomor Telepon
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-800">
                                            {transaction?.phone || "-"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Kota
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-800">
                                            {transaction?.city || "-"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Provinsi
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-800">
                                            {transaction?.province || "-"}
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-5">
                                    <p className="text-sm text-gray-500">
                                        Detail Address
                                    </p>

                                    <p className="mt-2 leading-relaxed text-gray-800">
                                        {transaction?.full_address || "-"}
                                    </p>
                                </div>

                            </div>

                            {/* FOOTER */}
                            <div className="pt-6 mt-8 border-t border-orange-100">
                                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                                    <div>
                                        <p className="text-sm text-gray-400">
                                            Purchase Date
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-700">
                                            {new Date(
                                                transaction?.created_at,
                                            ).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>

                                    <div className="text-left md:text-right">
                                        <p className="text-sm text-gray-400">
                                            Total Payment
                                        </p>

                                        <p className="text-3xl font-extrabold text-orange-500">
                                            {formatRupiah(
                                                transaction?.total_amount,
                                            )}
                                        </p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}