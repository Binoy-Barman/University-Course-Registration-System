import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* Logo + University Name */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={assets.logo1} className="h-10" alt="University Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            BBM UNIVERSITY
          </span>
        </Link>

        {/* Right Section (Login Dropdown) */}
        <div className="flex md:order-2 relative" ref={dropdownRef}>
          <button 
            onClick={toggleDropdown}
            type="button" 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            My Profile
            <svg
              className="w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="z-10 absolute right-0 mt-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <Link 
                    to="/adminlogin" 
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Admin Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/advisorlogin" 
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Advisor Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/teacherlogin" 
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Teacher Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/login" 
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Student Login
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col md:flex-row md:space-x-8 font-medium p-4 md:p-0 mt-4 md:mt-0 border md:border-0 border-gray-100 rounded-lg bg-gray-50 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm ${
                    isActive 
                      ? "text-blue-700 dark:text-blue-500 font-semibold" 
                      : "text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to="/department" 
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm ${
                    isActive 
                      ? "text-blue-700 dark:text-blue-500 font-semibold" 
                      : "text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400"
                  }`
                }
              >
                Department
              </NavLink>
            </li>

            <li>
              <NavLink 
                to="/notice" 
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm ${
                    isActive 
                      ? "text-blue-700 dark:text-blue-500 font-semibold" 
                      : "text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400"
                  }`
                }
              >
                Notice
              </NavLink>
            </li>

            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm ${
                    isActive 
                      ? "text-blue-700 dark:text-blue-500 font-semibold" 
                      : "text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400"
                  }`
                }
              >
                Research & Innovation
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;