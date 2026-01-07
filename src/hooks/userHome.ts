// src/hooks/userHome.ts
import { userAuth } from "@/hooks/userAuth";

/* ================================
 * Config
 * ================================ */
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}

const CACHE_KEY = "dashboard-home-cache";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/* ================================
 * Types
 * ================================ */
export type Shortcut = {
    title: string;
    isShow: boolean;
    isEnabled: boolean;
};

export type HomeData = {
    appBanners: string[];
    userType: string;
    epNumberStatus: string;
    epNumber: string;
    isLawyer: boolean;

    epWalletShortcut: Shortcut;
    rateCalulateShortCut: Shortcut;
    localDeliveryShortcut: Shortcut;
    internationalShortcut: Shortcut;
    clickShipShortcut: Shortcut;
    instantShortcut: Shortcut;
    iqamaCard: Shortcut;
};

type CachedHome = {
    timestamp: number;
    data: HomeData;
};

/* ================================
 * Cache Helpers
 * ================================ */
function getCachedHome(): HomeData | null {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;

        const parsed = JSON.parse(raw) as CachedHome;

        if (Date.now() - parsed.timestamp > CACHE_TTL) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }

        return parsed.data;
    } catch {
        localStorage.removeItem(CACHE_KEY);
        return null;
    }
}

function setCachedHome(data: HomeData) {
    const payload: CachedHome = {
        timestamp: Date.now(),
        data,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
}

export function clearHomeCache() {
    localStorage.removeItem(CACHE_KEY);
}

/* ================================
 * API
 * ================================ */
export function userHome() {
    const auth = userAuth();

    async function getHome(options?: { force?: boolean }): Promise<HomeData> {
        const force = options?.force ?? false;

        if (!force) {
            const cached = getCachedHome();
            if (cached) return cached;
        }

        const user = auth.getCurrentUser();
        if (!user?.supabaseAccessToken) {
            throw new Error("User not authenticated");
        }

        const res = await fetch(`${BASE_URL}/customer/home`, {
            headers: {
                Authorization: `Bearer ${user.supabaseAccessToken}`,
                "Content-Type": "application/json",
            },
        });

        const json = await res.json();

        if (!res.ok || !json.success) {
            throw new Error(json.message || "Failed to load home data");
        }

        setCachedHome(json.data);
        return json.data;
    }

    return {
        getHome,
        clearHomeCache,
    };
}
