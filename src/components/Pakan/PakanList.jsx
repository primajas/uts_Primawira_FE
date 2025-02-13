import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Edit } from "lucide-react";

const PakanList = () => {
  const [pakan, setPakan] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({ name: "", harga: "", stok: "", gambar: "" });

  useEffect(() => {
    getAllPakan();
  }, []);

  const getAllPakan = async () => {
    try {
      const response = await axios.get("http://localhost:3001/pakan");
      setPakan(response.data);
    } catch (error) {
      console.error("Error fetching pakan:", error);
    }
  };

  const openPopup = (item = null) => {
    setEditItem(item);
    setFormData(item ? { name: item.name, harga: item.harga, stok: item.stok, gambar: item.gambar } : { name: "", harga: "", stok: "", gambar: "" });
    setShowPopup(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const payload = { ...formData };
      if (editItem) {
        await axios.put(`http://localhost:3001/pakan/update/${editItem.id}`, payload);
      } else {
        await axios.post("http://localhost:3001/pakan/create", payload);
      }
      setShowPopup(false);
      getAllPakan();
    } catch (error) {
      console.error("Error saving pakan:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pakan ini?")) {
      try {
        await axios.delete(`http://localhost:3001/pakan/delete/${id}`);
        getAllPakan();
      } catch (error) {
        console.error("Error deleting pakan:", error);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col p-6">
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold text-orange-600 mb-4">Daftar Pakan</h1>
        <div className="bg-orange-100 p-4 rounded-lg">
          <table className="w-full border-collapse border border-orange-500">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="border border-orange-500 p-2">No</th>
                <th className="border border-orange-500 p-2">Gambar</th>
                <th className="border border-orange-500 p-2">Nama</th>
                <th className="border border-orange-500 p-2">Harga</th>
                <th className="border border-orange-500 p-2">Stok</th>
                <th className="border border-orange-500 p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pakan.map((item, index) => (
                <tr key={item.id} className="hover:bg-orange-200">
                  <td className="border border-orange-500 p-2 text-center">{index + 1}</td>
                  <td className="border border-orange-500 p-2 text-center">
                    {item.gambar ? (
                      <img src={item.gambar} alt={item.name} className="w-20 h-12 object-cover rounded-md mx-auto" />
                    ) : (
                      <span className="text-gray-400">Tidak ada gambar</span>
                    )}
                  </td>
                  <td className="border border-orange-500 p-2">{item.name}</td>
                  <td className="border border-orange-500 p-2">Rp {item.harga}</td>
                  <td className="border border-orange-500 p-2">{item.stok}</td>
                  <td className="border border-orange-500 p-2 text-center">
                  <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => openPopup(item)}
                    className="text-blue-500 hover:text-blue-400 transition"
                    >
                    <Edit size={24} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-400 transition"
                    >
                    <Trash2 size={24} />
                  </button>
                  </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button onClick={() => openPopup()} className="bg-orange-600 text-white p-2 rounded-md hover:bg-orange-500 transition">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">{editItem ? "Edit Pakan" : "Tambah Pakan"}</h2>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nama" className="w-full border p-2 rounded-md mb-2" />
            <input type="number" name="harga" value={formData.harga} onChange={handleChange} placeholder="Harga" className="w-full border p-2 rounded-md mb-2" />
            <input type="number" name="stok" value={formData.stok} onChange={handleChange} placeholder="Stok" className="w-full border p-2 rounded-md mb-2" />
            <input type="text" name="gambar" value={formData.gambar} onChange={handleChange} placeholder="URL Gambar" className="w-full border p-2 rounded-md mb-2" />
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowPopup(false)} className="mr-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Batal</button>
              <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">{editItem ? "Simpan Perubahan" : "Tambah"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PakanList;
