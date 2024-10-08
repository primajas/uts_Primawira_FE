import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTransaksi = () => {
  const [tanggalPembelian, setTanggalPembelian] = useState("");
  const [nominal, setNominal] = useState(0);
  const [userId, setUserId] = useState("");
  const [adminId, setAdminId] = useState("");
  const [hewanId, setHewanId] = useState("");
  const [pakanId, setPakanId] = useState("");
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [hewans, setHewans] = useState([]);
  const [pakans, setPakans] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchAdmins();
    fetchHewans();
    fetchPakans();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user");
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:3001/admin");
      setAdmins(response.data);
    } catch (error) {
      console.log("Error fetching admins:", error);
    }
  };

  const fetchHewans = async () => {
    try {
      const response = await axios.get("http://localhost:3001/hewan"); 
      setHewans(response.data);
    } catch (error) {
      console.log("Error fetching hewans:", error);
    }
  };

  const fetchPakans = async () => {
    try {
      const response = await axios.get("http://localhost:3001/pakan"); 
      setPakans(response.data);
    } catch (error) {
      console.log("Error fetching pakans:", error);
    }
  };

  const saveTransaksi = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/transaksi/create", {
        tanggalPembelian,
        nominal,
        UserId: userId,
        AdminId: adminId,
        HewanId: hewanId,
        PakanId: pakanId,
      });
      navigate("/trans"); 
    } catch (error) {
      console.log("Error adding transaksi:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Transaksi</h2>
        <form onSubmit={saveTransaksi}>
          <div className="field mb-4">
            <label className="label text-sm font-semibold">Tanggal Pembelian</label>
            <div className="control">
              <input
                type="date"
                className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={tanggalPembelian}
                onChange={(e) => setTanggalPembelian(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field mb-4">
            <label className="label text-sm font-semibold">Nominal</label>
            <div className="control">
              <input
                type="number"
                className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={nominal}
                onChange={(e) => setNominal(e.target.value)}
                placeholder="Enter nominal"
                required
              />
            </div>
          </div>
          <div className="field mb-4">
            <label className="label text-sm font-semibold">User ID</label>
            <div className="control">
              <select
                className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field mb-4">
            <label className="label text-sm font-semibold">Admin ID</label>
            <div className="control">
              <select
                className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                required
              >
                <option value="">Select Admin</option>
                {admins.map(admin => (
                  <option key={admin.id} value={admin.id}>{admin.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field mb-4">
            <label className="label text-sm font-semibold">Hewan ID</label>
            <div className="control">
              <select
                className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={hewanId}
                onChange={(e) => setHewanId(e.target.value)}
                required
              >
                <option value="">Select Hewan</option>
                {hewans.map(hewan => (
                  <option key={hewan.id} value={hewan.id}>{hewan.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field mb-4">
            <label className="label text-sm font-semibold">Pakan ID</label>
            <div className="control">
              <select
                className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={pakanId}
                onChange={(e) => setPakanId(e.target.value)}
                required
              >
                <option value="">Select Pakan</option>
                {pakans.map(pakan => (
                  <option key={pakan.id} value={pakan.id}>{pakan.name}</option>
                ))}
              </select>
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

export default AddTransaksi;
