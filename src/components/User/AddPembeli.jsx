import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPembeli = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const navigate = useNavigate();

  const savePembeli = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/pembeli/create", {
        name,
        email,
        alamat,
      });
      if (response.status === 201) {
        navigate("/product");
      }
    } catch (error) {
      console.log("Error adding pembeli:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <form onSubmit={savePembeli}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-black">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-black">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-black">Alamat</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Save
            </button>
            <button
              type="button"
              onClick={closeModal} 
              className="w-1/2 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPembeli;
