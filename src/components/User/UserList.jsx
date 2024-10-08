import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Dasboard from "../Dasboard";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:3001/user");
    setUsers(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/user/delete/${id}`);
      getUsers(); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Dasboard/>
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Daftar Pembeli</h1>
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
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <Link
                      to={`edit/${user.id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-400 transition duration-300 ease-in-out"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteUser(user.id)}
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
    </div>
    </div>
  );
};

export default UserList;
