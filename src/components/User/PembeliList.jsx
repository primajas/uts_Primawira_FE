import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react"; 

const PembeliList = () => {
  const [pembelis, setPembelis] = useState([]);

  useEffect(() => {
    getPembelis();
  }, []);

  const getPembelis = async () => {
    try {
      const response = await axios.get("http://localhost:3001/pembeli");
      setPembelis(response.data.data);
    } catch (error) {
      console.error("Error fetching pembelis:", error.response || error.message);
    }
  };

  const deletePembeli = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/pembeli/delete/${id}`);
      getPembelis();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Daftar Customer</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left bg-white shadow-lg rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pembelis.map((pembeli, index) => (
                <tr key={pembeli.id} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{pembeli.nama}</td>
                  <td className="px-4 py-2">{pembeli.email}</td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <Link to={`/edit/${pembeli.id}`} className="text-blue-500 hover:text-blue-400">
                        <Pencil size={20} />
                      </Link>
                      <button onClick={() => deletePembeli(pembeli.id)} className="text-red-500 hover:text-red-400">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PembeliList;
