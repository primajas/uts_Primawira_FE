import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">PetShop</h1>
        <ul className="flex space-x-4">
          <li><a href="#" className="text-white">Home</a></li>
          <li><a href="#" className="text-white">Data Pembeli</a></li>
          <li><a href="#" className="text-white">Data Hewan</a></li>
          <li><a href="#" className="text-white">Data Pakan</a></li>
          <li><a href="#" className="text-white">Data Transaksi</a></li>
          {/* <li><a href="#" className="text-white">Kontak</a></li> */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;