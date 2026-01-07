import { userAuth } from "@/hooks/userAuth";
import type { UserData } from "@/datamodels/UserData";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CACHE_KEY = "user-profile-cache";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

type CachedUser = {
    timestamp: number;
    data: UserData;
};

function getCached(): UserData | null {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;

        const cached: CachedUser = JSON.parse(raw);
        if (Date.now() - cached.timestamp > CACHE_TTL) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }

        return cached.data;
    } catch {
        localStorage.removeItem(CACHE_KEY);
        return null;
    }
}

function setCached(user: UserData) {
    localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ timestamp: Date.now(), data: user })
    );
}

export function userProfileApi() {
    const auth = userAuth();

    async function loadProfile(options?: { force?: boolean }): Promise<UserData> {
        const force = options?.force ?? false;

        if (!force) {
            const cached = getCached();
            if (cached) return cached;
        }

        const user = auth.getCurrentUser();
        if (!user) throw new Error("User not logged in");

        const res = await fetch(`${BASE_URL}/customer/users/me`, {
            headers: {
                Authorization: `Bearer ${user.supabaseAccessToken}`,
                "Content-Type": "application/json",
            },
        });

        const json = await res.json();

        if (!res.ok || !json.success) {
            throw new Error(json.message || "Failed to load user profile");
        }

        /* ================================
         * Merge profile into UserData
         * ================================ */
        const updatedUser: UserData = {
            ...user,
            userType: json.data.user_type,
            epNumber: json.data.ep_number,
            poBoxNumber: json.data.po_box_number,
            role: json.data.role,
            profileImage: json.data.profile_image || null,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        setCached(updatedUser);

        return updatedUser;
    }

    return {
        loadProfile,
    };
}
