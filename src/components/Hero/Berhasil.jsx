import { useNavigate } from "react-router-dom";

export default function OrderanBerhasil() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <svg
        className="w-16 h-16 text-green-500 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
      </svg>
      <h1 className="text-2xl font-bold text-green-600">Orderan Berhasil!</h1>
      <p className="text-gray-600 mt-2 text-center">
        Terima kasih telah berbelanja! Pesanan Anda sedang diproses dan akan segera dikirim.
      </p>
      <p className="text-gray-500 mt-1 text-center">
        Cek riwayat pesanan Anda untuk melihat detail lebih lanjut.
      </p>
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Kembali ke Beranda
        </button>
        <button
          onClick={() => navigate("/riwayat-pesanan")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Lihat Riwayat Pesanan
        </button>
      </div>
    </div>
  );
}
