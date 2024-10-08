import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Total from "./Total";
import Dasboard from "../Dasboard";

const HewanList = () => {
  const [hewan, setHewan] = useState([]);

  useEffect(() => {
    getHewan();
  }, []);

  const getHewan = async () => {
    const response = await axios.get("http://localhost:3001/hewan");
    setHewan(response.data);
  };

  const deleteHewan = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/hewan/delete/${id}`);
      getHewan(); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Dasboard />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Daftar Hewan</h1>
          <Link to={`add`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
            Add New
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Jenis</th>
                <th className="px-4 py-2">Harga</th>
                <th className="px-4 py-2">UserId</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hewan.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.jenis}</td>
                  <td className="px-4 py-2">{item.harga}</td>
                  <td className="px-4 py-2">{item.UserId}</td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <Link
                        to={`edit/${item.id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-400 transition duration-300 ease-in-out"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteHewan(item.id)}
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
        <Total />
      </div>
    </div>
  );
};

export default HewanList;
