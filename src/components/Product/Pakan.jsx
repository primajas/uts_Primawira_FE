import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiShoppingCart } from "react-icons/fi";

export default function Pakan() {
  const [dataPakan, setDataPakan] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [jumlahBeli, setJumlahBeli] = useState(1);
  const [alamat, setAlamat] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPakan();
  }, []);

  const getPakan = async () => {
    try {
      const response = await axios.get("http://localhost:3001/pakan");
      setDataPakan(response.data);
    } catch (error) {
      console.error("Error fetching pakan data:", error);
    }
  };

  const handleOrderClick = (item) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Anda harus Login akun terlebih dahulu!");
      navigate("/");
      return;
    }

    setSelectedProduct(item.id === selectedProduct ? null : item.id);
    setJumlahBeli(1);
    setAlamat("");
    setIsProcessing(false);
  };

  const handleIncrease = (maxStock) => {
    if (jumlahBeli < maxStock) {
      setJumlahBeli(jumlahBeli + 1);
    }
  };

  const handleDecrease = () => {
    if (jumlahBeli > 1) {
      setJumlahBeli(jumlahBeli - 1);
    }
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

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setIsModalOpen(false);

    setTimeout(() => {
      setIsProcessing(false);
      navigate("/ber", {
        state: {
          id: selectedProduct,
          name: dataPakan.find((p) => p.id === selectedProduct)?.name,
          harga: dataPakan.find((p) => p.id === selectedProduct)?.harga * jumlahBeli,
          stok: jumlahBeli,
          alamat,
        },
      });
    }, 3000);
  };

  return (
    <div className="bg-white-500 min-h-screen w-full flex flex-col items-center py-16">
      <div className="text-center grid gap-2 mb-8">
        <h1 className="text-4xl text-black font-bold">Makanan Hewan</h1>
        <p className="text-xs text-black-200">Temukan makanan terbaik untuk hewan peliharaan Anda</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-6 w-full max-w-7xl px-4">
        {dataPakan.map((item) => (
          <div key={item.id} className="border-2 border-orange-500 p-4 rounded-lg shadow-md bg-white">
            <img src={item.gambar} alt={item.name} className="w-full h-48 object-contain rounded bg-white" />
            <h2 className="mt-2 text-lg font-bold text-gray-800">{item.name}</h2>
            <p className="text-gray-600">Harga: Rp {item.harga}</p>
            <p className="text-gray-600">Stok: {item.stok}</p>

            <button
              onClick={() => handleOrderClick(item)}
              className="mt-2 bg-orange-700 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 hover:bg-orange-600 transition-opacity w-full"
            >
              <FiShoppingCart className="w-5 h-5" />
              <span>{selectedProduct === item.id ? "Batal" : "Order"}</span>
            </button>

            {selectedProduct === item.id && (
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleDecrease}
                    className="px-3 py-1 bg-gray-300 rounded-md"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold">{jumlahBeli}</span>
                  <button
                    onClick={() => handleIncrease(item.stok)}
                    className="px-3 py-1 bg-gray-300 rounded-md"
                  >
                    +
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Masukkan Alamat"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  className="w-full border p-2 rounded-md mt-2"
                />
                <button
                  onClick={openModal}
                  className="mt-2 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-opacity"
                >
                  Order Sekarang
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-lg font-bold mb-4">Pesanan Sedang Diproses...</h2>
            <p>Harap tunggu sebentar.</p>
          </div>
        </div>
      )}

      {isModalOpen && selectedProduct !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Konfirmasi Pembayaran</h2>
            <p><strong>Nama Produk:</strong> {dataPakan.find((p) => p.id === selectedProduct)?.name}</p>
            <p><strong>Harga Total:</strong> Rp {dataPakan.find((p) => p.id === selectedProduct)?.harga * jumlahBeli}</p>
            <p><strong>Jumlah Beli:</strong> {jumlahBeli}</p>
            <p><strong>Alamat:</strong> {alamat}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="mr-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmOrder}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
