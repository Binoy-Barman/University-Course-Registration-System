import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './component/Navbar';
import Login from './pages/Login';
import Footer from './component/Footer';

import StudentRegistration from './pages/StudentRegistration';
import Home from './pages/Home';
import Notice from './pages/Notice';
import Advisor from './pages/Advisor';
import StudentDashboard from './pages/StudentDashboard';
import AdvisorLogin from './pages/AdvisorLogin';
import AdvisorRegistration from './pages/AdvisorRegistration';
import AdminLogin from './pages/AdminLogin';
import AdminDepartment from './pages/AdminDepartment';
import Department from './pages/Department';
import AdminCourse from './pages/AdminCourse';
import AdminTeacher from './pages/AdminTeacher';
import TeacherLogin from './pages/TeacherLogin';
import Teacher from './pages/Teacher';
import AdminNotice from './pages/AdminNotice';
const App = () => {
  return (
    <div>
      <Navbar />
    

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/studentRegistration" element={<StudentRegistration />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/advisor" element={<Advisor />} />
        <Route path="/advisorlogin" element={<AdvisorLogin />} />
        <Route path="/advisorregistration" element={<AdvisorRegistration />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindepartment" element={<AdminDepartment />} />
        <Route path="/department" element={<Department />} />
        <Route path="/admincourse" element={<AdminCourse />} />
        <Route path="/adminteacher" element={<AdminTeacher />} />
        <Route path="/teacherlogin" element={<TeacherLogin />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/adminnotice" element={<AdminNotice />} />
        
        
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
