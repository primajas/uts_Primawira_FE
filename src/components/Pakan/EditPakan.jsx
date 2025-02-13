import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPakan = () => {
  const [name, setName] = useState("");
  const [harga, setHarga] = useState(0);
  const [stok, setStok] = useState(0);
  const [gambar, setGambar] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    getPakanById();
  }, []);

  const getPakanById = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/pakan/find/${id}`);
      const { name, harga, stok, gambar } = response.data;
      setName(name);
      setHarga(harga);
      setStok(stok);
      setGambar(gambar);
    } catch (error) {
      console.error("Error fetching pakan:", error);
    }
  };

  const updatePakan = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/pakan/update/${id}`, {
        name,
        harga,
        stok,
        gambar,
      });
      navigate("/pakan"); 
    } catch (error) {
      console.error("Error updating pakan:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Pakan</h2>
        <form onSubmit={updatePakan}>
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPakan;
