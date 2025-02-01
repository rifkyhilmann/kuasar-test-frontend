import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";

// GraphQL query untuk mendapatkan data negara berdasarkan kode negara
const GET_COUNTRY = gql`
    query GetCountryByCode($code: String!) {
        countries(filter: { code: { eq: $code } }) {
            code
            name
            capital
            currency
            emoji
            continent {
                name
            }
            languages {
                name
            }
        }
    }
`;

const CountryDetail = () => {
    // Mengambil kode negara dari parameter URL
    const { code } = useParams<{ code: string }>();

    // Menjalankan query untuk mengambil data negara menggunakan Apollo Client
    const { loading, error, data } = useQuery(GET_COUNTRY, { variables: { code } });

    // Menangani state loading, jika data sedang dimuat
    if (loading) return (
        <div className="w-full h-screen flex items-center justify-center">
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
    );

    // Menangani error jika terjadi kesalahan saat pengambilan data
    if (error) return <p>Error: {error.message}</p>;

    console.log(data);

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
