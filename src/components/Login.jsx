import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        nama: '',
        email: ''
    });
    const [err, setErr] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/pembeli/login', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            localStorage.setItem("token", response.data.accessToken);
            navigate('/');
        } catch (error) {
            setErr(error.response?.data?.msg || 'Login gagal');
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl text-center font-semibold mb-4">Welcome Back Pembeli Pet Shop</h2>
            {err && <p className="text-red-500 text-sm mb-4">{err}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="text-gray-800 text-sm block">Nama</label>
                    <input
                        name="nama"
                        type="text"
                        required
                        onChange={handleChange}
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-2 rounded-md outline-blue-600"
                        placeholder="Masukkan nama"
                    />
                </div>
                <div>
                    <label className="text-gray-800 text-sm block">Email</label>
                    <input
                        name="email"
                        type="email"
                        required
                        onChange={handleChange}
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-2 rounded-md outline-blue-600"
                        placeholder="Masukkan email"
                    />
                </div>
                <div className="flex space-x-4">
                    <button type="submit" className="flex-1 bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700">
                        Login
                    </button>
                    <button type="button" onClick={handleCancel} className="flex-1 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
