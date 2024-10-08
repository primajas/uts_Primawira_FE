import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPakan = () => {
  const [name, setName] = useState("");
  const [jenisPakan, setJenisPakan] = useState("");
  const [harga, setHarga] = useState(0);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    getPakanById();
  }, []);

  const getPakanById = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/pakan/find/${id}`);
      const { name, jenisPakan, harga, UserId } = response.data;
      setName(name);
      setJenisPakan(jenisPakan);
      setHarga(harga);
      setUserId(UserId);
    } catch (error) {
      console.log("Error fetching pakan:", error);
    }
  };

  const updatePakan = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/pakan/update/${id}`, {
        name,
        jenisPakan,
        harga,
        UserId: userId,
      });
      navigate("/pakan"); 
    } catch (error) {
      console.log("Error updating pakan:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Pakan</h2>
        <form onSubmit={updatePakan}>
          <div className="field mb-4">
            <label className="label text-sm font-semibold">Name</label>
            <div className="control">
              <input
                type="text"
                className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter pakan name"
                required
              />
            </div>
          </div>
          <div className="field mb-4">
            <label className="label text-sm font-semibold">Jenis Pakan</label>
            <div className="control">
              <input
                type="text"
                className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={jenisPakan}
                onChange={(e) => setJenisPakan(e.target.value)}
                placeholder="Enter jenis pakan"
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPakan;
