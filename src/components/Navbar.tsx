import { logout } from "@/redux/slices/authSlice"; // Import action logout dari authSlice Redux
import { RootState } from "@/redux/store"; // Import RootState untuk mendapatkan tipe state Redux
import { useState } from "react"; // Import useState untuk mengelola state lokal
import { FaChevronDown, FaChevronUp, FaSignOutAlt } from "react-icons/fa"; // Import ikon dari react-icons
import { useDispatch, useSelector } from "react-redux"; // Import hooks Redux untuk mengakses state dan dispatch action
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi halaman

// Komponen Navbar
const Navbar = () => {
    // Mengambil data pengguna dari Redux state
    const user = useSelector((state: RootState) => state.auth.user);
    
    // State untuk mengontrol apakah dropdown menu aktif atau tidak
    const [isActive, setIsActive] = useState<boolean>(false);
    
    // Hook untuk mengirimkan action Redux
    const dispatch = useDispatch();
    
    // Hook untuk navigasi antar halaman
    const navigate = useNavigate();

    // Fungsi untuk menangani logout
    const handleLogout = () => {
        dispatch(logout()); // Dispatch action logout ke Redux
        navigate('/sign-in'); // Arahkan pengguna ke halaman login setelah logout
    };

    return (
        <>
            {/* Navbar utama */}
            <div className="w-full h-14 bg-white shadow-md flex items-center justify-center">
                <div className="content flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-blue-500">Test.</h1>
                    
                    {/* Profile Picture dan Toggle Dropdown */}
                    <div 
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => setIsActive(!isActive)} // Toggle dropdown saat diklik
                    >
                        {user && 
                            <img src={user.picture} alt="Profile" className="w-8 h-8 rounded-full" />
                        }
                        {isActive ? (
                            <FaChevronUp className="text-xs" />
                        ) : (
                            <FaChevronDown className="text-xs" />
                        )}
                    </div>
                </div>
            </div>

            {/* Dropdown menu profil */}
            {isActive && 
                <div 
                    onClick={() => setIsActive(false)} // Tutup dropdown jika latar belakang diklik
                    className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center z-20 cursor-pointer"
                >
                    <div className="content relative w-full h-full">
                        <div className="h-max w-[270px] bg-white shadow-md absolute right-0 top-14 rounded z-50 py-1 flex flex-col gap-1">
                            
                            {/* Informasi Pengguna */}
                            <div className="h-12 w-full flex items-center gap-3 px-4">
                                {user && 
                                    <img src={user.picture} alt="Profile" className="w-8 h-8 rounded-full" />
                                }
                                <div className="flex flex-col text-xs">
                                    <p className="font-light text-gray-600">{user?.name}</p>
                                    <p className="font-medium first-letter:uppercase">{user?.email}</p>
                                </div>
                            </div>
                            
                            <hr />

                            {/* Tombol Logout */}
                            <div 
                                onClick={handleLogout}
                                className="w-full h-10 hover:bg-gray-300 cursor-pointer flex items-center gap-3 px-4 text-[#8D9498] hover:text-white"
                            >
                                <FaSignOutAlt />
                                <p className="text-sm">Logout</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Navbar;
