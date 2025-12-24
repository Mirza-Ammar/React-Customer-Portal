import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function RequireAuth() {
    const auth = useAuth();
    const user = auth.getCurrentUser();

    // ❌ Not logged in → go to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // ✅ Logged in → allow access
    return <Outlet />;
}
