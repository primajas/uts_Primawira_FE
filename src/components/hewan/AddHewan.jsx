import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddHewan = () => {
  const [name, setName] = useState("");
  const [jenis, setJenis] = useState("");
  const [harga, setHarga] = useState(0);
  const [img, setImg] = useState(""); 
  const navigate = useNavigate();

  const saveHewan = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/hewan/create", {
        name,
        jenis,
        harga,
        img, 
      });
      navigate("/dashboard/hewan");
    } catch (error) {
      console.error("Error adding hewan:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Tambah Jenis Hewan</h2>
        <form onSubmit={saveHewan}>
          <div className="mb-4">
            <label className="text-sm font-semibold">Name</label>
            <input
              type="text"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama hewan"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold">Jenis</label>
            <input
              type="text"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
              placeholder="Masukkan jenis hewan"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold">Harga</label>
            <input
              type="number"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              placeholder="Masukkan harga"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold">Gambar URL</label>
            <input
              type="text"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder="Masukkan URL gambar"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHewan;
