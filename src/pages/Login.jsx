import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';





const App = () => {
  return <Login />;
};

function Login() {
  // State for form inputs, messages, and loading status
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:8000/api/students/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
  setSuccessMessage(data.message);
  console.log("Login successful! Token:", data.data.token);
  console.log("Student Data:", data.data.student);

  // Save token & student data if needed
  
  // Save token
  localStorage.setItem("token", data.data.token);

  // Save full student object
  localStorage.setItem("student", JSON.stringify(data.data.student));

  // Save studentId separately (easier to fetch profile later)
  localStorage.setItem("studentId", data.data.student.studentId);

  // Redirect to student dashboard
  navigate('/StudentDashboard');
}
 else {
        // Handle login errors from the API
        setErrorMessage(data.message || 'An unknown error occurred.');
      }
    } catch (error) {
      // Handle network errors
      setErrorMessage('Failed to connect to the server. Please check the network.');
      console.error('Fetch failed:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4 font-inter">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Left Welcome Section */}
        <div className="hidden lg:flex flex-col justify-center text-white p-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none mb-4">
            Welcome Back!
          </h1>
          <p className="text-lg font-normal mb-6">
            Sign in to continue your journey with us.
          </p>
          <a href="#" className="font-medium text-lg inline-flex items-center text-white hover:underline transition-transform duration-300 hover:translate-x-1">
            Learn More
            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </a>
        </div>
        
        {/* Right Login Form */}
        <div className="w-full">
          <div className="p-8 space-y-8 bg-white rounded-3xl shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              Login to your Account
            </h2>
            <form className="space-y-6" onSubmit={handleLogin}>
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" name="remember" type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded-sm focus:ring-indigo-500" />
                  </div>
                  <div className="ms-3 text-gray-500">
                    <label htmlFor="remember">Remember this device</label>
                  </div>
                </div>
                <a href="#" className="font-medium text-indigo-600 hover:underline">Lost Password?</a>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-5 py-3 font-bold text-center text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition duration-300 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              {/* Message Display Area */}
              {successMessage && (
                <div className="text-green-600 text-center font-medium mt-4">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="text-red-600 text-center font-medium mt-4">
                  {errorMessage}
                </div>
              )}

              <div className="text-sm font-medium text-gray-500 text-center">
                Not registered yet? <a href='/studentRegistration' className="text-indigo-600 hover:underline">Create account</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
