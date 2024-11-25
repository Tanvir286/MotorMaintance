import React from 'react';
import Logo from "../../../public/logo.png";
import { FaHome, FaUsers, FaCog, FaSignOutAlt, FaChartLine, FaTools } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div className="flex ">

           <div className="w-[25%] bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 text-white flex flex-col">
                {/* Logo and Header */}
                <div className="p-6 flex items-center gap-x-3">
                    <img src={Logo} alt="Logo" className="w-[60px] h-[60px] rounded-full" />
                    <h1 className="text-2xl font-bold">
                        <span className="text-white">TANVIRMOTOR</span>
                    </h1>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-y-6 mt-8">
                    <a
                        href="#"
                        className="flex items-center gap-x-4 px-6 py-3 text-lg font-medium hover:bg-white hover:text-indigo-600 transition-all rounded-xl"
                    >
                        <FaHome className="text-xl" />
                        Dashboard
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-x-4 px-6 py-3 text-lg font-medium hover:bg-white hover:text-indigo-600 transition-all rounded-xl"
                    >
                        <FaUsers className="text-xl" />
                        Manage Users
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-x-4 px-6 py-3 text-lg font-medium hover:bg-white hover:text-indigo-600 transition-all rounded-xl"
                    >
                        <FaChartLine className="text-xl" />
                        Analytics
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-x-4 px-6 py-3 text-lg font-medium hover:bg-white hover:text-indigo-600 transition-all rounded-xl"
                    >
                        <FaTools className="text-xl" />
                        Tools
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-x-4 px-6 py-3 text-lg font-medium hover:bg-white hover:text-indigo-600 transition-all rounded-xl"
                    >
                        <FaCog className="text-xl" />
                        Settings
                    </a>
                </nav>

                {/* Logout */}
                <div className="mt-auto mb-8">
                    <a
                        href="#"
                        className="flex items-center gap-x-4 px-6 py-3 text-lg font-medium hover:bg-white hover:text-indigo-600 transition-all rounded-xl"
                    >
                        <FaSignOutAlt className="text-xl" />
                        Logout
                    </a>
                </div>
            </div>
           
            <div className="w-[75%]">
                <Outlet />
            </div>
          
        </div>
    );
};

export default Root;
