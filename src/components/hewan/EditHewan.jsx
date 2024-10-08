import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditHewan = () => {
  const [name, setName] = useState("");
  const [jenis, setJenis] = useState("");
  const [harga, setHarga] = useState(0);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getHewanById();
  }, []);

  const updateHewan = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/hewan/update/${id}`, {
        name,
        jenis,
        harga,
        UserId: userId,
      });
      navigate("/hewan"); // Navigasi kembali setelah berhasil memperbarui
    } catch (error) {
      console.log("Error updating hewan:", error);
    }
  };

  const getHewanById = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/hewan/find/${id}`);
      setName(response.data.name);
      setJenis(response.data.jenis);
      setHarga(response.data.harga);
      setUserId(response.data.UserId);
    } catch (error) {
      console.log("Error fetching hewan:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Hewan</h2>
        <form onSubmit={updateHewan}>
          <div className="field mb-4">
            <label className="label">Name</label>
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
            <label className="label">Jenis</label>
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
            <label className="label">Harga</label>
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
            <label className="label">User ID</label>
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
            <button
              type="submit"
              className="button is-success bg-blue-600 text-white rounded-lg p-2 w-full hover:bg-blue-500 transition duration-300"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHewan;
