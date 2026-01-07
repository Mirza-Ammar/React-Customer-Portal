import { Navigate, Outlet } from "react-router-dom";
import { userAuth } from "@/hooks/userAuth";

export default function GuestOnly() {
    const auth = userAuth();
    const user = auth.getCurrentUser();

    // ✅ Already logged in → go to dashboard
    if (user) {
        return <Navigate to="/app" replace />;
    }

    // ❌ Not logged in → allow login page
    return <Outlet />;
}
