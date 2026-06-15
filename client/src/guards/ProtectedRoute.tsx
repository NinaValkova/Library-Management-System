import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface Props {
  roles?: string[];
}

export default function ProtectedRoute({ roles }: Props) {
  const { isAuthenticated, auth } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && (!auth.user || !roles.includes(auth.user.role))) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}