import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Ensure this import is present


const AdvisorRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department_id: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/advisors/register",
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          department_id: formData.department_id,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(`✅ ${response.data.message}`);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        department_id: "",
      });
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        "❌ An error occurred. Please try again.";
      setMessage(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-indigo-600 p-4 shadow-md">
  <div className="max-w-7xl mx-auto flex justify-center space-x-4">
    <Link
      to="/advisorregistration"
      className="px-4 py-2 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
    >
      Advisor
    </Link>
    <Link
      to="/admindepartment"
      className="px-4 py-2 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
    >
      Department
    </Link>
    <Link
      to="/admincourse"
      className="px-4 py-2 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
    >
      Course
    </Link>
  <Link
             to="/adminteacher"
             className="px-4 py-2 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
           >
             Teacher
           </Link>

     <Link
             to="/adminnotice"
             className="px-4 py-2 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
           >
             Notice
           </Link>       
  </div>
</nav>

      {/* Registration Form */}
      <div className="flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Advisor Registration
          </h2>

          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="department_id" className="block mb-2 text-sm font-semibold text-gray-700">
                Select Your Department
              </label>
              <select
                id="department_id"
                value={formData.department_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="">----</option>
                <option value="CSE">Computer Science & Engineering</option>
                <option value="EEE">Electrical & Electronic Engineering</option>
                <option value="MAT">Mathematics</option>
                <option value="CE">Civil Engineering</option>
                <option value="ME">Mechanical Engineering</option>
                <option value="BA">Business Administration</option>
                <option value="IT">Information Technology</option>
                <option value="Arch">Architecture</option>
                <option value="ES">Environmental Science</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
              placeholder="john.doe@example.com"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="mb-8">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-semibold text-gray-700">
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl"
          >
            Submit
          </button>

          {message && (
            <p className={`mt-6 text-center font-medium ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdvisorRegistration;