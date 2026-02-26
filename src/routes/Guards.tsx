import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../src/store/useAuthStore";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state: any) => state.token);

  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state: any) => state.token);

  if (!token) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
