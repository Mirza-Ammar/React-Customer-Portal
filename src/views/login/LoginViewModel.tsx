import type { Branch } from "@/datamodels/BranchData";
import { userAuth } from "@/hooks/userAuth";

export type LoginStep = "phone" | "otp" | "branch";

export class LoginViewModel {
    private auth = userAuth();

    /* ================================
     * UI State
     * ================================ */
    step: LoginStep = "phone";
    isBusy = false;

    error = "";
    otpError = "";

    /* ================================
     * Phone
     * ================================ */
    phone = "5555555555";
    selectedCountry = "+90";
    countryCodes = ["+964", "+1", "+44", "+971", "+92", "+91", "+90"];

    /* ================================
     * OTP
     * ================================ */
    otp: string[] = Array(6).fill("");
    resendRemaining = 0;

    /* ================================
     * Branch
     * ================================ */
    branches: Branch[] = [];
    selectedBranch: Branch | null = null;

    /* ================================
     * Derived state
     * ================================ */
    get canGoNextFromPhone() {
        return this.phone.length >= 10 && !this.isBusy;
    }

    get isOtpComplete() {
        return this.otp.join("").length === 6;
    }

    /* ================================
     * Validation
     * ================================ */
    validatePhone(): boolean {
        if (!this.phone || this.phone.length < 8) {
            this.error = "login.invalidPhone";
            return false;
        }

        this.error = "";
        return true;
    }

    /* ================================
     * Actions
     * ================================ */
    async sendOtp(): Promise<void> {
        if (!this.validatePhone()) return;

        this.isBusy = true;
        this.error = "";

        try {
            // backend expects digits-only phone
            const cleanPhone = this.phone.replace(/\D/g, "");

            await this.auth.sendOtp({
                phoneNumber: cleanPhone,
                countryCode: this.selectedCountry,
                sendSms: false,
            });

            this.phone = cleanPhone;
            this.step = "otp";
            this.startResendTimer();

        } catch (e: any) {
            console.error(e);
            this.error = e.message || "Failed to send OTP";
        } finally {
            this.isBusy = false;
        }
    }

    async verifyOtp(): Promise<boolean> {
        this.isBusy = true;
        this.otpError = "";

        try {
            const user = await this.auth.verifyOtp({
                phoneNumber: this.phone,
                countryCode: this.selectedCountry,
                otp: this.otp.join(""),
            });

            const onboarding = await this.auth.onboardingCheck(
                user.supabaseAccessToken
            );

            if (onboarding.hasBranch) {
                return true;
            }

            // user must select a branch
            this.branches = await this.auth.getBranches(
                user.supabaseAccessToken
            );

            this.selectedBranch = null;
            this.step = "branch";
            return false;

        } catch (e) {
            console.error(e);
            this.otpError = "login.invalidOtp";
            return false;
        } finally {
            this.isBusy = false;
        }
    }

    async setBranch(): Promise<boolean> {
        if (!this.selectedBranch) return false;

        this.isBusy = true;

        try {
            const user = this.auth.getCurrentUser();
            if (!user) throw new Error("User session not found");

            await this.auth.setBranch(
                user.supabaseAccessToken,
                this.selectedBranch.id
            );

            return true;

        } catch (e) {
            console.error(e);
            return false;
        } finally {
            this.isBusy = false;
        }
    }

    /* ================================
     * Helpers
     * ================================ */
    startResendTimer(): void {
        this.resendRemaining = 30;

        const timer = setInterval(() => {
            this.resendRemaining--;
            if (this.resendRemaining <= 0) clearInterval(timer);
        }, 1000);
    }

    resetOtp(): void {
        this.step = "phone";
        this.otp = Array(6).fill("");
        this.otpError = "";
        this.resendRemaining = 0;
    }
}
