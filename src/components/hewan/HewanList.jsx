import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

const HewanList = () => {
  const [hewan, setHewan] = useState([]);
  const [selectedHewan, setSelectedHewan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getHewan();
  }, []);

  const getHewan = async () => {
    try {
      const response = await axios.get("http://localhost:3001/hewan");
      setHewan(response.data);
    } catch (error) {
      console.error("Error fetching hewan:", error);
    }
  };

  const deleteHewan = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/hewan/delete/${id}`);
      getHewan();
    } catch (error) {
      console.error("Error deleting hewan:", error);
    }
  };

  const openModal = (item) => {
    setSelectedHewan(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHewan(null);
  };

  return (
    <div className="flex min-h-screen flex-col p-6"> 
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Jenis Hewan</h1>
      <div className="bg-orange-100 p-4 rounded-lg">
        <table className="w-full border-collapse border border-orange-500">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="border border-orange-500 p-2">No</th>
              <th className="border border-orange-500 p-2">Gambar</th>
              <th className="border border-orange-500 p-2">Nama</th>
              <th className="border border-orange-500 p-2">Jenis</th>
              <th className="border border-orange-500 p-2">Harga</th>
              <th className="border border-orange-500 p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {hewan.map((item, index) => (
              <tr key={item.id} className="hover:bg-orange-200">
                <td className="border border-orange-500 p-2 text-center">{index + 1}</td>
                <td className="border border-orange-500 p-2 text-center">
                  <img src={item.img} alt={item.name} className="w-20 h-12 object-cover rounded-md mx-auto" />
                </td>
                <td className="border border-orange-500 p-2">{item.name}</td>
                <td className="border border-orange-500 p-2">{item.jenis}</td>
                <td className="border border-orange-500 p-2">Rp {item.harga}</td>
                <td className="border border-orange-500 p-2 text-center">
                  <div className="flex justify-center space-x-3">
                    <button onClick={() => openModal(item)} className="text-blue-500 hover:text-blue-400 transition">
                      <Edit size={24} />
                    </button>
                    <button onClick={() => deleteHewan(item.id)} className="text-red-500 hover:text-red-400 transition">
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
        <Link to="add" className="flex items-center text-orange-600 hover:text-orange-500 transition">
          <PlusCircle size={32} className="mr-2" /> Tambah Hewan
        </Link>
      </div>

      {isModalOpen && selectedHewan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white shadow-lg rounded-lg p-8 w-96">
            <h2 className="text-2xl font-bold text-center mb-6">Edit Hewan</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.put(`http://localhost:3001/hewan/update/${selectedHewan.id}`, selectedHewan);
                  getHewan();
                  closeModal();
                } catch (error) {
                  console.log("Error updating hewan:", error);
                }
              }}
            >
              <input type="text" className="w-full p-2 border rounded-lg mb-2" value={selectedHewan.name} onChange={(e) => setSelectedHewan({ ...selectedHewan, name: e.target.value })} placeholder="Nama Hewan" required />
              <input type="text" className="w-full p-2 border rounded-lg mb-2" value={selectedHewan.jenis} onChange={(e) => setSelectedHewan({ ...selectedHewan, jenis: e.target.value })} placeholder="Jenis Hewan" required />
              <input type="number" className="w-full p-2 border rounded-lg mb-2" value={selectedHewan.harga} onChange={(e) => setSelectedHewan({ ...selectedHewan, harga: e.target.value })} placeholder="Harga" required />
              <input type="text" className="w-full p-2 border rounded-lg mb-2" value={selectedHewan.img} onChange={(e) => setSelectedHewan({ ...selectedHewan, img: e.target.value })} placeholder="URL Gambar" required />
              <div className="flex justify-between mt-4">
                <button type="submit" className="bg-green-600 text-white p-2 rounded-lg">
                  Simpan perubahan
                </button>
                <button type="button" onClick={closeModal} className="bg-gray-400 text-white p-2 rounded-lg">
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HewanList;
