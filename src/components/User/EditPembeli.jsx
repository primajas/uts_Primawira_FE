import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPembeli = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getPembeliById();
  }, []);

  const updatePembeli = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/pembeli/update/${id}`, {
        name,
        gender,
      });
      navigate("/pembeli"); 
    } catch (error) {
      console.log("Error updating pembeli:", error);
    }
  };

  const getPembeliById = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/pembeli/find/${id}`);
      setName(response.data.name);
      setGender(response.data.gender);
    } catch (error) {
      console.log("Error fetching pembeli:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Pembeli</h2>
        <form onSubmit={updatePembeli}>
          <div className="field mb-4">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
          </div>
          <div className="field mb-4">
            <label className="label">Gender</label>
            <div className="control">
              <select
                className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
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

export default EditPembeli;
