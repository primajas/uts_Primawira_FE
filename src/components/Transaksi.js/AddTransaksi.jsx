import { useEffect, useState } from "react";
import axios from "axios";

export default function Pembayaran() {
    const [pembeli, setPembeli] = useState([]);
    const [hewan, setHewan] = useState([]);
    const [pakan, setPakan] = useState([]);
    const [selectedHewan, setSelectedHewan] = useState(null);
    const [selectedPakan, setSelectedPakan] = useState(null);
    const [alamat, setAlamat] = useState("");
    const [totalHarga, setTotalHarga] = useState(0);

    useEffect(() => {
        getPembeli();
        getHewan();
        getPakan();
    }, []);

    const getPembeli = async () => {
        try {
            const response = await axios.get("/api/pembeli");
            setPembeli(response.data);
        } catch (error) {
            console.error("Error fetching pembeli:", error);
        }
    };

    const getHewan = async () => {
        try {
            const response = await axios.get("/api/hewan");
            setHewan(response.data);
        } catch (error) {
            console.error("Error fetching hewan:", error);
        }
    };

    const getPakan = async () => {
        try {
            const response = await axios.get("/api/pakan");
            setPakan(response.data);
        } catch (error) {
            console.error("Error fetching pakan:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/transaksi", {
                HewanId: selectedHewan,
                PakanId: selectedPakan,
                total_harga: totalHarga,
                alamat: alamat,
                status: "pending",
            });
            console.log("Transaksi berhasil:", response.data);
        } catch (error) {
            console.error("Error creating transaksi:", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-orange-600 mb-4">Pembayaran</h1>
            <form onSubmit={handleSubmit} className="bg-orange-100 p-4 rounded-lg">
                <label className="block mb-2">Alamat:</label>
                <input 
                    type="text" 
                    value={alamat} 
                    onChange={(e) => setAlamat(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                    required
                />
                <button type="submit" className="bg-orange-500 text-white p-2 rounded">Bayar</button>
            </form>
        </div>
    );
}
