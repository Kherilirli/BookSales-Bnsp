export default function WhyChooseUs() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-screen-xl px-6 mx-auto">

                {/* TITLE */}
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900">
                        Kenapa Harus
                        <span className="text-orange-500">
                            {" "}BookSales?
                        </span>
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Kami menyediakan pengalaman membeli buku online
                        yang cepat, aman, dan nyaman untuk semua pembaca.
                    </p>
                </div>

                {/* CARD */}
                <div className="grid gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">

                    {/* CARD 1 */}
                    <div className="p-8 transition-all duration-300 bg-orange-50 rounded-2xl hover:-translate-y-2 hover:shadow-xl">

                        <div className="flex items-center justify-center w-16 h-16 bg-white shadow-md rounded-2xl">
                            <iconify-icon
                                icon="solar:book-bold"
                                width="32"
                                class="text-orange-500"
                            ></iconify-icon>
                        </div>

                        <h3 className="mt-6 text-xl font-bold text-gray-800">
                            Koleksi Lengkap
                        </h3>

                        <p className="mt-3 leading-relaxed text-gray-600">
                            Ribuan buku tersedia mulai dari novel,
                            teknologi, bisnis, hingga edukasi.
                        </p>
                    </div>

                    {/* CARD 2 */}
                    <div className="p-8 transition-all duration-300 bg-orange-50 rounded-2xl hover:-translate-y-2 hover:shadow-xl">

                        <div className="flex items-center justify-center w-16 h-16 bg-white shadow-md rounded-2xl">
                            <iconify-icon
                                icon="solar:wallet-money-bold"
                                width="32"
                                class="text-orange-500"
                            ></iconify-icon>
                        </div>

                        <h3 className="mt-6 text-xl font-bold text-gray-800">
                            Harga Terjangkau
                        </h3>

                        <p className="mt-3 leading-relaxed text-gray-600">
                            Dapatkan buku favorit dengan harga terbaik
                            dan promo menarik setiap minggu.
                        </p>
                    </div>

                    {/* CARD 3 */}
                    <div className="p-8 transition-all duration-300 bg-orange-50 rounded-2xl hover:-translate-y-2 hover:shadow-xl">

                        <div className="flex items-center justify-center w-16 h-16 bg-white shadow-md rounded-2xl">
                            <iconify-icon
                                icon="solar:delivery-bold"
                                width="32"
                                class="text-orange-500"
                            ></iconify-icon>
                        </div>

                        <h3 className="mt-6 text-xl font-bold text-gray-800">
                            Pengiriman Cepat
                        </h3>

                        <p className="mt-3 leading-relaxed text-gray-600">
                            Proses pemesanan cepat dengan pengiriman
                            aman ke seluruh Indonesia.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}