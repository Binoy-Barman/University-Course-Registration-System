import React, { useEffect, useState } from "react";
import axios from "axios";

const Advisor = () => {
  const [students, setStudents] = useState(null);
  const [advisor, setAdvisor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const token = localStorage.getItem("token");
  const advisorData = JSON.parse(localStorage.getItem("advisor"));

  // ================= FETCH STUDENTS =================
  const fetchStudents = async (showLoader = true) => {
    if (!advisorData || !token) return;
    try {
      if (showLoader) setLoading(true);
      else setRefreshing(true);

      const res = await axios.get(
        `http://localhost:8000/api/students?department_id=${advisorData.department_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStudents(res.data.data || []);
      setAdvisor(advisorData);
    } catch (err) {
      console.error("Error fetching students:", err);
      setStudents([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setRefreshing(false);
      }, 300);
    }
  };

  useEffect(() => {
    fetchStudents(true);
  }, []);

  // ================= ADD COURSE =================
  const handleAddCourse = async (studentId, course) => {
    if (!course) return alert("Please enter a course name");
    try {
      const res = await axios.post(
        `http://localhost:8000/api/students/${studentId}/course`,
        { course },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updated = res.data.data;
      setStudents((prev) =>
        prev.map((s) =>
          s.studentId === studentId ? { ...updated, newCourse: "" } : s
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to add course");
    }
  };

  // ================= DELETE COURSE =================
  const handleDeleteCourse = async (studentId, course) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/students/${studentId}/course`,
        {
          data: { course },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updated = res.data.data;
      setStudents((prev) =>
        prev.map((s) => (s.studentId === studentId ? updated : s))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete course");
    }
  };

  // ================= RENDER =================
  if (loading || students === null) {
    return (
      <div style={{ textAlign: "center", padding: "80px" }}>
        <h3>Loading students...</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "20px" }}>
        Advisor Dashboard
      </h1>

      {advisor && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#444",
            fontSize: "18px",
          }}
        >
          <p>
            Welcome, <strong>{advisor.name}</strong> ({advisor.department_id})
          </p>
        </div>
      )}

      {/* REFRESH BUTTON */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => fetchStudents(false)}
          disabled={refreshing}
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: refreshing ? "not-allowed" : "pointer",
          }}
        >
          {refreshing ? "Refreshing..." : "Refresh Students"}
        </button>
      </div>

      {/* STUDENT TABLE */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          padding: "20px",
          position: "relative",
        }}
      >
        {refreshing && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(255,255,255,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              zIndex: 10,
              fontWeight: "bold",
            }}
          >
            Updating...
          </div>
        )}

        <h2 style={{ marginBottom: "15px", color: "#333" }}>Assigned Students</h2>

        {students.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999" }}>
            No students found for your department.
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#e5e7eb" }}>
                <th style={{ padding: "10px" }}>Student ID</th>
                <th style={{ padding: "10px" }}>Name</th>
                <th style={{ padding: "10px" }}>Semester</th>
                <th style={{ padding: "10px" }}>Courses</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} style={{ borderTop: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>{student.studentId || "N/A"}</td>
                  <td style={{ padding: "10px" }}>
                    <strong>{student.name}</strong>
                  </td>
                  <td style={{ padding: "10px" }}>{student.semester || "N/A"}</td>

                  {/* Courses Section */}
                  <td style={{ padding: "10px", verticalAlign: "top" }}>
                    {student.courses && student.courses.length > 0 ? (
                      student.courses.map((course, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "8px",
                          }}
                        >
                          <span style={{ width: "150px" }}>{course}</span>
                          <button
                            onClick={() =>
                              handleDeleteCourse(student.studentId, course)
                            }
                            style={{
                              backgroundColor: "#ef4444",
                              color: "#fff",
                              border: "none",
                              borderRadius: "5px",
                              padding: "5px 10px",
                              cursor: "pointer",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: "#999" }}>No courses yet</p>
                    )}

                    {/* Add New Course */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                        gap: "10px",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="New Course Name"
                        value={student.newCourse || ""}
                        onChange={(e) =>
                          setStudents((prev) =>
                            prev.map((s) =>
                              s.studentId === student.studentId
                                ? { ...s, newCourse: e.target.value }
                                : s
                            )
                          )
                        }
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          padding: "5px",
                          width: "60%",
                        }}
                      />
                      <button
                        onClick={() =>
                          handleAddCourse(student.studentId, student.newCourse)
                        }
                        style={{
                          backgroundColor: "#2563eb",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          padding: "5px 10px",
                          cursor: "pointer",
                        }}
                      >
                        Add Course
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* CHANGE PASSWORD SECTION */}
      <div
        style={{
          maxWidth: "900px",
          margin: "20px auto",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          padding: "20px",
        }}
      >
        <button
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {showPasswordForm ? "Cancel" : "Change Your Password"}
        </button>

        {showPasswordForm && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              if (newPassword !== confirmPassword) {
                alert("❌ New password and confirm password do not match.");
                return;
              }

              try {
                await axios.patch(
                  `http://localhost:8000/api/advisors/${advisorData._id}/password`,
                  { oldPassword, newPassword },
                  { headers: { Authorization: `Bearer ${token}` } }
                );

                alert("✅ Password changed successfully!");
                setShowPasswordForm(false);
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
              } catch (err) {
                console.error("Error changing password:", err);
                const msg =
                  err.response?.data?.message ||
                  "Failed to change password. Check old password.";
                alert(`❌ ${msg}`);
              }
            }}
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <h3
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#1e3a8a",
              }}
            >
              Change Your Password
            </h3>

            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />

            <button
              type="submit"
              style={{
                backgroundColor: "#16a34a",
                color: "#fff",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Advisor;
