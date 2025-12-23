export type LoginStep = "phone" | "otp" | "branch";

export class LoginViewModel {
    step: LoginStep = "phone";
    isBusy = false;

    phone = "";
    countryCodes = ["+964", "+1", "+44", "+971", "+92"];
    selectedCountry = "+964";

    branches = ["Test Branch", "Main Branch", "Other Branch"];
    selectedBranch: string | null = "Test Branch";

    otp: string[] = Array(6).fill("");
    resendRemaining = 0;

    error = "";
    otpError = "";

    validatePhone() {
        if (!this.phone || this.phone.length < 8) {
            this.error = "Enter a valid phone number";
            return false;
        }
        this.error = "";
        return true;
    }

    get canGoNextFromPhone() {
        return this.phone.length >= 10 && !this.isBusy;
    }

    get isOtpComplete() {
        return this.otp.join("").length === 6;
    }

    goToBranchStep() {
        if (!this.validatePhone()) return;
        this.step = "otp";
        this.startResendTimer();
    }

    async verifyOtp(): Promise<boolean> {
        this.isBusy = true;
        await new Promise((r) => setTimeout(r, 800));

        const enteredOtp = this.otp.join("");
        this.isBusy = false;

        if (enteredOtp === "111111") {
            this.otpError = "";
            this.step = "branch";
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
