import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FaArrowLeft } from "react-icons/fa";
import { GET_COUNTRIES_BY_CODE } from "@/graphql/countries";
import LoadingSpinner from "@/components/LoadingSpinner";


const CountryDetail = () => {
    // Mengambil kode negara dari parameter URL
    const { code } = useParams<{ code: string }>();

    // Menjalankan query untuk mengambil data negara menggunakan Apollo Client
    const { loading, error, data } = useQuery(GET_COUNTRIES_BY_CODE, { variables: { code } });

    // Menangani state loading, jika data sedang dimuat
    if (loading) return (
        <LoadingSpinner />
    );

    // Menangani error jika terjadi kesalahan saat pengambilan data
    if (error) return <p>Error: {error.message}</p>;

    // Pastikan ada data yang diterima dari query
    const country = data?.countries?.[0];

    if (!country) return <p>Country not found!</p>;

    // Menampilkan data negara setelah berhasil dimuat
    return (
        <div className="min-h-screen h-max w-full flex flex-col ">
            <div className="h-16 w-full bg-white flex items-center justify-center shadow-md">
                <div className="content h-full flex items-center justify-between px-4">
                    <Link to={'/'}> 
                        <FaArrowLeft />
                    </Link>
                </div>
            </div>
            <div className="w-full h-max flex items-center justify-center py-6">
                <div className="content h-max flex flex-col ">
                    <h1 className="text-2xl font-bold">{country.name} {country.emoji}</h1>
                    <p><strong>Capital:</strong> {country.capital || 'N/A'}</p>
                    <p><strong>Currency:</strong> {country.currency || 'N/A'}</p>
                    <p><strong>Continent:</strong> {country.continent?.name || 'N/A'}</p>
                    <p><strong>Languages:</strong> {country.languages.map((language: any) => language.name).join(', ') || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default CountryDetail;
