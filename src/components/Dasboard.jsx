import React from 'react'
import { Link } from 'react-router-dom';

const Dasboard = () => {
  return (

      <div className="w-64 bg-blue-800 text-white">
        <div className="p-6 text-center text-xl font-bold border-b border-blue-700">PetShop</div>
        <ul className="mt-6">
          <li className="p-3 hover:bg-blue-700">
            <Link to="/pembeli" className="block text-white">Data Pembeli</Link>
          </li>
          <li className="p-3 hover:bg-blue-700">
            <Link to="/hewan" className="block text-white">Data Hewan</Link>
          </li>
          <li className="p-3 hover:bg-blue-700">
            <Link to="/pakan " className="block text-white">Data Pakan</Link>
          </li>
          <li className="p-3 hover:bg-blue-700">
            <Link to="/trans" className="block text-white">Data Transaksi</Link>
          </li>
          
        </ul>
      </div>
  )
}

export default Dasboard