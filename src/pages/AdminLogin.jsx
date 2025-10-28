import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  return <AdminLogin />;
};

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:8000/api/admins/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);

        // ✅ Save admin info in localStorage
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("admin", JSON.stringify(data.data.admin));
        localStorage.setItem("adminId", data.data.admin._id);

        // ✅ Navigate to admin dashboard
        navigate("/advisorregistration");
      } else {
        setErrorMessage(data.message || "Login failed.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4 font-inter">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Left Welcome Section */}
        <div className="hidden lg:flex flex-col justify-center text-white p-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            Welcome Back, Admin!
          </h1>
          <p className="text-lg mb-6">
            Sign in to manage your system efficiently.
          </p>
        </div>

        {/* Right Login Form */}
        <div className="w-full">
          <div className="p-8 space-y-8 bg-white rounded-3xl shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              Admin Login
            </h2>
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="admin@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full px-5 py-3 font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {successMessage && (
                <div className="text-green-600 text-center mt-4">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="text-red-600 text-center mt-4">
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
