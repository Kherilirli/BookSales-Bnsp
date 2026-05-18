import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { showBook } from "../../../_services/books";
import { getAddresses } from "../../../_services/address";
import { getCouriers } from "../../../_services/couriers";
import { getShippingServices } from "../../../_services/shippingServices";
import { bookImageStorage } from "../../../_api";
import { checkoutBuyNow } from "../../../_services/payment";
import { updateTransaction } from "../../../_services/transactions";

export default function Checkout() {
    const { id } = useParams();

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const quantity = Number(searchParams.get("quantity")) || 1;

    const [book, setBook] = useState({});
    const [addresses, setAddresses] = useState([]);
    const [couriers, setCouriers] = useState([]);
    const [shippingServices, setShippingServices] = useState([]);

    const [selectedAddress, setSelectedAddress] = useState("");
    const [selectedCourier, setSelectedCourier] = useState("");
    const [selectedService, setSelectedService] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number || 0);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bookData, addressData, courierData, serviceData] =
                    await Promise.all([
                        showBook(id),
                        getAddresses(),
                        getCouriers(),
                        getShippingServices(),
                    ]);

                setBook(bookData);
                setAddresses(addressData);
                setCouriers(courierData);
                setShippingServices(serviceData);

                if (addressData.length > 0) {
                    setSelectedAddress(addressData[0].id);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const filteredServices = useMemo(() => {
        return shippingServices.filter(
            (service) => String(service.courier_id) === String(selectedCourier),
        );
    }, [shippingServices, selectedCourier]);

    const selectedShippingService = shippingServices.find(
        (service) => String(service.id) === String(selectedService),
    );

    const subtotal = (book.price || 0) * quantity;

    const shippingCost = selectedShippingService?.price || 0;

    const total = subtotal + shippingCost;

    const handleCheckout = async () => {
        try {
            setLoading(true);
            setError(null);

            // VALIDASI
            if (!selectedAddress) {
                setError("Pilih alamat terlebih dahulu");
                return;
            }

            if (!selectedCourier) {
                setError("Pilih courier terlebih dahulu");
                return;
            }

            if (!selectedService) {
                setError("Pilih shipping service terlebih dahulu");
                return;
            }

            // SHIPPING SERVICE TERPILIH
            const service = shippingServices.find(
                (item) => String(item.id) === String(selectedService),
            );

            // PAYLOAD FINAL
            const payload = {
                book_id: Number(id),
                quantity: quantity,

                address_id: Number(selectedAddress),

                shipping_service_id: Number(selectedService),

                shipping_cost: service.price,
            };

            // REQUEST BACKEND
            const response = await checkoutBuyNow(payload);

            // SNAP TOKEN
            const snapToken = response.snap_token;

            window.snap.pay(snapToken, {
                onSuccess: async function () {
                    await updateTransaction(response.transaction.id, {
                        payment_status: "paid",
                        transaction_status: "paid",
                        shipping_status: "processed",
                    });

                    alert("Pembayaran berhasil");

                    navigate("/transactions");
                },

                onPending: function () {
                    alert("Menunggu pembayaran");

                    navigate("/transactions");
                },

                onError: function () {
                    alert("Pembayaran gagal");
                },

                onClose: function () {
                    alert("Popup pembayaran ditutup");
                },
            });
        } catch (error) {
            console.log(error);

            setError(
                error?.response?.data?.message ||
                    "Terjadi kesalahan saat checkout",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="min-h-screen py-12 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
                <div className="max-w-screen-xl px-6 mx-auto">
                    <div className="mb-10">
                        <h1 className="text-4xl font-extrabold text-gray-900">
                            Checkout
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Lengkapi alamat dan pengiriman sebelum melakukan
                            pembayaran.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* LEFT */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* BOOK */}
                            <div className="p-6 bg-white border border-orange-100 shadow-xl rounded-3xl">
                                <div className="flex flex-col gap-6 md:flex-row">
                                    <div className="overflow-hidden rounded-2xl w-52">
                                        <img
                                            src={`${bookImageStorage}/${book.cover_photo}`}
                                            alt={book.title}
                                            className="object-cover w-full h-full"
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://via.placeholder.com/300x400";
                                            }}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h2 className="text-3xl font-bold text-gray-900">
                                            {book.title}
                                        </h2>

                                        <p className="mt-4 text-2xl font-extrabold text-orange-500">
                                            {formatRupiah(book.price)}
                                        </p>

                                        <div className="mt-5 space-y-2 text-gray-600">
                                            <p>
                                                Quantity :
                                                <span className="ml-2 font-bold text-gray-900">
                                                    {quantity}
                                                </span>
                                            </p>

                                            <p>
                                                Stock :
                                                <span className="ml-2 font-bold text-gray-900">
                                                    {book.stock}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ADDRESS */}
                            <div className="p-6 bg-white border border-orange-100 shadow-xl rounded-3xl">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Pilih Alamat
                                    </h2>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate("/address", {
                                                state: {
                                                    from: `/checkout/${id}?quantity=${quantity}`,
                                                },
                                            })
                                        }
                                        className="px-4 py-2 text-sm font-semibold text-orange-500 border border-orange-300 rounded-xl hover:bg-orange-50"
                                    >
                                        + Tambah Alamat
                                    </button>
                                </div>

                                {/* EMPTY ADDRESS */}
                                {addresses.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-14 mt-6 border border-dashed border-orange-200 rounded-2xl bg-orange-50">
                                        <iconify-icon
                                            icon="mdi:map-marker-off"
                                            width="70"
                                            className="text-orange-400"
                                        ></iconify-icon>

                                        <h3 className="mt-4 text-xl font-bold text-gray-800">
                                            Belum Ada Alamat
                                        </h3>

                                        <p className="mt-2 text-center text-gray-500">
                                            Tambahkan alamat pengiriman terlebih
                                            dahulu sebelum checkout.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate("/address", {
                                                    state: {
                                                        from: `/checkout/${id}?quantity=${quantity}`,
                                                    },
                                                })
                                            }
                                            className="px-6 py-3 mt-6 font-semibold text-white bg-orange-500 rounded-2xl hover:bg-orange-600"
                                        >
                                            Tambah Alamat
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mt-5 space-y-4">
                                        {addresses.map((address) => (
                                            <label
                                                key={address.id}
                                                className={`block p-5 border rounded-2xl cursor-pointer transition ${
                                                    String(selectedAddress) ===
                                                    String(address.id)
                                                        ? "border-orange-500 bg-orange-50"
                                                        : "border-gray-200 hover:border-orange-300"
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="address"
                                                    value={address.id}
                                                    checked={
                                                        String(
                                                            selectedAddress,
                                                        ) === String(address.id)
                                                    }
                                                    onChange={(e) =>
                                                        setSelectedAddress(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="hidden"
                                                />

                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900">
                                                            {
                                                                address.receiver_name
                                                            }
                                                        </h3>

                                                        <p className="mt-1 text-gray-600">
                                                            {address.phone}
                                                        </p>

                                                        <p className="mt-3 leading-relaxed text-gray-600">
                                                            {
                                                                address.full_address
                                                            }
                                                            , {address.district}
                                                            , {address.city},{" "}
                                                            {address.province},{" "}
                                                            {
                                                                address.postal_code
                                                            }
                                                        </p>
                                                    </div>

                                                    {String(selectedAddress) ===
                                                        String(address.id) && (
                                                        <div className="flex items-center justify-center w-10 h-10 text-white bg-orange-500 rounded-full">
                                                            <iconify-icon
                                                                icon="mdi:check"
                                                                width="22"
                                                            ></iconify-icon>
                                                        </div>
                                                    )}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* SHIPPING */}
                            <div className="p-6 bg-white border border-orange-100 shadow-xl rounded-3xl">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Pengiriman
                                </h2>

                                {/* COURIER */}
                                <div className="mt-6">
                                    <label className="block mb-2 font-semibold text-gray-700">
                                        Courier
                                    </label>

                                    <select
                                        value={selectedCourier}
                                        onChange={(e) => {
                                            setSelectedCourier(e.target.value);
                                            setSelectedService("");
                                        }}
                                        className="w-full px-4 py-4 border border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    >
                                        <option value="">Pilih Courier</option>

                                        {couriers.map((courier) => (
                                            <option
                                                key={courier.id}
                                                value={courier.id}
                                            >
                                                {courier.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* SHIPPING SERVICE */}
                                <div className="mt-6">
                                    <label className="block mb-2 font-semibold text-gray-700">
                                        Shipping Service
                                    </label>

                                    <select
                                        value={selectedService}
                                        onChange={(e) =>
                                            setSelectedService(e.target.value)
                                        }
                                        className="w-full px-4 py-4 border border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    >
                                        <option value="">
                                            Pilih Shipping Service
                                        </option>

                                        {filteredServices.map((service) => (
                                            <option
                                                key={service.id}
                                                value={service.id}
                                            >
                                                {service.service_name} -{" "}
                                                {formatRupiah(service.price)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div>
                            <div className="sticky p-8 bg-white border border-orange-100 shadow-xl top-28 rounded-3xl">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Ringkasan Pembayaran
                                </h2>

                                {error && (
                                    <div className="p-4 mt-5 text-sm text-red-500 border border-red-200 bg-red-50 rounded-2xl">
                                        {error}
                                    </div>
                                )}

                                <div className="mt-8 space-y-5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">
                                            Subtotal
                                        </span>

                                        <span className="font-bold text-gray-900">
                                            {formatRupiah(subtotal)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">
                                            Ongkir
                                        </span>

                                        <span className="font-bold text-gray-900">
                                            {formatRupiah(shippingCost)}
                                        </span>
                                    </div>

                                    <div className="pt-5 border-t border-orange-100">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-gray-900">
                                                Total
                                            </span>

                                            <span className="text-3xl font-extrabold text-orange-500">
                                                {formatRupiah(total)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={loading}
                                    className="flex items-center justify-center w-full gap-3 px-6 py-4 mt-8 font-semibold text-white transition bg-orange-500 rounded-2xl hover:bg-orange-600 disabled:bg-gray-400"
                                >
                                    <iconify-icon
                                        icon="mdi:credit-card"
                                        width="22"
                                    ></iconify-icon>

                                    {loading
                                        ? "Memproses..."
                                        : "Checkout Sekarang"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
