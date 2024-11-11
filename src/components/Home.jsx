import React from 'react';
import Features from './Fitur';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
// import HewanList from './hewan/HewanList.jsx';
// import Dashboard from './hewan/Total.jsx';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow">

    <section className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our PetShop</h1>
        <p className="text-lg mb-6">We provide the best services to help you grow your business.</p>
        <Link to="/login" className="bg-blue-600 text-white py-3 px-6 rounded-lg">Login/Regis</Link>
      </div> 
    </section>
      <Features />
    </main>
  </div>
  );
}

export default Home;
