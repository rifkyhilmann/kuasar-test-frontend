import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // pastikan path ini benar
import { Navigate } from "react-router-dom"; // import Navigate dari react-router-dom

// Definisi interface untuk props yang diterima oleh ProtectedRoute
interface ProtectedRouteProps {
    children: JSX.Element; // Komponen yang akan dirender jika pengguna memiliki akses
}

// Komponen ProtectedRoute untuk membatasi akses ke halaman tertentu
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    // Mengambil token dari Redux state untuk mengecek apakah pengguna sudah login
    const token = useSelector((state: RootState) => state.auth.token);
    // Mengambil data user dari Redux state untuk memastikan pengguna valid
    const user = useSelector((state: RootState) => state.auth.user);

    // Jika tidak ada token atau user, arahkan pengguna ke halaman login
    if (!token || !user) {
        return <Navigate to="/sign-in" />;
    }

    // Jika pengguna sudah login, render halaman yang dilindungi
    return children;
};

// Mengekspor komponen ProtectedRoute agar bisa digunakan di bagian lain dari aplikasi
export default ProtectedRoute;
