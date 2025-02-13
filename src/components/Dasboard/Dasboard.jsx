import React, { useEffect, useState, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Home, ShoppingBag, Users, PawPrint, CreditCard } from "lucide-react";
import HewanList from "../hewan/HewanList";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("admin");
    const storedAdmin = localStorage.getItem("adminName");

    if (!token) {
      navigate("/");
    } else {
      setAdminName(storedAdmin || "Admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminName");
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white p-4 flex flex-col gap-4 relative">
        <div className="flex flex-col items-center text-orange-500 text-xl font-semibold border-b border-gray-600 pb-2">
          <PawPrint size={24} />
          <span>Petshop</span>
        </div>
        
        <nav className="flex flex-col gap-2 mt-4">
          <Link to="/" className="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-700 rounded transition">
            <Home size={18} /> Home
          </Link>
          <Link to="/dashboard/hewan" className="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-700 rounded transition">
            <PawPrint size={18} /> Hewan
          </Link>
          <Link to="/dashboard/pakan" className="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-700 rounded transition">
            <ShoppingBag size={18} /> Pakan
          </Link>
          <Link to="/dashboard/trans" className="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-700 rounded transition">
            <CreditCard size={18} /> Transaksi
          </Link>
          <Link to="/dashboard/customer" className="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-700 rounded transition">
            <Users size={18} /> Customer
          </Link>
        </nav>
  
        <div className="mt-auto relative">
          <button
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full w-full"
            onClick={() => setShowLogout(!showLogout)}
          >
            <Users size={18} />
            <span className="text-sm font-medium">{adminName}</span>
          </button>
          
          {showLogout && (
            <div ref={logoutRef} className="absolute bottom-12 left-0 bg-white text-gray-800 p-2 rounded shadow-lg w-full">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                <LogOut size={16} className="rotate-180" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
