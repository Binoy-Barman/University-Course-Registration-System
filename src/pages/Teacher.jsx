import React, { useEffect, useState } from "react";
import axios from "axios";

const Teacher = () => {
  const [students, setStudents] = useState(null);
  const [results, setResults] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [tempResults, setTempResults] = useState({});

  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const token = localStorage.getItem("token");
  const teacherData = JSON.parse(localStorage.getItem("teacher"));

  // ================= FETCH STUDENTS =================
  const fetchStudents = async (showLoader = true) => {
    if (!teacherData || !token) return;
    try {
      if (showLoader) setLoading(true);
      else setRefreshing(true);

      const res = await axios.get(
        `http://localhost:8000/api/students`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStudents(res.data.data || []);
      setTeacher(teacherData);
    } catch (err) {
      console.error("Error fetching students:", err);
      setStudents([]);
    }
  };

  // ================= FETCH RESULTS =================
  const fetchResults = async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        `http://localhost:8000/api/results`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setResults(res.data.data || []);
    } catch (err) {
      console.error("Error fetching results:", err);
      setResults([]);
    }
  };

// ================= FETCH ASSIGNED COURSES =================
const fetchAssignedCourses = async () => {
  if (!teacherData?._id || !token) return;

  try {
    const response = await axios.get(
      `http://localhost:8000/api/assigns`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { teacher_id: teacherData._id }
      }
    );

    const fetchedCourses = response.data?.data || [];
    setAssignedCourses(fetchedCourses);

    // Auto-select the first course if none selected and list is not empty
    if (fetchedCourses.length > 0 && !selectedCourseId) {
      setSelectedCourseId(fetchedCourses[0].course_id);
    }
  } catch (error) {
    console.error("Error fetching assigned courses:", error);
    setAssignedCourses([]);
  }
};

  // ================= FETCH DATA =================
  const fetchData = async (showLoader = true) => {
    await Promise.all([fetchStudents(showLoader), fetchResults(), fetchAssignedCourses()]);
    setTimeout(() => {
      setLoading(false);
      setRefreshing(false);
    }, 300);
  };

  useEffect(() => {
    fetchData(true);
  }, []);

  // ================= SAVE RESULT =================
  const handleSaveResult = async (studentId, value) => {
    if (!value || value < 0 || value > 100) {
      alert("Result must be a number between 0 and 100.");
      return;
    }

    if (!selectedCourseId) {
      alert("Please select a course first.");
      return;
    }

    const courseId = selectedCourseId;
    const existingResult = results.find(
      (r) => r.student_id === studentId && r.course_id === courseId
    );

    try {
      if (existingResult) {
        await axios.patch(
          `http://localhost:8000/api/results/${studentId}/${courseId}`,
          { result: value },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `http://localhost:8000/api/results`,
          { student_id: studentId, course_id: courseId, result: value },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Clear temp value
      const key = `${studentId}-${courseId}`;
      setTempResults((prev) => {
        const newTemp = { ...prev };
        delete newTemp[key];
        return newTemp;
      });

      // Refetch results
      await fetchResults();
      alert("Result saved successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save result.");
    }
  };

  // ================= DELETE RESULT =================
  const handleDeleteResult = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this result?")) return;

    if (!selectedCourseId) {
      alert("Please select a course first.");
      return;
    }

    const courseId = selectedCourseId;

    try {
      await axios.delete(
        `http://localhost:8000/api/results/${studentId}/${courseId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Clear temp value if any
      const key = `${studentId}-${courseId}`;
      setTempResults((prev) => {
        const newTemp = { ...prev };
        delete newTemp[key];
        return newTemp;
      });

      // Refetch results
      await fetchResults();
      alert("Result deleted successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete result.");
    }
  };

  // Filter students based on selected course
  const filteredStudents = students ? students.filter((student) =>
    student.courses && student.courses.includes(selectedCourseId)
  ) : [];

  // Filter results for selected course
  const filteredResults = results.filter((r) => r.course_id === selectedCourseId);

  // ================= RENDER =================
  if (loading || students === null) {
    return (
      <div style={{ textAlign: "center", padding: "80px" }}>
        <h3>Loading students...</h3>
      </div>
    );
  }

  if (assignedCourses.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px" }}>
        <h3>No courses assigned to you.</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "20px" }}>
        Teacher Dashboard
      </h1>

      {teacher && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#444",
            fontSize: "18px",
          }}
        >
          <p>
            Welcome, <strong>{teacher.name}</strong> ({teacher.department_id})
          </p>
        </div>
      )}

      {/* COURSE DROPDOWN */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label style={{ marginRight: "10px", fontWeight: "bold" }}>Select Course: </label>
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        >
          <option value="">-- Select a Course --</option>
          {assignedCourses.map((course) => (
            <option key={course._id} value={course.course_id}>
              {course.course_id}
            </option>
          ))}
        </select>
      </div>

      {/* REFRESH BUTTON */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => fetchData(false)}
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
          {refreshing ? "Refreshing..." : "Refresh Data"}
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

        <h2 style={{ marginBottom: "15px", color: "#333" }}>
          Students Enrolled in {selectedCourseId ? `"${assignedCourses.find(c => c.course_id === selectedCourseId)?.name || selectedCourseId}"` : "Selected Course"}
        </h2>

        {selectedCourseId === "" ? (
          <p style={{ textAlign: "center", color: "#999" }}>
            Please select a course to view enrolled students.
          </p>
        ) : filteredStudents.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999" }}>
            No students enrolled in the selected course.
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#e5e7eb" }}>
                <th style={{ padding: "10px" }}>Student ID</th>
                <th style={{ padding: "10px" }}>Name</th>
                <th style={{ padding: "10px" }}>Semester</th>
                <th style={{ padding: "10px" }}>Result for {selectedCourseId}</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const courseId = selectedCourseId;
                const existingResult = filteredResults.find(
                  (r) => r.student_id === student.studentId && r.course_id === courseId
                );
                const key = `${student.studentId}-${courseId}`;
                const tempValue = tempResults[key] !== undefined 
                  ? tempResults[key] 
                  : (existingResult ? existingResult.result : "");

                return (
                  <tr key={student._id} style={{ borderTop: "1px solid #ddd" }}>
                    <td style={{ padding: "10px" }}>{student.studentId || "N/A"}</td>
                    <td style={{ padding: "10px" }}>
                      <strong>{student.name}</strong>
                    </td>
                    <td style={{ padding: "10px" }}>{student.semester || "N/A"}</td>

                    {/* Result Section for Selected Course */}
                    <td style={{ padding: "10px", verticalAlign: "top" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "8px",
                        }}
                      >
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={tempValue}
                          onChange={(e) =>
                            setTempResults({
                              ...tempResults,
                              [key]: e.target.value === "" ? "" : Number(e.target.value),
                            })
                          }
                          placeholder={existingResult ? "" : "Enter result"}
                          style={{
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            padding: "5px",
                            width: "80px",
                          }}
                        />
                        <button
                          onClick={() => handleSaveResult(student.studentId, tempValue)}
                          disabled={!tempValue || tempValue < 0 || tempValue > 100}
                          style={{
                            backgroundColor: "#2563eb",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            cursor: tempValue && tempValue >= 0 && tempValue <= 100 ? "pointer" : "not-allowed",
                          }}
                        >
                          Save
                        </button>
                        {existingResult && (
                          <button
                            onClick={() => handleDeleteResult(student.studentId)}
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
                        )}
                        {existingResult && (
                          <span style={{ color: "#10b981", fontWeight: "bold" }}>
                            Current: {existingResult.result}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
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
                  `http://localhost:8000/api/teachers/${teacherData._id}/password`,
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

export default Teacher;