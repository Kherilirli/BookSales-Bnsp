-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 17 Bulan Mei 2026 pada 13.14
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_booksales`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `addresses`
--

CREATE TABLE `addresses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `receiver_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `postal_code` varchar(255) NOT NULL,
  `full_address` text NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `addresses`
--

INSERT INTO `addresses` (`id`, `user_id`, `receiver_name`, `phone`, `province`, `city`, `district`, `postal_code`, `full_address`, `is_default`, `created_at`, `updated_at`) VALUES
(1, 3, 'Kheril', '083807214402', 'Jawa Barat', 'Bogor', 'Gunung Sindur', '16340', 'Kp Bulak Saga rt 003 rw 006', 0, '2026-05-15 22:07:40', '2026-05-15 22:07:40'),
(2, 4, 'Bujang', '0895827922', 'Jawa Tengah', 'Solo', 'Banjarsari', '91028', 'Kp Banjarsari', 0, '2026-05-15 22:31:57', '2026-05-15 22:31:57');

-- --------------------------------------------------------

--
-- Struktur dari tabel `authors`
--

CREATE TABLE `authors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `bio` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `authors`
--

INSERT INTO `authors` (`id`, `name`, `photo`, `bio`, `created_at`, `updated_at`) VALUES
(1, 'Tere Liye', 'tere.jpg', 'Penulis novel populer Indonesia dengan gaya narasi yang kuat.', '2026-05-15 22:05:18', '2026-05-15 22:05:18'),
(2, 'Andrea Hirata', 'andrea.jpg', 'Penulis Laskar Pelangi yang inspiratif.', '2026-05-15 22:05:18', '2026-05-15 22:05:18'),
(3, 'Risa Saraswati', 'risa.jpg', 'Penulis cerita horor dan pengalaman supranatural.', '2026-05-15 22:05:18', '2026-05-15 22:05:18'),
(4, 'Sejarawan Nusantara', 'sejarawan.jpg', 'Penulis buku sejarah Indonesia.', '2026-05-15 22:05:18', '2026-05-15 22:05:18'),
(5, 'Joko Anwar', 'joko.jpg', 'Penulis dan sutradara cerita horor Indonesia.', '2026-05-15 22:05:18', '2026-05-15 22:05:18'),
(6, 'Kheril Irli', 'W4TNM1zgUm9OzBhqluqVGochTrrSWvGANGKvuBqi.jpg', 'Penulis dengan banyak buku genre romantis', '2026-05-16 06:05:45', '2026-05-16 06:05:45');

-- --------------------------------------------------------

--
-- Struktur dari tabel `books`
--

CREATE TABLE `books` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `cover_photo` varchar(255) NOT NULL,
  `genre_id` bigint(20) UNSIGNED NOT NULL,
  `author_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `books`
--

INSERT INTO `books` (`id`, `title`, `description`, `price`, `stock`, `cover_photo`, `genre_id`, `author_id`, `created_at`, `updated_at`) VALUES
(1, 'Spiderman', 'Petualangan seorang pemuda yang memiliki kekuatan super karena tergigit seekor laba-laba.', 40000, 20, 'spiderman.jpg', 1, 3, '2026-05-15 22:05:18', '2026-05-15 22:39:50'),
(2, 'Laskar Pelangi', 'Kisah inspiratif tentang sekelompok anak di Belitung yang berjuang untuk mendapatkan pendidikan.', 50000, 5, 'laskar_pelangi.jpg', 2, 2, '2026-05-15 22:05:18', '2026-05-15 22:34:52'),
(3, 'Siksa Kubur', 'Kisah mengerikan tentang seorang pemuda yang terjerat dalam kubur.', 60000, 17, 'siksa_kubur.jpg', 2, 3, '2026-05-15 22:05:18', '2026-05-16 06:02:09'),
(4, 'Jejak Kerajaan Nusantara', 'Sejarah kerajaan besar di Indonesia.', 65000, 3, 'kerajaan.jpg', 4, 4, '2026-05-15 22:05:18', '2026-05-15 22:34:52'),
(5, 'Rumah Tua di Ujung Jalan', 'Teror dari rumah yang sudah lama ditinggalkan.', 48000, 6, 'rumah.jpg', 5, 5, '2026-05-15 22:05:18', '2026-05-16 06:02:09'),
(6, 'Dilan 1990', 'Novel romantis remaja populer berlatar Bandung tahun 1990.', 68000, 40, 'oJPzaKu7GRO6AesVBgqyPcLTaRNzt7YjZXaB9sfG.jpg', 3, 6, '2026-05-16 06:07:42', '2026-05-16 06:07:42');

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-aROTNkbVzFvIsh4V', 's:7:\"forever\";', 2094268311),
('laravel-cache-Dl3cBTvEB9jj7D8z', 's:7:\"forever\";', 2094269844),
('laravel-cache-fJqZrapKu3kocQKt', 's:7:\"forever\";', 2094269281),
('laravel-cache-foqlhLZrMSsucFD0', 's:7:\"forever\";', 2094270344),
('laravel-cache-gmKy7Cj9LE0fZfgH', 's:7:\"forever\";', 2094267961),
('laravel-cache-jRWIGeOceaRV9cG8', 's:7:\"forever\";', 2094270357),
('laravel-cache-lHG0eE91gxHIDOCg', 's:7:\"forever\";', 2094268310),
('laravel-cache-mpMtgI5yqifm3rSG', 's:7:\"forever\";', 2094267967),
('laravel-cache-s2lrSfN4W7zNseC8', 's:7:\"forever\";', 2094296633),
('laravel-cache-VgZCNaUxdCYmw8YJ', 's:7:\"forever\";', 2094296965);

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `conversations`
--

CREATE TABLE `conversations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `conversations`
--

INSERT INTO `conversations` (`id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 3, '2026-05-15 22:11:34', '2026-05-15 22:11:34'),
(2, 4, '2026-05-15 22:35:31', '2026-05-15 22:35:31');

-- --------------------------------------------------------

--
-- Struktur dari tabel `couriers`
--

CREATE TABLE `couriers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `couriers`
--

INSERT INTO `couriers` (`id`, `code`, `name`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'jne', 'JNE', 1, '2026-05-16 05:05:39', '2026-05-16 05:05:39'),
(2, 'jnt', 'J&T Express', 1, '2026-05-16 05:05:39', '2026-05-16 05:05:39'),
(3, 'sicepat', 'SiCepat', 1, '2026-05-16 05:05:39', '2026-05-16 05:05:39'),
(4, 'anteraja', 'AnterAja', 1, '2026-05-16 05:05:39', '2026-05-16 05:05:39');

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `genres`
--

CREATE TABLE `genres` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `genres`
--

INSERT INTO `genres` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Fiksi', 'Buku cerita Fiksi', '2026-05-15 22:05:18', '2026-05-15 22:05:18'),
(2, 'Non-Fiksi', 'Buku cerita Non-Fiksi', '2026-05-15 22:05:18', '2026-05-15 22:05:18'),
(3, 'Romantis', 'Buku cerita Romantis', '2026-05-15 22:05:18', '2026-05-15 22:05:18'),
(4, 'Sejarah', 'Buku cerita Sejarah', '2026-05-15 22:05:18', '2026-05-15 22:05:18'),
(5, 'Horror', 'Buku cerita Horror', '2026-05-15 22:05:18', '2026-05-15 22:05:18'),
(6, 'Action', 'Buku cerita tentang tema action', '2026-05-15 22:45:21', '2026-05-15 22:45:21');

-- --------------------------------------------------------

--
-- Struktur dari tabel `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `conversation_id` bigint(20) UNSIGNED NOT NULL,
  `sender_id` bigint(20) UNSIGNED NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `messages`
--

INSERT INTO `messages` (`id`, `conversation_id`, `sender_id`, `message`, `created_at`, `updated_at`) VALUES
(1, 1, 3, 'hii admin', '2026-05-15 22:11:40', '2026-05-15 22:11:40'),
(2, 1, 1, 'haloo juga', '2026-05-15 22:22:14', '2026-05-15 22:22:14'),
(3, 2, 4, 'hii admin', '2026-05-15 22:35:36', '2026-05-15 22:35:36'),
(4, 1, 3, 'saya mau co buku spiderman 5 apakah stock nya akan ditambah?', '2026-05-15 22:38:21', '2026-05-15 22:38:21'),
(5, 1, 1, 'ada ka ini coba saya update dulu yaa', '2026-05-15 22:38:54', '2026-05-15 22:38:54'),
(6, 1, 3, 'baik ka', '2026-05-15 22:39:05', '2026-05-15 22:39:05'),
(7, 1, 1, 'sudah yaa ka silah kan di refresh, dan di co', '2026-05-15 22:40:19', '2026-05-15 22:40:19'),
(8, 1, 1, 'terima kasih', '2026-05-15 22:40:27', '2026-05-15 22:40:27'),
(9, 1, 3, 'oke sudah ka', '2026-05-15 22:40:54', '2026-05-15 22:40:54'),
(10, 1, 3, 'terima kasih juga', '2026-05-15 22:41:02', '2026-05-15 22:41:02'),
(11, 2, 1, 'haloo', '2026-05-15 22:44:46', '2026-05-15 22:44:46');

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_04_21_013615_create_genres_table', 1),
(5, '2026_04_21_022620_create_authors_table', 1),
(6, '2026_04_21_022653_create_books_table', 1),
(7, '2026_04_22_032830_create_personal_access_tokens_table', 1),
(8, '2026_04_28_013557_create_transactions_table', 1),
(9, '2026_05_06_051952_add_quantity_to_transactions_table', 1),
(10, '2026_05_13_065313_create_carts_table', 1),
(11, '2026_05_13_085500_add_midtrans_fields_to_transactions_table', 1),
(12, '2026_05_14_145150_create_conversations_table', 1),
(13, '2026_05_14_145242_create_messages_table', 1),
(14, '2026_05_15_161130_create_addresses_table', 1),
(15, '2026_05_15_162018_create_couriers_table', 1),
(16, '2026_05_15_162150_create_shipping_services_table', 1),
(17, '2026_05_15_162253_add_shipping_fields_to_transactions_table', 1),
(18, '2026_05_16_042607_add_checkout_fields_to_transactions_table', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `shipping_services`
--

CREATE TABLE `shipping_services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `courier_id` bigint(20) UNSIGNED NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_code` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `estimation` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `shipping_services`
--

INSERT INTO `shipping_services` (`id`, `courier_id`, `service_name`, `service_code`, `price`, `estimation`, `created_at`, `updated_at`) VALUES
(1, 1, 'JNE REG', 'reg', 15000, '2-3 Hari', '2026-05-16 05:05:52', '2026-05-16 05:05:52'),
(2, 1, 'JNE YES', 'yes', 25000, '1 Hari', '2026-05-16 05:05:52', '2026-05-16 05:05:52'),
(3, 2, 'J&T EZ', 'ez', 14000, '2-4 Hari', '2026-05-16 05:05:52', '2026-05-16 05:05:52'),
(4, 2, 'J&T Super', 'super', 23000, '1 Hari', '2026-05-16 05:05:52', '2026-05-16 05:05:52'),
(5, 3, 'SiCepat REG', 'reg', 13000, '2-3 Hari', '2026-05-16 05:05:52', '2026-05-16 05:05:52'),
(6, 3, 'SiCepat BEST', 'best', 22000, '1 Hari', '2026-05-16 05:05:52', '2026-05-16 05:05:52');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_number` varchar(255) NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `address_id` bigint(20) UNSIGNED DEFAULT NULL,
  `shipping_service_id` bigint(20) UNSIGNED DEFAULT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `subtotal` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `transaction_status` varchar(255) NOT NULL DEFAULT 'pending',
  `payment_type` varchar(255) DEFAULT NULL,
  `payment_time` timestamp NULL DEFAULT NULL,
  `shipping_cost` int(11) NOT NULL DEFAULT 0,
  `shipping_courier` varchar(255) DEFAULT NULL,
  `shipping_service` varchar(255) DEFAULT NULL,
  `shipping_etd` varchar(255) DEFAULT NULL,
  `receiver_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `full_address` text DEFAULT NULL,
  `tracking_number` varchar(255) DEFAULT NULL,
  `shipping_status` enum('pending','processed','shipped','delivered') NOT NULL DEFAULT 'pending',
  `payment_status` enum('pending','paid','failed') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id`, `order_number`, `customer_id`, `address_id`, `shipping_service_id`, `book_id`, `quantity`, `subtotal`, `total_amount`, `created_at`, `updated_at`, `transaction_status`, `payment_type`, `payment_time`, `shipping_cost`, `shipping_courier`, `shipping_service`, `shipping_etd`, `receiver_name`, `phone`, `province`, `city`, `district`, `postal_code`, `full_address`, `tracking_number`, `shipping_status`, `payment_status`) VALUES
(1, 'ORDER-1778908083', 3, 1, 3, 1, 2, 0.00, 94000.00, '2026-05-15 22:08:03', '2026-05-15 22:08:35', 'paid', NULL, NULL, 14000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 'paid'),
(2, 'ORDER-1778908200', 3, 1, 1, 2, 1, 0.00, 65000.00, '2026-05-15 22:10:00', '2026-05-15 22:10:25', 'pending', NULL, NULL, 15000, 'JNE', 'JNE REG', '2-3 Hari', 'Kheril', '083807214402', 'Jawa Barat', 'Bogor', 'Gunung Sindur', '16340', 'Kp Bulak Saga rt 003 rw 006', NULL, 'processed', 'paid'),
(3, 'ORDER-1778908255', 3, 1, 5, 5, 1, 0.00, 61000.00, '2026-05-15 22:10:55', '2026-05-15 22:11:17', 'pending', NULL, NULL, 13000, 'SiCepat', 'SiCepat REG', '2-3 Hari', 'Kheril', '083807214402', 'Jawa Barat', 'Bogor', 'Gunung Sindur', '16340', 'Kp Bulak Saga rt 003 rw 006', NULL, 'processed', 'paid'),
(4, 'ORDER-1778908255', 3, 1, 5, 3, 1, 0.00, 73000.00, '2026-05-15 22:10:55', '2026-05-15 22:11:18', 'pending', NULL, NULL, 13000, 'SiCepat', 'SiCepat REG', '2-3 Hari', 'Kheril', '083807214402', 'Jawa Barat', 'Bogor', 'Gunung Sindur', '16340', 'Kp Bulak Saga rt 003 rw 006', NULL, 'processed', 'paid'),
(5, 'ORDER-1778909536', 4, 2, 4, 5, 3, 0.00, 167000.00, '2026-05-15 22:32:16', '2026-05-15 22:32:58', 'paid', NULL, NULL, 23000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 'paid'),
(6, 'ORDER-1778909692', 4, 2, 4, 1, 4, 0.00, 183000.00, '2026-05-15 22:34:52', '2026-05-15 22:35:15', 'pending', NULL, NULL, 23000, 'J&T Express', 'J&T Super', '1 Hari', 'Bujang', '0895827922', 'Jawa Tengah', 'Solo', 'Banjarsari', '91028', 'Kp Banjarsari', NULL, 'processed', 'paid'),
(7, 'ORDER-1778909692', 4, 2, 4, 4, 2, 0.00, 153000.00, '2026-05-15 22:34:52', '2026-05-15 22:35:16', 'pending', NULL, NULL, 23000, 'J&T Express', 'J&T Super', '1 Hari', 'Bujang', '0895827922', 'Jawa Tengah', 'Solo', 'Banjarsari', '91028', 'Kp Banjarsari', NULL, 'processed', 'paid'),
(8, 'ORDER-1778909692', 4, 2, 4, 2, 4, 0.00, 223000.00, '2026-05-15 22:34:52', '2026-05-15 22:35:16', 'pending', NULL, NULL, 23000, 'J&T Express', 'J&T Super', '1 Hari', 'Bujang', '0895827922', 'Jawa Tengah', 'Solo', 'Banjarsari', '91028', 'Kp Banjarsari', NULL, 'processed', 'paid'),
(9, 'ORDER-1778936442', 3, 1, 3, 1, 2, 0.00, 94000.00, '2026-05-16 06:00:42', '2026-05-16 06:01:25', 'paid', NULL, NULL, 14000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 'paid'),
(10, 'ORDER-1778936529', 3, 1, 5, 3, 2, 0.00, 133000.00, '2026-05-16 06:02:09', '2026-05-16 06:03:12', 'pending', NULL, NULL, 13000, 'SiCepat', 'SiCepat REG', '2-3 Hari', 'Kheril', '083807214402', 'Jawa Barat', 'Bogor', 'Gunung Sindur', '16340', 'Kp Bulak Saga rt 003 rw 006', NULL, 'processed', 'paid'),
(11, 'ORDER-1778936529', 3, 1, 5, 5, 3, 0.00, 157000.00, '2026-05-16 06:02:09', '2026-05-16 06:03:12', 'pending', NULL, NULL, 13000, 'SiCepat', 'SiCepat REG', '2-3 Hari', 'Kheril', '083807214402', 'Jawa Barat', 'Bogor', 'Gunung Sindur', '16340', 'Kp Bulak Saga rt 003 rw 006', NULL, 'processed', 'paid');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('customer','admin') NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@gmail.com', NULL, '$2y$12$aOBbOGWQtz4aWNDhnM/WDu48lJYsELSak8TI4FdFA60da/Fpwpq6i', 'admin', NULL, '2026-05-15 22:05:18', '2026-05-15 22:05:18'),
(2, 'Customer', 'customer1@gmail.com', NULL, '$2y$12$jp/.HsOnCt2od1p9pJmvFeImsuUA8VCuaT1Jbc8YefLVFBZ0LL8tu', 'customer', NULL, '2026-05-15 22:05:19', '2026-05-15 22:05:19'),
(3, 'Kheril', 'kheril@gmail.com', NULL, '$2y$12$wrDdiDpouRYiq/851BdWe.9R13zKZyZfj5y3Rm6KqcuGZEa/hxQuW', 'customer', NULL, '2026-05-15 22:06:27', '2026-05-15 22:06:27'),
(4, 'bujang', 'bujang@gmail.com', NULL, '$2y$12$.TOk7tBOahgGhYyIkVrJwOoN7S40i7G2H/bhZ3XNIftDdZ7FrimIS', 'customer', NULL, '2026-05-15 22:28:32', '2026-05-15 22:28:32');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addresses_user_id_foreign` (`user_id`);

--
-- Indeks untuk tabel `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `books_genre_id_foreign` (`genre_id`),
  ADD KEY `books_author_id_foreign` (`author_id`);

--
-- Indeks untuk tabel `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indeks untuk tabel `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indeks untuk tabel `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_user_id_foreign` (`user_id`),
  ADD KEY `carts_book_id_foreign` (`book_id`);

--
-- Indeks untuk tabel `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conversations_user_id_foreign` (`user_id`);

--
-- Indeks untuk tabel `couriers`
--
ALTER TABLE `couriers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `couriers_code_unique` (`code`);

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indeks untuk tabel `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_conversation_id_foreign` (`conversation_id`),
  ADD KEY `messages_sender_id_foreign` (`sender_id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indeks untuk tabel `shipping_services`
--
ALTER TABLE `shipping_services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shipping_services_courier_id_foreign` (`courier_id`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transactions_customer_id_foreign` (`customer_id`),
  ADD KEY `transactions_book_id_foreign` (`book_id`),
  ADD KEY `transactions_address_id_foreign` (`address_id`),
  ADD KEY `transactions_shipping_service_id_foreign` (`shipping_service_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `authors`
--
ALTER TABLE `authors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `couriers`
--
ALTER TABLE `couriers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `genres`
--
ALTER TABLE `genres`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `shipping_services`
--
ALTER TABLE `shipping_services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`),
  ADD CONSTRAINT `books_genre_id_foreign` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`);

--
-- Ketidakleluasaan untuk tabel `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `conversations`
--
ALTER TABLE `conversations`
  ADD CONSTRAINT `conversations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_conversation_id_foreign` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `shipping_services`
--
ALTER TABLE `shipping_services`
  ADD CONSTRAINT `shipping_services_courier_id_foreign` FOREIGN KEY (`courier_id`) REFERENCES `couriers` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `transactions_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transactions_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transactions_shipping_service_id_foreign` FOREIGN KEY (`shipping_service_id`) REFERENCES `shipping_services` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
