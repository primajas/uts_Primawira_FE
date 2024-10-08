import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddHewan = () => {
  const [name, setName] = useState("");
  const [jenis, setJenis] = useState("");
  const [harga, setHarga] = useState(0);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const saveHewan = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/hewan/create", {
        name,
        jenis,
        harga,
        UserId: userId, 
      });
      navigate("/hewan");
    } catch (error) {
      console.log("Error adding hewan:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Hewan</h2>
        <form onSubmit={saveHewan}>
          <div className="field mb-4">
            <label className="label text-sm font-semibold">Name</label>
            <div className="control">
              <input
                type="text"
                className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter hewan name"
                required
              />
            </div>
          </div>
          <div className="field mb-4">
            <label className="label text-sm font-semibold">Jenis</label>
            <div className="control">
              <input
                type="text"
                className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={jenis}
                onChange={(e) => setJenis(e.target.value)}
                placeholder="Enter jenis hewan"
                required
              />
            </div>
          </div>
          <div className="field mb-4">
            <label className="label text-sm font-semibold">Harga</label>
            <div className="control">
              <input
                type="number"
                className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                placeholder="Enter harga"
                required
              />
            </div>
          </div>
          <div className="field mb-4">
            <label className="label text-sm font-semibold">User ID</label>
            <div className="control">
              <input
                type="text"
                className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
                required
              />
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-300">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHewan;
