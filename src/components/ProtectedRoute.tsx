import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = localStorage.getItem("user");

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userData);

  // Hanya admin dan staff yang boleh masuk
  if (user.role !== "admin" && user.role !== "staff") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}