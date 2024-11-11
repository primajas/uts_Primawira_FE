import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dasboard from "../Dasboard";

const AddTransaksi = () => {
  const [hewan, setHewan] = useState([]);
  const [pakan, setPakan] = useState([]);
  const [pembeli, setPembeli] = useState([]);
  const [selectedHewan, setSelectedHewan] = useState("");
  const [selectedPakan, setSelectedPakan] = useState("");
  const [hewanHarga, setHewanHarga] = useState(0);
  const [pakanHarga, setPakanHarga] = useState(0);
  const [tanggalPembelian, setTanggalPembelian] = useState(new Date().toISOString().substring(0, 10));
  const [pembeliId, setPembeliId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getHewan();
    getPakan();
    getPembeli();
  }, []);

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
  };

  const getPembeli = async () => {
    try {
      const response = await axios.get("http://localhost:3001/pembeli");
      setPembeli(response.data);
    } catch (error) {
      console.error("Error fetching pembeli:", error);
    }
  };

  const handleAddTransaksi = async (e) => {
    e.preventDefault();

    if (!pembeliId) {
      alert("Please select a Pembeli.");
      return;
    }

    if (!selectedHewan && !selectedPakan) {
      alert("Please select at least one Hewan or Pakan.");
      return;
    }

    try {
      const dataToSend = {
        HewanId: selectedHewan ? parseInt(selectedHewan, 10) : null, 
        PakanId: selectedPakan ? parseInt(selectedPakan, 10) : null, 
        nominal: hewanHarga + pakanHarga,
        tanggalPembelian,
        PembeliId: parseInt(pembeliId, 10), 
      };

      await axios.post("http://localhost:3001/transaksi/create", dataToSend);
      navigate("/trans");
    } catch (error) {
      console.error("Error adding transaksi:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Dasboard />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Tambah Transaksi</h1>
        <form onSubmit={handleAddTransaksi}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Pilih Pembeli</label>
            <select
              value={pembeliId}
              onChange={(e) => setPembeliId(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg"
              required
            >
              <option value="">-- Pilih Pembeli --</option>
              {pembeli.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Tanggal Pembelian</label>
            <input
              type="date"
              value={tanggalPembelian}
              onChange={(e) => setTanggalPembelian(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Pilih Hewan</label>
            <select
              value={selectedHewan}
              onChange={(e) => {
                setSelectedHewan(e.target.value);
                const selected = hewan.find((h) => h.id.toString() === e.target.value);
                setHewanHarga(selected ? selected.harga : 0);
              }}
              className="mt-1 block w-full p-2 border rounded-lg"
            >
              <option value="">-- Pilih Hewan --</option>
              {hewan.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} - Harga: {h.harga}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Pilih Pakan</label>
            <select
              value={selectedPakan}
              onChange={(e) => {
                setSelectedPakan(e.target.value);
                const selected = pakan.find((p) => p.id.toString() === e.target.value);
                setPakanHarga(selected ? selected.harga : 0);
              }}
              className="mt-1 block w-full p-2 border rounded-lg"
            >
              <option value="">-- Pilih Pakan --</option>
              {pakan.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} - Harga: {p.harga}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Nominal: Rp {hewanHarga + pakanHarga}</h2>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
            >
              Tambah Transaksi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaksi;
