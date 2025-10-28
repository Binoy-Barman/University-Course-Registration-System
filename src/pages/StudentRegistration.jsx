import React, { useState } from "react";
import axios from 'axios';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department_id: "", 
    semester: "",
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
    const response = await axios.post("http://localhost:8000/api/students/register", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      department_id: formData.department_id,
      semester: Number(formData.semester),
    });

    setMessage(`✅ ${response.data.message}`);

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      department_id: "",
      semester: "",
    });

  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "❌ An error occurred. Please try again.";
    setMessage(errorMessage);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Student Registration
        </h2>

        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {/* Full Name */}
          <div className="md:col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label
              htmlFor="department_id"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Select Your Department
            </label>
            <select
              id="department_id"
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-white appearance-none"
            >
              <option value="" disabled>----</option>
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

          {/* Semester (1–8) */}
          <div>
            <label
              htmlFor="semester"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Semester
            </label>
            <select
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-white appearance-none"
            >
              <option value="" disabled>----</option>
              {[...Array(8)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            placeholder="john.doe@example.com"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-8">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Submit
        </button>

        {/* Message */}
        {message && (
          <p className={`mt-6 text-center font-medium ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default StudentRegistration;