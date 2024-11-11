import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditTransaksi = () => {
  const { id } = useParams();
  const [tanggalPembelian, setTanggalPembelian] = useState("");
  const [nominal, setNominal] = useState(0);
  const [pembeliId, setPembeliId] = useState("");
  const [selectedHewan, setSelectedHewan] = useState("");
  const [selectedPakan, setSelectedPakan] = useState("");
  const [hewanHarga, setHewanHarga] = useState(0);
  const [pakanHarga, setPakanHarga] = useState(0);
  const [users, setUsers] = useState([]);
  const [hewans, setHewans] = useState([]);
  const [pakans, setPakans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPembelis();
        await fetchHewans();
        await fetchPakans();
        await fetchTransaksi(); 
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  

  const fetchPembelis = async () => {
    try {
      const response = await axios.get("http://localhost:3001/pembeli");
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching pembeli:", error);
    }
  };

  const fetchHewans = async () => {
    try {
      const response = await axios.get("http://localhost:3001/hewan");
      setHewans(response.data);
    } catch (error) {
      console.log("Error fetching hewans:", error);
    }
  };

  const fetchPakans = async () => {
    try {
      const response = await axios.get("http://localhost:3001/pakan");
      setPakans(response.data);
    } catch (error) {
      console.log("Error fetching pakans:", error);
    }
  };

  const fetchTransaksi = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/transaksi/find/${id}`);
      const data = response.data;
      setTanggalPembelian(data.tanggalPembelian);
      setPembeliId(data.PembeliId);
      setSelectedHewan(data.HewanId);
      setSelectedPakan(data.PakanId);

      const hewan = hewans.find((h) => h.id === data.HewanId);
      const pakan = pakans.find((p) => p.id === data.PakanId);
      setHewanHarga(hewan ? hewan.harga : 0);
      setPakanHarga(pakan ? pakan.harga : 0);
      setNominal((hewan ? hewan.harga : 0) + (pakan ? pakan.harga : 0));
    } catch (error) {
      console.log("Error fetching transaksi:", error);
    }
  };

  const saveTransaksi = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/transaksi/update/${id}`, {
        tanggalPembelian,
        nominal: hewanHarga + pakanHarga,
        PembeliId: pembeliId,
        HewanId: selectedHewan || null,
        PakanId: selectedPakan || null,
      });
      navigate("/trans");
    } catch (error) {
      console.log("Error updating transaksi:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Transaksi</h2>
        <form onSubmit={saveTransaksi}>
          <div className="mb-4">
            <label className="label text-sm font-semibold">Pilih Pembeli</label>
            <select
              className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={pembeliId}
              onChange={(e) => setPembeliId(e.target.value)}
              required
            >
              <option value="">Select Pembeli</option>
              {users.map((pembeli) => (
                <option key={pembeli.id} value={pembeli.id}>
                  {pembeli.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="label text-sm font-semibold">Tanggal Pembelian</label>
            <input
              type="date"
              className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={tanggalPembelian}
              onChange={(e) => setTanggalPembelian(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="label text-sm font-semibold">Pilih Hewan</label>
            <select
              className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedHewan}
              onChange={(e) => {
                setSelectedHewan(e.target.value);
                const hewan = hewans.find((h) => h.id.toString() === e.target.value);
                setHewanHarga(hewan ? hewan.harga : 0);
                setNominal((hewan ? hewan.harga : 0) + pakanHarga);
              }}
            >
              <option value="">Select Hewan</option>
              {hewans.map((hewan) => (
                <option key={hewan.id} value={hewan.id}>
                  {hewan.name} - Harga: {hewan.harga}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="label text-sm font-semibold">Pilih Pakan</label>
            <select
              className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedPakan}
              onChange={(e) => {
                setSelectedPakan(e.target.value);
                const pakan = pakans.find((p) => p.id.toString() === e.target.value);
                setPakanHarga(pakan ? pakan.harga : 0);
                setNominal(hewanHarga + (pakan ? pakan.harga : 0));
              }}
            >
              <option value="">Select Pakan</option>
              {pakans.map((pakan) => (
                <option key={pakan.id} value={pakan.id}>
                  {pakan.name} - Harga: {pakan.harga}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">Nominal: Rp {hewanHarga + pakanHarga}</h2>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-300 w-full"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTransaksi;
