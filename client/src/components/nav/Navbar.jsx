import React, { useState, useEffect } from 'react';
import { CgProfile } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';
import { handleSuccess } from '../../utils/sucAnderr';

const Navbar = () => {
    // profile
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

    const handleClickOutside = (event) => {
        if (event.target.closest('#profile-menu')) return;
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    // profileEnd----------------------------------

    // logout
    let navigate = useNavigate();
    const handleLogOut = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        handleSuccess('User Logout');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };
    // logoutEnd---------------------------

    return (
        <nav className="bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img
                        src="https://imgs.search.brave.com/2rSAzaJfqjulzjG3mlvtaBpnns7dhGIMhSWuZt6WVmw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzRiLzI2/L2ZiLzRiMjZmYjU2/NDEyYjc3MjZkY2M3/ZmU3MjdmNTM4NTRl/LmpwZw"
                        className="h-8 w-8 rounded-full border border-gray-300 mr-1"
                        alt="Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Labour Help
                    </span>
                </Link>
                <div
                    id="mega-menu-full"
                    className="hidden w-full md:flex md:w-auto md:order-1"
                >
                    <ul className="flex flex-wrap items-center space-x-4 md:space-x-8 text-gray-900 dark:text-white">
                        <li>
                            <Link to="/dashboard" className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:text-blue-500">Home</Link>
                        </li>
                        {/* <li>
                            <Link  className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:text-blue-500">Profile</Link>
                        </li> */}
                        <li className="relative">
                            <button onClick={toggleDropdown} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                                <CgProfile className="text-xl text-gray-700 dark:text-gray-300" />
                            </button>
                            {isDropdownOpen && (
                                <div id="profile-menu" className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                                    <ul className="py-1">
                                        <li>
                                            <Link to="/account" className="w-full text-left block px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">Account</Link>
                                        </li>
                                        <li>
                                            <Link to="/setting" className="w-full text-left block px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">Term & Conditions</Link>
                                        </li>
                                        <li>
                                            <button onClick={handleLogOut} className="w-full text-left block px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
