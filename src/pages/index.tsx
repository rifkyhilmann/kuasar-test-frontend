import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar"; // Import komponen Navbar
import { GET_COUNTRIES } from "@/graphql/countries"; // Import query graphql countries
import { useQuery } from "@apollo/client"; // Import GraphQL query dan hook useQuery dari Apollo Client
import { FaRobot } from "react-icons/fa"; // Import ikon dari react-icons
import { Link } from "react-router-dom"; // Import Link untuk navigasi antar halaman


// Komponen utama yang menampilkan daftar negara
const Pages = () => {
    // Menggunakan GraphQL query dengan useQuery
    const { loading, error, data } = useQuery(GET_COUNTRIES);

    // Jika data masih dimuat, tampilkan spinner loading
    if (loading) return (
        <LoadingSpinner />
    );

    // Jika terjadi error saat fetch data, tampilkan pesan error
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="w-full min-h-screen h-max bg-gray-50 relative">
            <Navbar /> {/* Menampilkan Navbar */}

            {/* Container utama yang menampilkan daftar negara */}
            <div className="w-full h-max flex items-center justify-center py-10">
                <div className="content flex flex-col gap-4 h-max">
                    <h1 className="text-lg font-medium">Countries</h1>

                    {/* Grid daftar negara */}
                    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                        {data.countries.map((items: any, i: number) => (
                            // Navigasi ke halaman detail negara berdasarkan kode negara
                            <Link 
                                to={`/country/${items.code}`} 
                                key={i} 
                                className="bg-white h-max min-h-28 shadow flex items-center px-4 gap-3 cursor-pointer"
                            >
                                {/* Emoji bendera negara */}
                                <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                                    <span>{items.emoji}</span>
                                </div>

                                {/* Informasi negara */}
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-medium">{items.name}</h1>
                                    <h4 className="text-xs">{items.capital} - {items.currency}</h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tombol chat yang mengarahkan ke halaman chat */}
            <Link to={'/chat'}>
                <div className="fixed bottom-5 right-5 h-12 w-12 bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-full flex items-center justify-center text-white text-lg">
                    <FaRobot />
                </div>
            </Link>
        </div>
    );
};

export default Pages;
