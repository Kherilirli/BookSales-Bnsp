import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { bookImageStorage } from "../../../_api";
import { getCarts, deleteCart, updateCart } from "../../../_services/carts";
import { getAddresses } from "../../../_services/address";
import { getCouriers } from "../../../_services/couriers";
import { getShippingServices } from "../../../_services/shippingServices";
import { checkoutCart } from "../../../_services/payment";
import { updateTransaction } from "../../../_services/transactions";

export default function Cart() {
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [loadingCheckout, setLoadingCheckout] = useState(false);

    const [addresses, setAddresses] = useState([]);
    const [couriers, setCouriers] = useState([]);
    const [shippingServices, setShippingServices] = useState([]);

    const [selectedAddress, setSelectedAddress] = useState("");
    const [selectedCourier, setSelectedCourier] = useState("");
    const [selectedShippingService, setSelectedShippingService] = useState("");

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cartData, addressData, courierData] = await Promise.all([
                    getCarts(),
                    getAddresses(),
                    getCouriers(),
                ]);

                setCartItems(cartData);
                setAddresses(addressData);
                setCouriers(courierData);

                setSelectedItems(cartData.map((item) => String(item.id)));
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchShippingServices = async () => {
            if (!selectedCourier) return;

            try {
                const data = await getShippingServices(selectedCourier);

                setShippingServices(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchShippingServices();
    }, [selectedCourier]);

    const handleSelectItem = (id) => {
        const itemId = String(id);

        setSelectedItems((prev) => {
            if (prev.includes(itemId)) {
                return prev.filter((selectedId) => selectedId !== itemId);
            }

            return [...prev, itemId];
        });
    };

    const selectedCartItems = cartItems.filter((item) =>
        selectedItems.includes(String(item.id)),
    );

    const totalPrice = selectedCartItems.reduce(
        (total, item) => total + item.book.price * item.quantity,
        0,
    );

    const selectedService = shippingServices.find(
        (service) => String(service.id) === String(selectedShippingService),
    );

    const shippingCost = selectedService?.price || 0;

    const grandTotal = totalPrice + shippingCost;

    const handleCheckout = async () => {
        try {
            if (selectedCartItems.length === 0) {
                alert("Pilih minimal 1 buku");
                return;
            }

            if (!selectedAddress) {
                alert("Pilih alamat");
                return;
            }

            if (!selectedCourier) {
                alert("Pilih kurir");
                return;
            }

            if (!selectedShippingService) {
                alert("Pilih layanan pengiriman");
                return;
            }

            setLoadingCheckout(true);

            // ADDRESS TERPILIH
            const address = addresses.find(
                (item) => String(item.id) === String(selectedAddress),
            );

            // SHIPPING SERVICE TERPILIH
            const service = shippingServices.find(
                (item) => String(item.id) === String(selectedShippingService),
            );

            // COURIER TERPILIH
            const courier = couriers.find(
                (item) => String(item.id) === String(selectedCourier),
            );

            // CART ITEMS
            const items = selectedCartItems.map((item) => ({
                cart_id: item.id,
                book_id: item.book.id,
                quantity: item.quantity,
            }));

            // PAYLOAD
            const payload = {
                items,

                address_id: selectedAddress,
                shipping_service_id: selectedShippingService,

                shipping_cost: service.price,
                shipping_courier: courier.name,
                shipping_service: service.service_name,
                shipping_etd: service.estimation,

                receiver_name: address.receiver_name,
                phone: address.phone,
                province: address.province,
                city: address.city,
                district: address.district,
                postal_code: address.postal_code,
                full_address: address.full_address,
            };

            console.log(payload);

            // REQUEST CHECKOUT CART
            const response = await checkoutCart(payload);

            console.log(response);

            const snapToken = response.snap_token;

            window.snap.pay(snapToken, {
                onSuccess: async function (result) {
                    try {
                        console.log(result);

                        // UPDATE SEMUA TRANSACTION MENJADI PAID
                        if (response.transactions) {
                            await Promise.all(
                                response.transactions.map((transaction) =>
                                    updateTransaction(transaction.id, {
                                        transaction_status: "paid",
                                        payment_status: "paid",
                                        shipping_status: "processed",
                                    }),
                                ),
                            );
                        }

                        // HAPUS CART YANG DICHECKOUT
                        await Promise.all(
                            selectedCartItems.map((item) =>
                                deleteCart(item.id),
                            ),
                        );

                        // UPDATE STATE CART
                        setCartItems((prev) =>
                            prev.filter(
                                (item) =>
                                    !selectedItems.includes(String(item.id)),
                            ),
                        );

                        // RESET SELECTED
                        setSelectedItems([]);

                        // UPDATE BADGE CART
                        window.dispatchEvent(new Event("cartUpdated"));

                        alert("Pembayaran berhasil");

                        navigate("/transactions");
                    } catch (error) {
                        console.log(error);

                        alert("Gagal update transaction");
                    }
                },

                onPending: function (result) {
                    alert("Menunggu pembayaran");

                    console.log(result);

                    navigate("/transactions");
                },

                onError: function (result) {
                    alert("Pembayaran gagal");

                    console.log(result);
                },

                onClose: function () {
                    alert("Popup pembayaran ditutup");
                },
            });
        } catch (error) {
            console.log(error);

            alert(
                error?.response?.data?.message ||
                    "Terjadi kesalahan saat checkout",
            );
        } finally {
            setLoadingCheckout(false);
        }
    };

    const updateQuantity = async (item, type) => {
        let qty = item.quantity;

        if (type === "increase") {
            qty++;
        } else if (type === "decrease" && qty > 1) {
            qty--;
        }

        try {
            await updateCart(item.id, {
                quantity: qty,
            });

            setCartItems((prev) =>
                prev.map((cartItem) =>
                    cartItem.id === item.id
                        ? {
                              ...cartItem,
                              quantity: qty,
                          }
                        : cartItem,
                ),
            );
        } catch (error) {
            console.log(error);
        }
    };

    const removeItem = async (id) => {
        try {
            await deleteCart(id);

            setCartItems((prev) => prev.filter((item) => item.id !== id));

            setSelectedItems((prev) =>
                prev.filter((itemId) => itemId !== String(id)),
            );

            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <section className="min-h-screen py-12 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
                <div className="max-w-screen-xl px-6 mx-auto">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 lg:text-5xl">
                            Shopping
                            <span className="text-orange-500"> Cart</span>
                        </h1>

                        <p className="mt-4 text-gray-600">
                            Kelola buku yang ingin kamu beli.
                        </p>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="p-12 text-center bg-white border border-orange-100 shadow-xl rounded-3xl">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Keranjang Kosong
                            </h2>

                            <Link
                                to="/books"
                                className="inline-flex items-center gap-3 px-6 py-4 mt-8 font-semibold text-white transition bg-orange-500 rounded-2xl hover:bg-orange-600"
                            >
                                Jelajahi Buku
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-8 lg:grid-cols-3">
                            <div className="space-y-6 lg:col-span-2">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 p-6 bg-white border border-orange-100 shadow-lg rounded-3xl"
                                    >
                                        {/* CHECKBOX */}
                                        <div className="pt-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(
                                                    String(item.id),
                                                )}
                                                onChange={() =>
                                                    handleSelectItem(item.id)
                                                }
                                                className="
                        w-5 h-5
                        rounded
                        border-2 border-orange-400
                        accent-orange-500
                        cursor-pointer
                        focus:ring-2 focus:ring-orange-300
                    "
                                            />
                                        </div>

                                        {/* IMAGE */}
                                        <div className="overflow-hidden rounded-2xl w-40 h-40">
                                            <img
                                                src={`${bookImageStorage}/${item.book.cover_photo}`}
                                                alt={item.book.title}
                                                className="object-cover w-full h-full"
                                                onError={(e) => {
                                                    e.target.src =
                                                        "https://via.placeholder.com/300x400";
                                                }}
                                            />
                                        </div>

                                        {/* CONTENT */}
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                {item.book.title}
                                            </h2>

                                            <p className="mt-3 text-2xl font-extrabold text-orange-500">
                                                {formatRupiah(item.book.price)}
                                            </p>

                                            {/* QUANTITY */}
                                            <div className="flex items-center gap-4 mt-6">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item,
                                                            "decrease",
                                                        )
                                                    }
                                                    className="flex items-center justify-center w-10 h-10 text-orange-500 border border-orange-200 rounded-xl"
                                                >
                                                    <iconify-icon
                                                        icon="mdi:minus"
                                                        width="20"
                                                    ></iconify-icon>
                                                </button>

                                                <span className="text-lg font-bold text-gray-800">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item,
                                                            "increase",
                                                        )
                                                    }
                                                    className="flex items-center justify-center w-10 h-10 text-orange-500 border border-orange-200 rounded-xl"
                                                >
                                                    <iconify-icon
                                                        icon="mdi:plus"
                                                        width="20"
                                                    ></iconify-icon>
                                                </button>
                                            </div>

                                            {/* REMOVE */}
                                            <div className="mt-6">
                                                <button
                                                    onClick={() =>
                                                        removeItem(item.id)
                                                    }
                                                    className="inline-flex items-center gap-2 text-sm font-semibold text-red-500"
                                                >
                                                    <iconify-icon
                                                        icon="mdi:trash-can"
                                                        width="18"
                                                    ></iconify-icon>
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <div className="sticky p-8 bg-white border border-orange-100 shadow-xl top-28 rounded-3xl">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Checkout
                                    </h2>

                                    <div className="mt-6">
                                        <label className="block mb-2 font-semibold">
                                            Pilih Alamat
                                        </label>

                                        <select
                                            value={selectedAddress}
                                            onChange={(e) =>
                                                setSelectedAddress(
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full p-3 border rounded-xl"
                                        >
                                            <option value="">
                                                Pilih alamat
                                            </option>

                                            {addresses.map((address) => (
                                                <option
                                                    key={address.id}
                                                    value={address.id}
                                                >
                                                    {address.receiver_name} -{" "}
                                                    {address.city}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mt-6">
                                        <label className="block mb-2 font-semibold">
                                            Pilih Kurir
                                        </label>

                                        <select
                                            value={selectedCourier}
                                            onChange={(e) =>
                                                setSelectedCourier(
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full p-3 border rounded-xl"
                                        >
                                            <option value="">
                                                Pilih kurir
                                            </option>

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

                                    <div className="mt-6">
                                        <label className="block mb-2 font-semibold">
                                            Layanan Pengiriman
                                        </label>

                                        <select
                                            value={selectedShippingService}
                                            onChange={(e) =>
                                                setSelectedShippingService(
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full p-3 border rounded-xl"
                                        >
                                            <option value="">
                                                Pilih layanan
                                            </option>

                                            {shippingServices.map((service) => (
                                                <option
                                                    key={service.id}
                                                    value={service.id}
                                                >
                                                    {service.service_name} -{" "}
                                                    {formatRupiah(
                                                        service.price,
                                                    )}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mt-8 space-y-4">
                                        <div className="flex justify-between">
                                            <span>Total Buku</span>

                                            <span>
                                                {formatRupiah(totalPrice)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Ongkir</span>

                                            <span>
                                                {formatRupiah(shippingCost)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between pt-4 border-t">
                                            <span className="font-bold">
                                                Grand Total
                                            </span>

                                            <span className="text-2xl font-extrabold text-orange-500">
                                                {formatRupiah(grandTotal)}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        disabled={loadingCheckout}
                                        className="w-full px-6 py-4 mt-8 font-semibold text-white bg-orange-500 rounded-2xl hover:bg-orange-600 disabled:bg-gray-400"
                                    >
                                        {loadingCheckout
                                            ? "Memproses..."
                                            : "Checkout Sekarang"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
