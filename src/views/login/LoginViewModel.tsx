import { useAuth } from "@/hooks/useAuth";

export type LoginStep = "phone" | "otp" | "branch";

export class LoginViewModel {
    private auth = useAuth();

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
            this.error = "login.invalidPhone";
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

    async sendOtp() {
        if (!this.validatePhone()) return;

        this.isBusy = true;
        this.error = "";

        try {
            const cleanPhone = this.phone.replace(/\D/g, ""); // ✅ digits only

            await this.auth.sendOtp({
                phoneNumber: cleanPhone,
                countryCode: this.selectedCountry,
                sendSms: false,
            });

            this.phone = cleanPhone; // keep normalized value
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
            await this.auth.verifyOtp({
                phoneNumber: this.phone,
                countryCode: this.selectedCountry,
                otp: this.otp.join(""),
            });

            this.step = "branch";
            return true;
        } catch (e) {
            this.otpError = "login.invalidOtp";
            return false;
        } finally {
            this.isBusy = false;
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
