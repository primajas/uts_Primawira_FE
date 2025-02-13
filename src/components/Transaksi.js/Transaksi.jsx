import { useEffect, useState } from "react";
import axios from "axios";

export default function Transaksi() {
    const [transaksi, setTransaksi] = useState([]);
    const [pembelis, setPembelis] = useState([]);
    const [hewan, setHewan] = useState([]);
    const [pakan, setPakan] = useState([]);

    useEffect(() => {
        getTransaksi();
        getPembelis();
        getHewan();
        getPakan();
    }, []);

    const getTransaksi = async () => {
        try {
            const response = await axios.get("http://localhost:3001/transaksi");
            setTransaksi(response.data);
        } catch (error) {
            console.error("Error fetching transaksi:", error);
        }
    };

    const getPembelis = async () => {
        try {
            const response = await axios.get("http://localhost:3001/pembeli");
            setPembelis(response.data);
        } catch (error) {
            console.error("Error fetching pembelis:", error);
        }
    };

    const getHewan = async () => {
        try {
            const response = await axios.get("http://localhost:3001/hewan");
            setHewan(response.data);
        } catch (error) {
            console.error("Error fetching hewan:", error);
        }
    };

    const getPakan = async () => {
        try {
            const response = await axios.get("http://localhost:3001/pakan");
            setPakan(response.data);
        } catch (error) {
            console.error("Error fetching pakan:", error);
        }
    }

    return (
        <div className="flex min-h-screen">
            <div className="p-6 w-full">
                <h1 className="text-2xl font-bold text-orange-600 mb-4">Daftar Transaksi</h1>
                <table className="w-full border-collapse border border-orange-500">
                    <thead>
                        <tr className="bg-orange-500 text-white">
                            <th className="border border-orange-500 p-2">No</th>
                            <th className="border border-orange-500 p-2">Nama Pembeli</th>
                            <th className="border border-orange-500 p-2">Hewan</th>
                            <th className="border border-orange-500 p-2">Pakan</th>
                            <th className="border border-orange-500 p-2">Total Harga</th>
                            <th className="border border-orange-500 p-2">Alamat</th>
                            <th className="border border-orange-500 p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transaksi.map((item, index) => (
                            <tr key={item.id} className="hover:bg-orange-200">
                                <td className="border border-orange-500 p-2">{index + 1}</td>
                                <td className="border border-orange-500 p-2">{item.Pembeli?.name || "Unknown"}</td>
                                <td className="border border-orange-500 p-2">{item.Hewan?.name || "Tidak Ada"}</td>
                                <td className="border border-orange-500 p-2">{item.Pakan?.name || "Tidak Ada"}</td>
                                <td className="border border-orange-500 p-2">Rp {item.total_harga}</td>
                                <td className="border border-orange-500 p-2">{item.alamat}</td>
                                <td className={`border border-orange-500 p-2 ${item.status === "pending" ? "text-yellow-600" : "text-green-600"}`}>
                                    {item.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
