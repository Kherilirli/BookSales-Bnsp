export default function AboutUs() {
    return (
        <section className="min-h-screen py-12 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
            <div className="max-w-screen-xl px-6 mx-auto">
                {/* HEADER */}
                <div className="mb-14 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 lg:text-5xl">
                        About
                        <span className="text-orange-500"> BookSales</span>
                    </h1>

                    <p className="max-w-3xl mx-auto mt-5 text-lg leading-relaxed text-gray-600">
                        BookSales adalah platform penjualan buku online yang
                        menyediakan berbagai kategori buku mulai dari fiksi,
                        non-fiksi, romantis, sejarah, hingga horor dengan
                        pengalaman belanja yang modern dan nyaman.
                    </p>
                </div>

                {/* CONTENT */}
                <div className="grid items-center gap-10 lg:grid-cols-2">
                    {/* IMAGE */}
                    <div className="p-5 bg-white border border-orange-100 shadow-xl rounded-3xl">
                        <img
                            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop"
                            alt="Book Store"
                            className="object-cover w-full rounded-2xl h-[450px]"
                        />
                    </div>

                    {/* TEXT */}
                    <div>
                        <span className="inline-block px-4 py-1 text-sm font-semibold text-orange-500 bg-orange-100 rounded-full">
                            Tentang Kami
                        </span>

                        <h2 className="mt-5 text-3xl font-extrabold leading-tight text-gray-900">
                            Tempat terbaik untuk menemukan buku favoritmu.
                        </h2>

                        <p className="mt-6 leading-relaxed text-gray-600">
                            Kami percaya bahwa buku adalah jendela dunia.
                            Karena itu BookSales hadir untuk membantu pembaca
                            menemukan buku berkualitas dengan harga terbaik dan
                            pengalaman belanja yang mudah.
                        </p>

                        <div className="grid gap-5 mt-8 sm:grid-cols-2">
                            {/* CARD 1 */}
                            <div className="p-5 transition bg-white border border-orange-100 shadow-md rounded-2xl hover:-translate-y-1 hover:shadow-xl">
                                <iconify-icon
                                    icon="mdi:book-open-page-variant"
                                    width="40"
                                    className="text-orange-500"
                                ></iconify-icon>

                                <h3 className="mt-4 text-lg font-bold text-gray-900">
                                    Banyak Koleksi
                                </h3>

                                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                    Ribuan koleksi buku tersedia dari berbagai
                                    genre populer.
                                </p>
                            </div>

                            {/* CARD 2 */}
                            <div className="p-5 transition bg-white border border-orange-100 shadow-md rounded-2xl hover:-translate-y-1 hover:shadow-xl">
                                <iconify-icon
                                    icon="mdi:truck-fast"
                                    width="40"
                                    className="text-orange-500"
                                ></iconify-icon>

                                <h3 className="mt-4 text-lg font-bold text-gray-900">
                                    Pengiriman Cepat
                                </h3>

                                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                    Pesanan diproses dengan cepat dan aman ke
                                    seluruh Indonesia.
                                </p>
                            </div>

                            {/* CARD 3 */}
                            <div className="p-5 transition bg-white border border-orange-100 shadow-md rounded-2xl hover:-translate-y-1 hover:shadow-xl">
                                <iconify-icon
                                    icon="mdi:shield-check"
                                    width="40"
                                    className="text-orange-500"
                                ></iconify-icon>

                                <h3 className="mt-4 text-lg font-bold text-gray-900">
                                    Aman & Terpercaya
                                </h3>

                                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                    Sistem transaksi aman dan terpercaya untuk
                                    semua pengguna.
                                </p>
                            </div>

                            {/* CARD 4 */}
                            <div className="p-5 transition bg-white border border-orange-100 shadow-md rounded-2xl hover:-translate-y-1 hover:shadow-xl">
                                <iconify-icon
                                    icon="mdi:star-circle"
                                    width="40"
                                    className="text-orange-500"
                                ></iconify-icon>

                                <h3 className="mt-4 text-lg font-bold text-gray-900">
                                    Kualitas Terbaik
                                </h3>

                                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                    Semua buku dipilih dengan kualitas terbaik
                                    untuk pembaca.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}