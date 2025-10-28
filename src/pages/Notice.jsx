import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch notices from backend
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get("http://localhost:8000/api/notices");

        // Map to match expected structure
        const fetchedNotices = response.data.notices.map((n) => ({
          id: n.id,
          title: n.title,
          description: n.description,
          date: new Date(n.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          link: `/notice/${n.id}`, // Dynamic link to detail page (optional)
        }));

        setNotices(fetchedNotices);
      } catch (err) {
        console.error("Failed to fetch notices:", err);
        setError("Failed to load notices. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-8 sm:p-12">
      <div className="max-w-7xl mx-auto py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-900 leading-tight">
            Campus <span className="text-blue-700 block mt-2">Notices & Updates</span>
          </h1>
          <p className="text-gray-700 text-xl leading-relaxed max-w-2xl mx-auto mt-4">
            Stay informed with the latest announcements, important dates, and exciting news from BBM University.
          </p>
        </div>

        {/* Current Notices Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16">
          <h2 className="text-4xl font-bold text-indigo-800 mb-8 text-center">
            Important Announcements
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading notices...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No notices available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-blue-200"
                >
                  <h3 className="text-2xl font-semibold text-indigo-700 mb-2">
                    {notice.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{notice.date}</p>
                  <p className="text-gray-700 text-base mb-4 line-clamp-3">
                    {notice.description}
                  </p>
                  <Link
                    to={notice.link}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* View All Button */}
          <div className="text-center mt-10">
            <Link to="/notice-archive">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-700 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
                View All Notices
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice;