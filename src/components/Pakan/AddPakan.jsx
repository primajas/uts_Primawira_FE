import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPakan = () => {
  const [name, setName] = useState("");
  const [jenisPakan, setJenisPakan] = useState("");
  const [harga, setHarga] = useState(0);
  const [stok, setStok] = useState(0);
  const [gambar, setGambar] = useState("");
  const navigate = useNavigate();

  const savePakan = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/pakan/create", {
        name,
        jenisPakan,
        harga,
        stok,
        gambar,
      });
      navigate("/pakan"); 
    } catch (error) {
      console.error("Error adding pakan:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Tambah Pakan Baru</h2>
        <form onSubmit={savePakan}>
          <div className="field mb-4">
            <label className="label text-sm font-semibold">Nama Pakan</label>
            <input
              type="text"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama pakan"
              required
            />
          </div>
          <div className="field mb-4">
            <label className="label text-sm font-semibold">Jenis Pakan</label>
            <input
              type="text"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={jenisPakan}
              onChange={(e) => setJenisPakan(e.target.value)}
              placeholder="Masukkan jenis pakan"
              required
            />
          </div>
          <div className="field mb-4">
            <label className="label text-sm font-semibold">Harga</label>
            <input
              type="number"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              placeholder="Masukkan harga"
              required
            />
          </div>
          <div className="field mb-4">
            <label className="label text-sm font-semibold">Stok</label>
            <input
              type="number"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={stok}
              onChange={(e) => setStok(e.target.value)}
              placeholder="Masukkan stok"
              required
            />
          </div>
          <div className="field mb-4">
            <label className="label text-sm font-semibold">Gambar (URL)</label>
            <input
              type="text"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={gambar}
              onChange={(e) => setGambar(e.target.value)}
              placeholder="Masukkan URL gambar"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPakan;
