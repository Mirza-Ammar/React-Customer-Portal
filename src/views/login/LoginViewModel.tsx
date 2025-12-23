// Login step enum (Flutter: enum LoginStep)
export type LoginStep = "phone" | "branch" | "otp";

/**
 * LoginViewModel
 * ----------------
 * Flutter equivalent:
 * ChangeNotifier / Stacked ViewModel
 */
export class LoginViewModel {
    // ===== State =====
    step: LoginStep = "phone";
    isBusy = false;

    phone = "7507836447";
    countryCodes = ["+964", "+1", "+44", "+971", "+92"];
    selectedCountry = "+964";

    branches = ["Test Branch", "Main Branch", "Other Branch"];
    selectedBranch: string | null = "Test Branch";

    otp: string[] = Array(6).fill("");
    resendRemaining = 0;

    error = "";
    otpError = ""; // 🔥 NEW

    // ===== Validation =====
    validatePhone() {
        if (!this.phone || this.phone.length < 8) {
            this.error = "Enter a valid phone number";
            return false;
        }
        this.error = "";
        return true;
    }

    // ===== Computed =====
    get canGoNextFromPhone() {
        return this.phone.length >= 10 && !this.isBusy;
    }

    get canSendOtp() {
        return this.phone.length >= 10 && !!this.selectedBranch && !this.isBusy;
    }

    get isOtpComplete() {
        return this.otp.join("").length === 6;
    }

    // ===== Actions =====
    goToBranchStep() {
        if (!this.validatePhone()) return;
        this.step = "branch";
    }

    async sendOtp() {
        if (!this.canSendOtp) return;

        this.isBusy = true;
        await new Promise((r) => setTimeout(r, 3000));
        this.isBusy = false;

        this.step = "otp";
        this.startResendTimer();
    }

    /**
     * 🔐 OTP VALIDATION
     * Valid OTP: 111111
     */
    async verifyOtp(): Promise<boolean> {
        if (!this.isOtpComplete) return false;

        this.isBusy = true;
        await new Promise((r) => setTimeout(r, 800));
        this.isBusy = false;

        const enteredOtp = this.otp.join("");

        if (enteredOtp === "111111") {
            this.otpError = "";
            return true;
        } else {
            this.otpError = "Invalid OTP. Please try again.";
            return false;
        }
    }

    startResendTimer() {
        this.resendRemaining = 30;
        const timer = setInterval(() => {
            this.resendRemaining--;
            if (this.resendRemaining <= 0) clearInterval(timer);
        }, 1000);
    }

    resetOtp() {
        this.step = "phone";
        this.otp = Array(6).fill("");
        this.otpError = "";
        this.resendRemaining = 0;
    }
}

