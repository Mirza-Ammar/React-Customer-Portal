import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function GuestOnly() {
    const auth = useAuth();
    const user = auth.getCurrentUser();

    // ✅ Already logged in → go to dashboard
    if (user) {
        return <Navigate to="/app" replace />;
    }

    // ❌ Not logged in → allow login page
    return <Outlet />;
}
