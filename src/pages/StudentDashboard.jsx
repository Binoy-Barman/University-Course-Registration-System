import React, { useState, useEffect } from "react";

// =================== MAIN APP ===================
const App = () => {
  const [student, setStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState("dashboard");

  // Get logged-in student ID from localStorage after login
  const studentId = JSON.parse(localStorage.getItem("student"))?.studentId;

  useEffect(() => {
    const fetchStudent = async () => {
      if (!studentId) return;

      try {
        const res = await fetch(`http://localhost:8000/api/students/${studentId}`);
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorText}`);
        }

        const apiRes = await res.json();
        setStudent(apiRes.data);
      } catch (err) {
        console.error("Error fetching student:", err);
      }
    };

    fetchStudent();
  }, [studentId]);

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <StudentDashboard student={student} setCurrentPage={setCurrentPage} />;
      case "settings":
        return <ProfileSettings student={student} setCurrentPage={setCurrentPage} />;
      case "results":
        return <StudentResults student={student} setCurrentPage={setCurrentPage} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-8 sm:p-12 font-sans">
      <div className="max-w-7xl mx-auto">{renderContent()}</div>
    </div>
  );
};

// =================== STUDENT DASHBOARD ===================
const StudentDashboard = ({ student, setCurrentPage }) => {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!student || !student.courses || student.courses.length === 0) {
        setLoadingCourses(false);
        return;
      }

      try {
        const promises = student.courses.map(async (courseId) => {
          const res = await fetch(`http://localhost:8000/api/courses/${courseId}`);
          if (!res.ok) throw new Error(`Failed to fetch course ${courseId}`);
          return await res.json();
        });

        const courseData = await Promise.all(promises);
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, [student]);

  if (!student)
    return <div className="p-10 text-center text-gray-600">Loading Dashboard...</div>;

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl shadow-xl p-6 mb-12">
        <div className="flex items-center space-x-6">
          <img
            src={
              student.profilePic ||
              "https://placehold.co/150x150/e0e7ff/4338ca?text=Profile"
            }
            alt="Student Profile"
            className="w-24 h-24 rounded-full border-4 border-indigo-300 shadow-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/150x150/e0e7ff/4338ca?text=Profile";
            }}
          />
          <div>
            <h1 className="text-4xl font-extrabold text-indigo-800">
              Welcome, {student.name}!
            </h1>
            <p className="text-gray-600 text-lg mt-1">
              Student ID:{" "}
              <span className="font-semibold">{student.studentId}</span> | Major:{" "}
              <span className="font-semibold">{student.department_id}</span>
            </p>
            <p className="text-gray-600 text-lg mt-1">
              Advisor:{" "}
              <span className="font-semibold">
                {student.advisor
                  ? `${student.advisor.name} (${student.advisor.email})`
                  : "Not yet assigned"}
              </span>
            </p>
          </div>
        </div>
        <div className="mt-6 md:mt-0 space-x-4">
          <button
            onClick={() => setCurrentPage("results")}
            className="px-6 py-3 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition-colors"
          >
            📊 View Results
          </button>

          <button
            onClick={() => setCurrentPage("settings")}
            className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors"
          >
            ⚙️ Profile Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">
          My Assigned Courses
        </h2>

        {loadingCourses ? (
          <p className="text-gray-500">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-500">No assigned courses yet.</p>
        ) : (
          <div className="space-y-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-semibold text-blue-700">
                    {course.course_name}
                  </h3>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {course.course_id}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{course.course_content}</p>
                <p className="text-gray-500 text-sm">
                  Semester: {student.semester || "Unknown"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

/// =================== STUDENT RESULTS ===================
const StudentResults = ({ student, setCurrentPage }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!student) return;

      try {
        const res = await fetch(`http://localhost:8000/api/results/student/${student.studentId}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setResults(data.data.results || []);
        } else {
          console.error("Error:", data.message);
        }
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [student]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-10">
      <h1 className="text-3xl font-bold text-indigo-800 mb-6">📊 My Results</h1>

      {loading ? (
        <p className="text-gray-500">Loading results...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-500">No results found.</p>
      ) : (
        <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-indigo-100">
            <tr>
              <th className="py-3 px-4 text-left text-indigo-800 font-semibold">Course ID</th>
              <th className="py-3 px-4 text-left text-indigo-800 font-semibold">Marks</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, index) => (
              <tr
                key={index}
                className="border-t hover:bg-indigo-50 transition-colors"
              >
                <td className="py-3 px-4">{r.course_id || "N/A"}</td>
                <td className="py-3 px-4">{r.result ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        onClick={() => setCurrentPage("dashboard")}
        className="mt-8 px-6 py-3 bg-gray-400 text-white rounded-full shadow-md hover:bg-gray-500 transition-colors"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

// =================== PROFILE SETTINGS ===================
const ProfileSettings = ({ student, setCurrentPage }) => {
  const [email, setEmail] = useState(student?.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (student) setEmail(student.email);
  }, [student]);

  const handleUpdate = async () => {
    if (!student) return;

    try {
      const res = await fetch(`http://localhost:8000/students/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ email, currentPassword: password }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div className="p-10 text-center bg-white rounded-xl shadow-xl">
      <h1 className="text-3xl font-bold text-indigo-800 mb-4">Profile Settings</h1>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="New Email"
        className="border p-2 rounded mb-4 w-full"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Current Password"
        className="border p-2 rounded mb-4 w-full"
      />

      <button
        onClick={handleUpdate}
        className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors"
      >
        Update Profile
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}

      <button
        onClick={() => setCurrentPage("dashboard")}
        className="mt-6 px-6 py-3 bg-gray-400 text-white rounded-full shadow-md hover:bg-gray-500 transition-colors"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default App;
