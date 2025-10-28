// src/components/AdminNotice.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:8000/api/notices";   // <-- NEW

const AdminNotice = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [notices, setNotices] = useState([]);
  const [message, setMessage] = useState("");

  // ---------- FETCH ----------
  useEffect(() => { fetchNotices(); }, []);

  const fetchNotices = async () => {
    try {
      const { data } = await axios.get(API_BASE);
      setNotices(data.notices || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // ---------- INPUT ----------
  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // ---------- SUBMIT ----------
  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");

    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
      };

      const { data } = await axios.post(API_BASE, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage(`Success: ${data.message}`);
      setFormData({ title: "", description: "" });
      fetchNotices();
    } catch (err) {
      console.error(err);
      const errMsg =
        err.response?.data?.message ||
        "Failed to add notice. Check console.";
      setMessage(`Error: ${errMsg}`);
    }
  };

  // ---------- DELETE ----------
  const handleDelete = async id => {
    if (!window.confirm("Delete this notice?")) return;

    try {
      const { data } = await axios.delete(`${API_BASE}/${id}`);
      setMessage(`Success: ${data.message}`);
      fetchNotices();
    } catch (err) {
      setMessage(`Error: ${err.response?.data?.message || "Delete failed"}`);
    }
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-gray-100">
      {/* ---- NAVBAR ---- */}
      <nav className="bg-indigo-600 p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-center space-x-4">
          {["Advisor", "Department", "Course", "Teacher", "Notice"].map(
            (txt, i) => {
              const path = `/${txt.toLowerCase() === "notice" ? "adminnotice" : "admin" + txt.toLowerCase()}`;
              return (
                <Link
                  key={i}
                  to={path}
                  className={`px-4 py-2 text-white font-semibold rounded-lg transition ${
                    txt === "Notice"
                      ? "bg-indigo-800"
                      : "hover:bg-indigo-700"
                  }`}
                >
                  {txt}
                </Link>
              );
            }
          )}
        </div>
      </nav>

      {/* ---- FORM ---- */}
      <div className="flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl mb-8"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Add Notice
          </h2>

          <div className="grid gap-6 mb-6">
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-semibold text-gray-700">
                Notice Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter notice title"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block mb-2 text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter notice details..."
                rows="5"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition"
          >
            Add Notice
          </button>

          {message && (
            <p
              className={`mt-6 text-center font-medium ${
                message.startsWith("Success:") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>

      {/* ---- LIST ---- */}
      <div className="max-w-4xl mx-auto px-4 pb-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          All Notices
        </h3>

        {notices.length === 0 ? (
          <p className="text-center text-gray-500">No notices available.</p>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <table className="w-full table-auto">
              <thead className="bg-indigo-100 text-indigo-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {notices.map(notice => (
                  <tr key={notice.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {notice.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {notice.title}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(notice.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNotice;