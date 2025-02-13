import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-orange-500 text-black text-center p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">Ini Toko Kami</h2>
          <p className="text-sm">&copy; {new Date().getFullYear()} Petshop. All rights reserved.</p>
        </div>

        <div className="mb-4 md:mb-0 w-full md:w-1/2">
          <iframe
            title="Google Maps"
            width="100%"
            height="200"
            className="rounded-lg shadow-md"
            src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Jl.h.Jamat%20Gg%20Rais+()&t=&z=14&ie=UTF8&iwloc=B&output=embed"
          ></iframe>
        </div>

        <div className="flex space-x-4">
          <a href="#" className="text-xl hover:text-white">
            <FaFacebook />
          </a>
          <a href="#" className="text-xl hover:text-white">
            <FaInstagram />
          </a>
          <a href="#" className="text-xl hover:text-white">
            <FaTwitter />
          </a>
        </div>
      </div>

      <div className="mt-4 flex justify-center space-x-6 text-sm">
        <a href="#" className="hover:underline">Tentang Kami</a>
        <a href="#" className="hover:underline">Kontak</a>
        <a href="#" className="hover:underline">Kebijakan Privasi</a>
      </div>
    </footer>
  );
};

export default Footer;
