import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import Pets from "../assets/pr.png";

const Hero = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsLoggedIn(false);
    navigate("/"); 
  };

  return (
    <div className="w-full h-screen flex items-center justify-center px-6 md:px-12 bg-gray-100">
      <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-16 max-w-7xl mx-auto">
        <div className="text-center md:text-left">
          <h1 className="lg:text-6xl text-4xl font-bold mb-6">
            Temukan <span className="text-orange-500 underline">Sahabat Baru</span> di Pet Shop Kami!
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Kami menyediakan berbagai hewan peliharaan yang lucu dan sehat, serta perlengkapan dan makanan terbaik untuk mereka.
            Jadikan hari-hari Anda lebih menyenangkan dengan teman berbulu yang setia!
          </p>
          <div className="flex space-x-4 justify-center md:justify-start">
            {!isLoggedIn ? (
              <>
                <button
                  className="flex items-center space-x-2 bg-white text-orange-500 border border-orange-500 hover:bg-orange-100 transition-all py-3 px-6 shadow-lg rounded-full"
                  onClick={() => navigate("/register")}
                >
                  <FaUserPlus size={20} />
                  <span>Daftar</span>
                </button>
                <button
                  className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-700 transition-all py-3 px-6 text-white shadow-lg rounded-full"
                  onClick={() => navigate("/login")}
                >
                  <FaSignInAlt size={20} />
                  <span>Login</span>
                </button>
              </>
            ) : (
            <button
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-700 transition-all py-3 px-6 text-white shadow-lg rounded-full"
              onClick={handleLogout}
            >
              <FaSignOutAlt size={20} className="transform rotate-180" />
              <span>Logout</span>
            </button>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <img src={Pets} alt="Gambar Hewan Peliharaan" className="w-full max-w-md md:max-w-lg" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
