import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'; 
import { toast } from 'react-toastify';
import axios from 'axios'; 
import Logo from "../../../public/logo.png";

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [isLoading, setIsLoading] = useState(false); 

    /*========(Handle Submit Start)============*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:3100/user/registration', {
                name,
                email,
                password,
            });

            if (response.data.message === "Registration successful") {
                toast.success("Registration successful! Please login.");
                setName('');
                setEmail('');
                setPassword('');
            } else {
                toast.error(response.data.message || "Registration failed.");
                console.log(response.data.message);
                
            }
        } catch (error) {
            console.error(error.response.data.message);
            toast.error(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };
    /*========(Handle Submit End)============*/


    return (
        <div
            className="relative"
            style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                backgroundSize: 'cover',
                height: '100vh',
                backgroundPosition: 'center',
            }}
        > 
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 opacity-80 z-0"></div>
             {/* Registration Form Container */}
            <div className="container flex justify-center items-center h-full relative z-10">
                <div className="w-[400px] bg-gradient-to-br from-white to-gray-100 p-8 rounded-2xl shadow-2xl">
                    {/* Header */}
                    <div className="flex justify-center items-center gap-x-2 mb-6">
                        <img src={Logo} alt="Logo" className="w-[60px] h-[60px]" />
                        <h1 className="text-3xl font-bold text-gray-700 font-rubik">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500">
                                TANVIRMOTOR
                            </span>
                        </h1>
                    </div>
                     {/* Form */}
                    <form onSubmit={handleSubmit}>
                         {/* name Field */}
                        <div className="mb-4">
                            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                                <FaUser className="text-gray-500 mr-3" />
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter your name"
                                    className="w-full outline-none text-gray-700"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    aria-label="Full Name"
                                    required
                                />
                            </div>
                        </div>
                         {/* Email Field */}
                        <div className="mb-4">
                            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                                <FaEnvelope className="text-gray-500 mr-3" />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    className="w-full outline-none text-gray-700"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-label="Email Address"
                                    required
                                />
                            </div>
                        </div>
                         {/* Password Field */}
                        <div className="mb-6">
                            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 relative">
                                <FaLock className="text-gray-500 mr-3" />
                                <input
                                    type={showPassword ? 'text' : 'password'} 
                                    id="password"
                                    placeholder="Enter your password"
                                    className="w-full outline-none text-gray-700"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    aria-label="Password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <MdVisibilityOff className="text-gray-500" />
                                    ) : (
                                        <MdVisibility className="text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>
                         {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                            disabled={isLoading}
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-600 mt-4">
                        Already have an account? 
                        <a href="/login" className="text-indigo-500 hover:underline ml-1">Login</a>
                    </p>
                </div>
            </div>
            {/* Registration Form Container */}
        </div>
    );
};

export default Registration;
