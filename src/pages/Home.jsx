import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-8 sm:p-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 py-12">
        
        {/* Text Section (Reordered for visual flow on larger screens) */}
        <div className="text-center lg:text-left space-y-8 lg:w-1/2 order-2 lg:order-1">
          <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-900 leading-tight">
            Welcome to <span className="text-blue-700 block mt-2">BBM University!</span>
          </h1>
          <p className="text-gray-700 text-xl leading-relaxed max-w-lg mx-auto lg:mx-0">
            Explore a world of academic excellence, innovation, and leadership. 
            Join thousands of students building their future in a nurturing and vibrant campus community.
          </p>
          <Link to="#">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-700 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out transform">
              🎓 Get Started Today
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/graduation-instagram-captions-67d1d0d5baed3.png?crop=0.668xw:1.00xh;0.119xw,0&resize=640:"
            alt="Graduation"
            className="rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500 ease-in-out max-w-md lg:max-w-full"
          />
        </div>
      </div>

      {/* Highlights Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <h3 className="text-2xl font-bold text-indigo-800">20+ Departments</h3>
          <p className="text-gray-600 mt-3 text-lg">Explore diverse academic disciplines tailored for your future.</p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <h3 className="text-2xl font-bold text-indigo-800">Vibrant Campus Life</h3>
          <p className="text-gray-600 mt-3 text-lg">A dynamic hub for culture, sports, and community engagement.</p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <h3 className="text-2xl font-bold text-indigo-800">100+ Expert Faculty</h3>
          <p className="text-gray-600 mt-3 text-lg">Learn from experienced mentors and leading researchers in their fields.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;