import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminCourse = () => {
  const [addFormData, setAddFormData] = useState({
    course_id: "",
    course_name: "",
    course_content: "",
  });

  const [assignFormData, setAssignFormData] = useState({
    course_id: "",
    teacher_id: "",
  });

  const [unassignFormData, setUnassignFormData] = useState({
    course_id: "",
    teacher_id: "",
  });

  const [addMessage, setAddMessage] = useState("");
  const [assignMessage, setAssignMessage] = useState("");
  const [unassignMessage, setUnassignMessage] = useState("");

  const handleAddChange = (e) => {
    const { id, value } = e.target;
    setAddFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAssignChange = (e) => {
    const { id, value } = e.target;
    setAssignFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleUnassignChange = (e) => {
    const { id, value } = e.target;
    setUnassignFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setAddMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/courses/add", // ✅ course endpoint
        {
          course_id: addFormData.course_id.trim(),
          course_name: addFormData.course_name.trim(),
          course_content: addFormData.course_content.trim(),
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setAddMessage(`✅ ${response.data.message}`);

      setAddFormData({
        course_id: "",
        course_name: "",
        course_content: "",
      });
    } catch (error) {
      console.error("Error adding course:", error);
      const errorMessage =
        error.response?.data?.message ||
        "❌ An error occurred. Please try again.";
      setAddMessage(errorMessage);
    }
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    setAssignMessage("");

    if (!assignFormData.course_id.trim() || !assignFormData.teacher_id.trim()) {
      setAssignMessage("❌ Course ID and Teacher ID are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/assigns",
        {
          course_id: assignFormData.course_id.trim(),
          teacher_id: assignFormData.teacher_id.trim(),
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setAssignMessage(`✅ ${response.data.message}`);

      setAssignFormData({
        course_id: "",
        teacher_id: "",
      });
    } catch (error) {
      console.error("Error assigning course:", error);
      const errorMessage =
        error.response?.data?.message ||
        "❌ An error occurred. Please try again.";
      setAssignMessage(errorMessage);
    }
  };

  const handleUnassignSubmit = async (e) => {
    e.preventDefault();
    setUnassignMessage("");

    if (!unassignFormData.course_id.trim() || !unassignFormData.teacher_id.trim()) {
      setUnassignMessage("❌ Course ID and Teacher ID are required.");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8000/api/assigns/${unassignFormData.teacher_id.trim()}/${unassignFormData.course_id.trim()}`
      );

      setUnassignMessage("✅ Course unassigned from teacher successfully.");
      
      setUnassignFormData({
        course_id: "",
        teacher_id: "",
      });
    } catch (error) {
      console.error("Error unassigning course:", error);
      const errorMessage =
        error.response?.data?.message ||
        "❌ An error occurred. Please try again.";
      setUnassignMessage(errorMessage);
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
            className="px-4 py-2 text-white font-semibold rounded-lg bg-indigo-700 transition duration-300"
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

      <div className="p-4 space-y-8">
        {/* Add Course Form */}
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleAddSubmit}
            className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Add Course
            </h2>

            <div className="grid gap-6 mb-6">
              <div>
                <label
                  htmlFor="course_id"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Course ID
                </label>
                <input
                  type="text"
                  id="course_id"
                  value={addFormData.course_id}
                  onChange={handleAddChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="CSE101"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="course_name"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Course Name
                </label>
                <input
                  type="text"
                  id="course_name"
                  value={addFormData.course_name}
                  onChange={handleAddChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="Introduction to Programming"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="course_content"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Course Content
                </label>
                <textarea
                  id="course_content"
                  value={addFormData.course_content}
                  onChange={handleAddChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter course description or syllabus details..."
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

            {addMessage && (
              <p
                className={`mt-6 text-center font-medium ${
                  addMessage.startsWith("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {addMessage}
              </p>
            )}
          </form>
        </div>

        {/* Assign Course to Teacher Form */}
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleAssignSubmit}
            className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Assign Course to Teacher
            </h2>

            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="course_id"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Course ID
                </label>
                <input
                  type="text"
                  id="course_id"
                  value={assignFormData.course_id}
                  onChange={handleAssignChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="CSE101"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="teacher_id"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Teacher ID
                </label>
                <input
                  type="text"
                  id="teacher_id"
                  value={assignFormData.teacher_id}
                  onChange={handleAssignChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="TEACH001"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl"
            >
              Assign
            </button>

            {assignMessage && (
              <p
                className={`mt-6 text-center font-medium ${
                  assignMessage.startsWith("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {assignMessage}
              </p>
            )}
          </form>
        </div>

        {/* Unassign Teacher from Course Form */}
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleUnassignSubmit}
            className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Unassign Teacher from Course
            </h2>

            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="course_id"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Course ID
                </label>
                <input
                  type="text"
                  id="course_id"
                  value={unassignFormData.course_id}
                  onChange={handleUnassignChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="CSE101"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="teacher_id"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Teacher ID
                </label>
                <input
                  type="text"
                  id="teacher_id"
                  value={unassignFormData.teacher_id}
                  onChange={handleUnassignChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="TEACH001"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl"
            >
              Unassign
            </button>

            {unassignMessage && (
              <p
                className={`mt-6 text-center font-medium ${
                  unassignMessage.startsWith("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {unassignMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
    
  );
};

export default AdminCourse;