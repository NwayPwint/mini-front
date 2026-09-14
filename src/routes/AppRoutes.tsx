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
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

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
      </Route>

      {/* 404 NotFound Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
