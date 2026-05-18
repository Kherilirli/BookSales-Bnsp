import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("userInfo"));

    // Belum login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Ada role tapi tidak sesuai
    if (role && user?.role !== role) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
}