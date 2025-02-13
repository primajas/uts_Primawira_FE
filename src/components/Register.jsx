import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
        nama: ''
    });
    const [err, setErr] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/pembeli/create', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate('/');
        } catch (error) {
            setErr(error.response?.data?.msg || 'Register gagal');
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Welcome</h2>
            {err && <p className="text-red-500 text-sm mb-4">{err}</p>}
            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label className="text-gray-800 text-sm block">User Name</label>
                    <input
                        name="nama"
                        type="text"
                        required
                        onChange={handleChange}
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-2 rounded-md outline-blue-600"
                        placeholder="Enter user name"
                    />
                </div>
                <div>
                    <label className="text-gray-800 text-sm block">Email</label>
                    <input
                        name="email"
                        type="text"
                        required
                        onChange={handleChange}
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-2 rounded-md outline-blue-600"
                        placeholder="Enter email"
                    />
                </div>
                <div>
                    <label className="text-gray-800 text-sm block">Password</label>
                    <input
                        name="password"
                        type="password"
                        required
                        onChange={handleChange}
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-2 rounded-md outline-blue-600"
                        placeholder="Enter password"
                    />
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="w-1/2 bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 mr-2">
                        Register
                    </button>
                    <button type="button" onClick={() => navigate('/')} className="w-1/2 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
