import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/public";
import PublicLayout from "./layouts/public";
import Books from "./pages/public/books";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./layouts/admin";
import Dashboard from "./pages/admin";
import AdminBooks from "./pages/admin/books";
import BookCreate from "./pages/admin/books/create";
import AdminGenres from "./pages/admin/genres";
import GenreCreate from "./pages/admin/genres/create";
import AdminAuthors from "./pages/admin/authors";
import AuthorCreate from "./pages/admin/authors/create";
import BookEdit from "./pages/admin/books/edit";
import ShowBook from "./pages/public/books/show";
import GenreEdit from "./pages/admin/genres/edit";
import AuthorEdit from "./pages/admin/authors/edit";
import ProtectedRoute from "./routes/ProtectedRoute";
import Unauthorized from "./pages/unauthorized";
import TransactionHistory from "./pages/public/books/transactions";
import AdminTransactions from "./pages/admin/transactions";
import AboutUs from "./pages/public/about";
import ContactAdmin from "./pages/public/contact";
import Cart from "./pages/public/cart";
import TransactionDetail from "./pages/admin/transactions/detail";
import UserDetail from "./pages/admin/users/detail";
import AdminUsers from "./pages/admin/users";
import AdminChats from "./pages/admin/chat";
import Checkout from "./pages/public/checkout";
import Address from "./pages/public/address";
import TransactionDetailCustomer from "./pages/public/books/detail_transaction";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Public */}
                    <Route element={<PublicLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/contact" element={<ContactAdmin />} />
                    </Route>

                    {/* CUSTOMER */}
                    <Route
                        element={
                            <ProtectedRoute role="customer">
                                <PublicLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="books">
                            <Route index element={<Books />} />
                            <Route path="show/:id" element={<ShowBook />} />
                        </Route>

                        <Route path="transactions">
                            <Route index element={<TransactionHistory />} />

                            <Route
                                path="detail/:id"
                                element={<TransactionDetailCustomer />}
                            />
                        </Route>

                        <Route path="cart" element={<Cart />} />

                        <Route path="checkout/:id" element={<Checkout />} />

                        <Route path="address" element={<Address />} />
                    </Route>

                    {/* Auth */}
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    {/* Admin */}
                    <Route
                        path="admin"
                        element={
                            <ProtectedRoute role="admin">
                                <AdminLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Dashboard />} />

                        <Route path="books">
                            <Route index element={<AdminBooks />} />
                            <Route path="create" element={<BookCreate />} />
                            <Route path="edit/:id" element={<BookEdit />} />
                        </Route>

                        <Route path="genres">
                            <Route index element={<AdminGenres />} />
                            <Route path="create" element={<GenreCreate />} />
                            <Route path="edit/:id" element={<GenreEdit />} />
                        </Route>

                        <Route path="authors">
                            <Route index element={<AdminAuthors />} />
                            <Route path="create" element={<AuthorCreate />} />
                            <Route path="edit/:id" element={<AuthorEdit />} />
                        </Route>

                        <Route path="transactions">
                            <Route index element={<AdminTransactions />} />
                            <Route
                                path="detail/:id"
                                element={<TransactionDetail />}
                            />
                        </Route>

                        <Route path="users">
                            <Route index element={<AdminUsers />} />
                            <Route path="detail/:id" element={<UserDetail />} />
                        </Route>

                        <Route path="help" element={<AdminChats />} />
                    </Route>

                    {/* Unauthorized */}
                    <Route path="unauthorized" element={<Unauthorized />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
