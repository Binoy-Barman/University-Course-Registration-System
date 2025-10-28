import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-10">
      <div className="mx-auto w-full max-w-screen-xl p-6 lg:py-8">
        
        {/* Top Section */}
        <div className="md:flex md:justify-between">
          
          {/* Logo + University Name */}
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img src={assets.logo1} className="h-10 me-3" alt="University Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                BBM University
              </span>
            </a>
          </div>
          
          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            
            {/* Contact */}
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Contact
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-2">📧 bbm.university.rpgmail.com</li>
                <li>📞 +88015XXXXXXXX</li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Quick Links
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-2">
                  <a href="/about" className="hover:underline">About Us</a>
                </li>
                <li className="mb-2">
                  <a href="/admissions" className="hover:underline">Admissions</a>
                </li>
                <li>
                  <a href="/departments" className="hover:underline">Departments</a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-2">
                  <a href="/privacy" className="hover:underline">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms" className="hover:underline">Terms & Conditions</a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700" />

        {/* Bottom Section */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()} BBM University. All Rights Reserved.
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Developed by <a href="mailto:bbinoy318@gmail.com" className="hover:underline">Binoy</a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
