import { useState } from "react";
import axios from "axios";
import { FaArrowLeft, FaRobot } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

/**
 * Komponen Chat memungkinkan pengguna berinteraksi dengan AI melalui percakapan.
 * Pengguna dapat mengetik pesan dan mendapatkan respons dari AI.
 */
const Chat = () => {
    // State untuk menyimpan semua pesan dalam percakapan
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

    // State untuk menyimpan pesan yang sedang diketik oleh pengguna
    const [message, setMessage] = useState<string>('');

    // State untuk menandakan apakah AI sedang memproses pesan
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // State untuk menyimpan error jika terjadi kesalahan dalam permintaan
    const [error, setError] = useState<string | null>(null);

    // Fungsi untuk menangani pengiriman pesan dari pengguna ke AI
    const handleSubmit = async () => {
        if (!message.trim()) return;
        
        setIsLoading(true);
        setError(null);

        // Tambahkan pesan dari pengguna ke daftar pesan
        setMessages(prev => [...prev, { role: "user", content: message }]);
        setMessage(''); // Kosongkan input setelah pesan terkirim

        try {
            // Mengirim permintaan POST ke server untuk mendapatkan respons AI
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, { message });

            // Jika respons AI ada, tambahkan ke percakapan
            if (response.data?.reply) {
                setMessages(prev => [...prev, { role: "ai", content: response.data.reply }]);
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Gagal mendapatkan respons dari AI.");
        } finally {
            setIsLoading(false); // Mengakhiri status loading setelah respons diterima
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 flex flex-col overflow-y-hidden">
            {/* Header Komponen (Fixed di atas halaman) */}
            <div className="h-16 w-full bg-white flex items-center justify-center fixed top-0 left-0 right-0 z-10 shadow-md">
                <div className="content h-full flex items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        {/* Tombol kembali ke halaman sebelumnya */}
                        <Link to={'/'}> 
                            <FaArrowLeft />
                        </Link>
                        <div className="flex items-center gap-2">
                            {/* Ikon AI */}
                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg">
                                <FaRobot />
                            </div>
                            <h1 className="font-semibold text-lg">Chat AI</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Area Percakapan  */}
            <div className="flex flex-1 w-full justify-center overflow-y-auto pt-20 pb-28">
                <div className="content flex flex-col gap-4">
                    {/* Menampilkan pesan-pesan dalam percakapan */}
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                            {/* Ikon AI hanya untuk pesan dari AI */}
                            {msg.role === "ai" && (
                                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg">
                                    <FaRobot />
                                </div>
                            )}
                            <div className={`max-w-[75%] p-3 rounded-lg shadow-md ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-white text-black"}`}>
                                {/* Menggunakan ReactMarkdown untuk menampilkan pesan dalam format markdown */}
                                <ReactMarkdown className="whitespace-pre-line">
                                    {msg.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}

                    {/* Indikator loading */}
                    {isLoading && <p className="text-gray-500 text-center">AI sedang mengetik...</p>}
                    
                    {/* Menampilkan pesan error jika ada */}
                    {error && <p className="text-red-500 text-center">{error}</p>}
                </div>
            </div>

            {/* Input untuk mengirim pesan */}
            <div className="fixed bottom-0 w-full flex justify-center px-5 bg-gray-100 py-5">
                <div className="content flex items-center bg-white shadow-md rounded-full px-4 py-2 border">
                    {/* Input teks untuk mengetik pesan */}
                    <input
                        type="text"
                        className="outline-none flex-1 p-2"
                        placeholder="Kirim pesan ke AI..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)} // Update state message saat pengguna mengetik
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()} // Kirim pesan jika Enter ditekan
                    />
                    {/* Ikon kirim */}
                    <IoIosSend onClick={handleSubmit} className="text-2xl text-blue-500 cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default Chat;
