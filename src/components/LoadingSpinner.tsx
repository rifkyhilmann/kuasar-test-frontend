import { FaSpinner } from "react-icons/fa"


const LoadingSpinner = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
    )
}

export default LoadingSpinner