import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface User {
    id: string;
    name: string;
    email: string;
    picture: string;
}

// Definisi interface untuk state autentikasi
interface AuthState {
    user: User | null;  // Data pengguna, bisa null jika belum login
    token: string | null; // Token autentikasi, bisa null jika belum login
}

// Inisialisasi state awal dari cookies jika tersedia, agar sesi tetap aktif setelah refresh
const initialState: AuthState = {
    user: Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null, // Ambil data user dari cookies jika ada
    token: Cookies.get("token") || null, // Ambil token dari cookies jika ada, jika tidak, set null
};


// Membuat slice Redux untuk autentikasi
const authSlice = createSlice({
    name: "auth", // Nama slice yang digunakan dalam Redux
    initialState, // State awal yang sudah didefinisikan di atas
    reducers: {
        // Reducer untuk proses login
        login: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user; // Menyimpan data pengguna ke dalam state Redux
            state.token = action.payload.token; // Menyimpan token autentikasi ke dalam state Redux
            
            // Menyimpan token dan data user ke cookies agar sesi tetap tersimpan selama 7 hari
            Cookies.set("token", action.payload.token, { expires: 7 });
            Cookies.set("user", JSON.stringify(action.payload.user), { expires: 7 });
        },
        
        // Reducer untuk proses logout
        logout: (state) => {
            state.user = null; // Menghapus data user dari state Redux
            state.token = null; // Menghapus token dari state Redux
            
            // Menghapus token dan user dari cookies
            Cookies.remove("token");
            Cookies.remove("user");
        },
    },
});

// Mengekspor action login dan logout agar bisa digunakan di komponen lain
export const { login, logout } = authSlice.actions;

// Mengekspor reducer untuk digunakan dalam konfigurasi store Redux
export default authSlice.reducer;