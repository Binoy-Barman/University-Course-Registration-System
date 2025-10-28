import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDepartment = () => {
  const [formData, setFormData] = useState({
    department_id: "",
    department_name: "",
    image_link: "",
    description: "",
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

    try {
      const response = await axios.post(
        "http://localhost:8000/api/departments/add", // ✅ make sure correct endpoint
        {
          department_id: formData.department_id.trim(),
          department_name: formData.department_name.trim(),
          image_link: formData.image_link.trim(),
          description: formData.description.trim(),
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(`✅ ${response.data.message}`);

      // Reset form
      setFormData({
        department_id: "",
        department_name: "",
        image_link: "",
        description: "",
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

      {/* Department Form */}
      <div className="flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Add Department
          </h2>

          <div className="grid gap-6 mb-6">
            {/* Department ID */}
            <div>
              <label
                htmlFor="department_id"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Department ID
              </label>
              <input
                type="text"
                id="department_id"
                value={formData.department_id}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                placeholder="CSE101"
                required
              />
            </div>

            {/* Department Name */}
            <div>
              <label
                htmlFor="department_name"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Department Name
              </label>
              <input
                type="text"
                id="department_name"
                value={formData.department_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                placeholder="Computer Science & Engineering"
                required
              />
            </div>

            {/* Image Link */}
            <div>
              <label
                htmlFor="image_link"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Image Link
              </label>
              <input
                type="url"
                id="image_link"
                value={formData.image_link}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                placeholder="https://example.com/department-image.jpg"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Department Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe the department..."
                rows="5"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl"
          >
            Submit
          </button>

          {message && (
            <p
              className={`mt-6 text-center font-medium ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminDepartment;
