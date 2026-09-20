import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/common/NotFound";
import Index from "../pages/public/Index";
import Students from "../pages/public/Students";
import Business from "../pages/public/Business";
import Colleges from "../pages/public/Colleges";
import Courses from "../pages/public/Courses";
import Programs from "../pages/public/Programs";
import Certificates from "../pages/public/Certificates";
import DigitalLibrary from "../pages/public/DigitalLibrary";
import PublicLayout from "../components/layout/PublicLayout";
import AdminLayout from "@/components/layout/AdminLayout";
import AdminDashboard from "@/pages/admin/Dashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Profile from "@/pages/auth/Profile";
import MyLearning from "@/pages/student/Learning";
import StudentDashboard from "@/pages/student/Dashboard";
import StudentCertificates from "@/pages/student/Certificates";
import StudentSaved from "@/pages/student/Saved";
import StudentSettings from "@/pages/student/Settings";
import StudentLayout from "@/components/layout/StudentLayout";
import CourseDetail from "@/pages/public/CourseDetail";
import CourseClassroom from "@/pages/student/Classroom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/students" element={<Students />} />
        <Route path="/business" element={<Business />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/digital-library" element={<DigitalLibrary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
      <Route
        path="/student/courses/:slug/learn"
        element={<CourseClassroom />}
      />
      <Route element={<StudentLayout />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/learning" element={<MyLearning />} />
        <Route path="/student/certificates" element={<StudentCertificates />} />
        <Route path="/student/saved" element={<StudentSaved />} />
        <Route path="/student/settings" element={<StudentSettings />} />
      </Route>

      {/* 404 NotFound Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
