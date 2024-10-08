import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/user/update/${id}`, {
        name,
        email,
      });
      navigate("/user"); // Navigasi kembali setelah berhasil memperbarui
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  const getUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user/find/${id}`);
      setName(response.data.name);
      setEmail(response.data.email);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Edit User</h2>
        <form onSubmit={updateUser}>
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
            <label className="label">Email</label>
            <div className="control">
              <input
                type="email" 
                className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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

export default EditUser;
