import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Dasboard from "../Dasboard";

const TransaksiList = () => {
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    getTransaksi();
  }, []);

  const getTransaksi = async () => {
    try {
      const response = await axios.get("http://localhost:3001/transaksi");
      setTransaksi(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteTransaksi = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/transaksi/delete/${id}`);
      getTransaksi(); 
    } catch (error) {
      console.log(error);
    }
  };

  // Menghitung total nominal
  const totalNominal = transaksi.reduce((total, item) => total + item.nominal, 0);

  return (
    <div className="flex min-h-screen">
      <Dasboard />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Daftar Transaksi</h1>
          <Link to={`add`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
            Add New
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Tanggal Pembelian</th> 
                <th className="px-4 py-2">Nominal</th> 
                <th className="px-4 py-2">UserId</th> 
                <th className="px-4 py-2">AdminId</th> 
                <th className="px-4 py-2">HewanId</th> 
                <th className="px-4 py-2">PakanId</th> 
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transaksi.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{new Date(item.tanggalPembelian).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{item.nominal}</td>
                  <td className="px-4 py-2">{item.UserId}</td>
                  <td className="px-4 py-2">{item.AdminId}</td>
                  <td className="px-4 py-2">{item.HewanId}</td>
                  <td className="px-4 py-2">{item.PakanId}</td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <Link
                        to={`edit/${item.id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-400 transition duration-300 ease-in-out"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteTransaksi(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-400 transition duration-300 ease-in-out"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold">Total Nominal: {totalNominal}</h2>
        </div>
      </div>
    </div>
  );
};

export default TransaksiList;
