import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiShoppingCart } from "react-icons/fi";

export default function Products() {
  const [dataHewan, setDataHewan] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [alamat, setAlamat] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getHewan();
  }, []);

  const getHewan = async () => {
    try {
      const response = await axios.get("http://localhost:3001/hewan");
      setDataHewan(response.data);
    } catch (error) {
      console.error("Error fetching hewan data:", error);
    }
  };

  const handleOrderClick = (item) => {
    const token = localStorage.getItem("token"); 

    if (!token) {
      alert("Anda harus Login terlebih dahulu!");
      navigate("/");
      return;
    }

    setSelectedProduct(item.id === selectedProduct ? null : item.id);
    setAlamat("");
    setIsProcessing(false);
  };

  const openModal = () => {
    if (!alamat.trim()) {
      alert("Silakan masukkan alamat terlebih dahulu.");
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmOrder = async () => {
    setIsProcessing(true);
    setIsModalOpen(false);

    const transaksiData = {
      HewanId: selectedProduct,
      total_harga: dataHewan.find((p) => p.id === selectedProduct)?.harga,
      alamat,
      status: "pending",
    };

    try {
      await axios.post("http://localhost:3001/transaksi", transaksiData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Transaksi berhasil!");
      navigate("/ber"); 
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-orange-500 min-h-screen w-full flex flex-col items-center py-16">
      <div className="text-center grid gap-2 mb-8">
        <h1 className="text-4xl text-white font-bold">Jenis Hewan</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-6 w-full max-w-7xl px-4">
        {dataHewan.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg shadow-md bg-white">
            <img src={item.img} alt={item.name} className="w-full h-48 object-contain rounded" />
            <h2 className="mt-2 text-lg font-bold text-gray-800">{item.name}</h2>
            <p className="text-gray-600">Jenis:{item.jenis}</p>
            <p className="text-gray-600">Harga: Rp {item.harga}</p>

            <button
              onClick={() => handleOrderClick(item)}
              className="mt-2 bg-orange-700 text-white px-4 py-2 rounded-full flex items-center justify-center gap-2"
            >
              <FiShoppingCart className="w-5 h-5" />
              <span>{selectedProduct === item.id ? "Batal" : "Order"}</span>
            </button>

            {selectedProduct === item.id && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Masukkan Alamat"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  className="w-full border p-2 rounded-md"
                />
                <button onClick={openModal} className="mt-2 w-full bg-green-600 text-white px-4 py-2 rounded-lg">
                  Order Sekarang
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && selectedProduct !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Konfirmasi Pembayaran</h2>
            <p><strong>Nama Hewan:</strong> {dataHewan.find((p) => p.id === selectedProduct)?.name}</p>
            <p><strong>Jenis:</strong> {dataHewan.find((p) => p.id === selectedProduct)?.jenis}</p>
            <p><strong>Harga:</strong> Rp {dataHewan.find((p) => p.id === selectedProduct)?.harga}</p>
            <p><strong>Alamat:</strong> {alamat}</p>
            <div className="flex justify-end mt-4">
              <button onClick={closeModal} className="mr-2 bg-gray-400 text-white px-4 py-2 rounded">Batal</button>
              <button onClick={handleConfirmOrder} className="bg-green-600 text-white px-4 py-2 rounded">OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
