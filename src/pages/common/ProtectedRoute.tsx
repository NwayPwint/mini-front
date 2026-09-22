import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/stores/useAuthStore";
import type { UserRole } from "@/types/role";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles && (!user?.role || !allowedRoles.includes(user.role))) {
    if (user?.role === "ADMIN") {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/student/dashboard" replace />;
  }

  return <Outlet />;
}