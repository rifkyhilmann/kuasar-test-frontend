import ProtectedRoute from "@/config/protectedRoute"
import Pages from "@/pages"
import Login from "@/pages/auth/login"
import Chat from "@/pages/feature/chat"
import CountryDetail from "@/pages/feature/countryDetail"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const Router = () => {
    return (
       <BrowserRouter>
            <Routes>
                {/* Route untuk halaman utama */}
                <Route path="/" 
                element={
                    <ProtectedRoute>
                        <Pages />
                    </ProtectedRoute>
                } 
                />
                {/* Route untuk halaman detail negara */}
                <Route path="/country/:code" 
                element={
                    <ProtectedRoute>
                        <CountryDetail />
                    </ProtectedRoute>
                } 
                />
                {/* Route halaman chat AI */}
                <Route path="/chat" 
                element={
                    <ProtectedRoute>
                        <Chat />
                    </ProtectedRoute>
                } 
                />
                {/* Route halaman login */}
                <Route path="/sign-in" element={<Login />} />
            </Routes>
       </BrowserRouter>
    )
}

export default Router