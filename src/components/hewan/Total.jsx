import React, { useState, useEffect } from "react";
import axios from "axios";

const Total = () => {
  const [hewan, setHewan] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);
  

  useEffect(() => {
    getHewanData();
  }, []);

  const getHewanData = async () => {
    const response = await axios.get("http://localhost:3001/hewan");
    const data = response.data;
    setHewan(data);

    const totalHarga = data.reduce((sum, item) => sum + item.harga, 0);
    setTotalHarga(totalHarga);

  };

  return (
    <div className="container mx-auto px-4 py-8"> 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Hewan</h2>
          <p className="text-4xl font-bold text-blue-600 mt-4">{hewan.length}</p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Harga</h2>
          <p className="text-4xl font-bold text-red-600 mt-4">Rp {totalHarga}</p>
        </div>
      </div>
    </div>
  );
};

export default Total;
