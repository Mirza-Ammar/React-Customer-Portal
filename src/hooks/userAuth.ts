import type { Branch } from "@/datamodels/BranchData";
import type { UserData } from "@/datamodels/UserData";
import { supabase } from "@/lib/supabase";
import { jwtDecode } from "jwt-decode";

/* ================================
 * Config
 * ================================ */
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}

/* ================================
 * Types
 * ================================ */
type BackendJwtPayload = {
    data: string;
};

/* ================================
 * Helpers
 * ================================ */

// Backend JWT encodes Supabase password in `data`
function getSupabasePasswordFromToken(token: string): string {
    try {
        const decoded = jwtDecode<BackendJwtPayload>(token);

        if (!decoded?.data) {
            throw new Error("JWT missing data field");
        }

        return decoded.data;
    } catch (e) {
        console.error("[Auth] Failed to decode backend JWT", e);
        throw e;
    }
}

/* ================================
 * Auth API
 * ================================ */
export function userAuth() {

    async function sendOtp(params: {
        phoneNumber: string;
        countryCode: string;
        sendSms?: boolean;
        sessionId?: string;
    }) {
        try {
            const res = await fetch(`${BASE_URL}/customer/auth/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phoneNumber: params.phoneNumber,
                    countryCode: params.countryCode,
                    sendSms: params.sendSms ?? false,
                    sessionId: params.sessionId ?? Date.now().toString(),
                }),
            });

            const json = await res.json();

            if (!res.ok || !json.success) {
                throw new Error(json.message || "Failed to send OTP");
            }

            return json;
        } catch (e) {
            console.error("[Auth] sendOtp failed", e);
            throw e;
        }
    }

    async function verifyOtp(params: {
        phoneNumber: string;
        countryCode: string;
        otp: string;
    }): Promise<UserData> {
        try {
            /* 1️⃣ Verify OTP with backend */
            const res = await fetch(`${BASE_URL}/customer/auth/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(params),
            });

            const json = await res.json();

            if (!res.ok || !json.success) {
                throw new Error(json.message || "Invalid OTP");
            }

            const backendToken: string = json.data.token;
            const userId: string = json.data.id;

            /* 2️⃣ Prepare Supabase credentials */
            const supabasePhone = `${params.countryCode}${params.phoneNumber}`;
            const supabasePassword =
                getSupabasePasswordFromToken(backendToken);

            /* 3️⃣ Sign in to Supabase (matches Flutter flow) */
            const signIn = await supabase.auth.signInWithPassword({
                phone: supabasePhone,
                password: supabasePassword,
            });

            if (signIn.error || !signIn.data.session) {
                throw new Error("Supabase authentication failed");
            }

            const session = signIn.data.session;

            /* 4️⃣ Persist user session */
            const user: UserData = {
                id: userId,
                phoneNumber: params.phoneNumber,
                countryCode: params.countryCode,
                token: backendToken,
                supabaseAccessToken: session.access_token,
            };

            localStorage.setItem("user", JSON.stringify(user));

            return user;

        } catch (e) {
            console.error("[Auth] verifyOtp failed", e);
            throw e;
        }
    }

    async function onboardingCheck(supabaseAccessToken: string) {
        try {
            const res = await fetch(
                `${BASE_URL}/customer/onboarding-check`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${supabaseAccessToken}`,
                    },
                }
            );

            const json = await res.json();

            if (!res.ok || !json.success) {
                throw new Error(json.message || "Onboarding check failed");
            }

            return json.data as {
                hasBranch: boolean;
                hasEpNumber: boolean;
                hasPoBox: boolean;
            };
        } catch (e) {
            console.error("[Auth] onboardingCheck failed", e);
            throw e;
        }
    }

    async function getBranches(
        supabaseAccessToken: string
    ): Promise<Branch[]> {
        try {
            const res = await fetch(
                `${BASE_URL}/customer/branches`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${supabaseAccessToken}`,
                    },
                }
            );

            const json = await res.json();

            if (!res.ok || !json.success) {
                throw new Error(json.message || "Failed to fetch branches");
            }

            return json.data as Branch[];
        } catch (e) {
            console.error("[Auth] getBranches failed", e);
            throw e;
        }
    }

    async function setBranch(
        supabaseAccessToken: string,
        branchId: number
    ): Promise<void> {
        try {
            const res = await fetch(
                `${BASE_URL}/customer/branches/set`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${supabaseAccessToken}`,
                    },
                    body: JSON.stringify({ branchId }),
                }
            );

            const json = await res.json();

            if (!res.ok || !json.success) {
                throw new Error(json.message || "Failed to set branch");
            }
        } catch (e) {
            console.error("[Auth] setBranch failed", e);
            throw e;
        }
    }

    /* ================================
     * Session
     * ================================ */
    function getCurrentUser(): UserData | null {
        try {
            const raw = localStorage.getItem("user");
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            console.error("[Auth] Failed to parse user session", e);
            return null;
        }
    }

    function logout(): void {
        localStorage.removeItem("user");
        supabase.auth.signOut().catch(e =>
            console.error("[Auth] Supabase sign-out failed", e)
        );
    }

    return {
        sendOtp,
        verifyOtp,
        onboardingCheck,
        getBranches,
        setBranch,
        getCurrentUser,
        logout,
    };
}
