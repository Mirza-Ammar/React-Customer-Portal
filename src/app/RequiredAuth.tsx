import { Navigate, Outlet } from "react-router-dom";
import { userAuth } from "@/hooks/userAuth";

export default function RequireAuth() {
    const auth = userAuth();
    const user = auth.getCurrentUser();

    // ❌ Not logged in → go to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // ✅ Logged in → allow access
    return <Outlet />;
}
