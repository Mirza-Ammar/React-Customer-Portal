import type { UserData } from "@/datamodels/UserData";

const BASE_URL = "https://env.eaglepost.com/functions/v1";

export function useAuth() {
    async function sendOtp(params: {
        phoneNumber: string;
        countryCode: string;
        sendSms?: boolean;
        sessionId?: string;
    }) {
        const res = await fetch(`${BASE_URL}/customer/auth/send-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phoneNumber: params.phoneNumber,
                countryCode: params.countryCode,
                sendSms: params.sendSms ?? false,
                sessionId: params.sessionId ?? Date.now().toString(),
            }),
        });

        const json = await res.json();

        // 🔴 IMPORTANT: backend-level failure
        if (!res.ok || !json.success) {
            console.error("Send OTP failed:", json);
            throw new Error(json.message || "Failed to send OTP");
        }

        return json;
    }

    async function verifyOtp(params: {
        phoneNumber: string;
        countryCode: string;
        otp: string;
    }): Promise<UserData> {
        const res = await fetch(`${BASE_URL}/customer/auth/verify-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });

        const json = await res.json();

        if (!res.ok || !json.success) {
            console.error("Verify OTP failed:", json);
            throw new Error(json.message || "Invalid OTP");
        }

        const user: UserData = {
            id: json.data.id,
            token: json.data.token,
            phoneNumber: params.phoneNumber,
            countryCode: params.countryCode,
        };

        localStorage.setItem("user", JSON.stringify(user));

        return user;
    }

    function getCurrentUser(): UserData | null {
        const raw = localStorage.getItem("user");
        return raw ? JSON.parse(raw) : null;
    }

    function logout() {
        localStorage.removeItem("user");
    }

    return {
        sendOtp,
        verifyOtp,
        getCurrentUser,
        logout,
    };
}
