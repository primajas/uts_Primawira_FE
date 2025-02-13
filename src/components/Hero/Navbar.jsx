import React, { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Menu = [
  { id: 1, name: "Home", link: "/uts_Primawira_FE/dashboard/"  },
  { id: 4, name: "About", link: "/#about" },
  { id: 2, name: "Jenis Hewan", link: "/uts_Primawira_FE/dashboard/hewan" },
  { id: 3, name: "Makanan Hewan", link: "/uts_Primawira_FE/dashboard/pakan"  },
];

const Navbar = () => {
  const [loginPopup, setLoginPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("admin"));
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/admin/login", { email, password });
      localStorage.setItem("admin", response.data.token);
      setIsLoggedIn(true);
      setLoginPopup(false);
      navigate("/dashboard");
    } catch (err) {
      setError("Login gagal. Periksa email dan password Anda.");
    }
  };

  return (
    <div className="shadow-md bg-orange-500 text-white duration-200 relative z-40">
      <div className="py-2">
        <div className="container flex justify-between items-center">
          <div className="ml-6">
            <a href="#" className="font-bold text-3xl sm:text-4xl">
              Pet Shop
            </a>
          </div>
          <div className="flex items-center gap-4">
            <FaCartShopping className="text-2xl text-white drop-shadow-sm cursor-pointer" />
            {!isLoggedIn && (
              <button
                onClick={() => setLoginPopup(true)}
                className="bg-white text-orange-500 px-4 py-1 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="bg-orange-600 py-2">
        <div className="container flex justify-center">
          <ul className="sm:flex hidden items-center gap-6">
            {Menu.map((data) => (
              <li key={data.id}>
                <a href={data.link} className="inline-block px-4 hover:text-gray-300 duration-200">
                  {data.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {loginPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Login</h2>
              <button onClick={() => setLoginPopup(false)} className="text-gray-500 hover:text-gray-800">
                <FaTimes />
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email Anda"
                  className="w-full border text-black border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full text-black border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
