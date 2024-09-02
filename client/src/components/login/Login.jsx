import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils/sucAnderr';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const navigate = useNavigate();
    const [val, setVal] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false); 

    const handleChange = (e) => {
        setVal({ ...val, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password,  } = val;

        if (!email || !password) {
            return handleError('Email and password are required');
        }

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', val);
            const { success, jwtToken, message, id} = response.data;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('id',id);
                setVal({
                    email: '',
                    password: ''
                });
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            handleError(errorMessage);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="me-10">
                    <h1 className="text-2xl">Do what you want and create your own identity...</h1>
                    <h1 className="text-4xl text-center font-bold">Labour Help</h1>
                </div>
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">Log In</h1>
                    <hr /><br />
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                value={val.email}
                                onChange={handleChange}
                                type="email"
                                name="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                value={val.password}
                                onChange={handleChange}
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                                placeholder="Enter your password"
                                required
                            />
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 mt-5 flex items-center px-3 text-gray-600 cursor-pointer"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Log In
                        </button>
                    </form>
                    <div className="mt-6 text-center text-sm text-gray-600">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-700">Forgot Password?</a>
                    </div>
                    <div className="mt-6 text-center text-sm text-gray-600">
                        <p>Don't have an account? <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-700">Sign Up</Link></p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Login;
