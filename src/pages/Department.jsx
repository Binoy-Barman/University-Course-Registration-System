import React, { useEffect, useState } from "react";
import axios from "axios";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/departments/all");
        setDepartments(response.data);
     } catch (error) {
  console.error("Error fetching departments:", error);

  // Check if server returned a response
  if (error.response) {
    setError(`❌ ${error.response.data.message || "Server error occurred."}`);
  } else if (error.request) {
    setError("❌ No response from server. Please check your connection.");
  } else {
    setError(`❌ ${error.message}`);
  }
} finally {
  setLoading(false);
}

    };

    fetchDepartments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700">
        Our Departments
      </h1>

      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading departments...</p>
      ) : error ? (
        <p className="text-center text-red-600 text-lg">{error}</p>
      ) : departments.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No departments found.</p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => (
            <div
              key={dept._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
            >
              <img
                src={dept.image_link}
                alt={dept.department_name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {dept.department_name}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {dept.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Department;
