import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { showTransaction } from "../../../_services/transactions";
import { bookImageStorage } from "../../../_api";

export default function TransactionDetail() {
    const { id } = useParams();

    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await showTransaction(id);
                console.log(data);
                setTransaction(data);
            } catch (error) {
                console.log(error);
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

    if (loading) {
        return (
            <section className="max-w-6xl mx-auto">
                <div className="p-10 text-center text-gray-500 bg-white border border-orange-100 shadow-sm rounded-3xl">
                    Loading transaction detail...
                </div>
            </section>
        );
    }

    return (
        <section className="max-w-6xl mx-auto">
            {/* HEADER */}
            <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Transaction Detail
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Detailed information about customer purchase.
                    </p>
                </div>

                <Link
                    to="/admin/transactions"
                    className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-orange-500 transition border border-orange-200 rounded-2xl hover:bg-orange-50"
                >
                    Back
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
                        <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
                            <iconify-icon
                                icon="mdi:check-circle"
                                width="18"
                            ></iconify-icon>
                            Transaction Successful
                        </span>

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
                                    Customer
                                </p>

                                <h3 className="mt-2 text-lg font-bold text-gray-800">
                                    {transaction?.user?.name || "-"}
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
                                    {formatRupiah(transaction?.book?.price)}
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
                                <p className="text-sm text-gray-500">Courier</p>

                                <h3 className="mt-2 text-lg font-bold text-gray-800 uppercase">
                                    {transaction?.shipping_service?.courier
                                        ?.name || "-"}
                                </h3>
                            </div>

                            <div className="p-5 border border-orange-100 rounded-2xl bg-orange-50/40">
                                <p className="text-sm text-gray-500">
                                    Shipping Service
                                </p>

                                <h3 className="mt-2 text-lg font-bold text-gray-800">
                                    {transaction?.shipping_service
                                        ?.service_name || "-"}
                                </h3>
                            </div>

                            <div className="p-5 border border-orange-100 rounded-2xl bg-orange-50/40">
                                <p className="text-sm text-gray-500">
                                    Shipping Cost
                                </p>

                                <h3 className="mt-2 text-lg font-bold text-gray-800">
                                    {formatRupiah(transaction?.shipping_cost)}
                                </h3>
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
                                        ).toLocaleDateString("id-ID")}
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
        </section>
    );
}
