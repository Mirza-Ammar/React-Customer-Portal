import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LoginViewModel } from "./LoginViewModel";
import "./login.css";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

// shared assets & theme
import { logoYellowSvg, loginIllustration } from "@/lib/assets";
import { colors } from "@/theme/colors";

// feature icons
import {
    shipmentTruck,
    secureShield,
    clock,
} from "@/lib/assets"; // adjust path if needed
import { Loader } from "@/components/ui/loader/Loader";

export default function LoginView() {
    const [vm] = useState(() => new LoginViewModel());
    const [, forceUpdate] = useState(0);
    const rebuild = () => forceUpdate((v) => v + 1);

    const navigate = useNavigate();
    const otpRefs = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        if (vm.step === "otp") {
            setTimeout(() => otpRefs.current[0]?.focus(), 50);
        }
    }, [vm.step]);

    useEffect(() => {
        if (vm.step !== "otp") return;
        const interval = setInterval(rebuild, 1000);
        return () => clearInterval(interval);
    }, [vm.step]);

    return (
        <div className="login-root">
            {/* ================= LEFT PANEL ================= */}
            <div className="left-panel">
                <div className="form-container form-left">
                    {/* LOGO */}
                    <div className="logo-wrapper">
                        <img src={logoYellowSvg} className="logo" alt="Company logo" />
                    </div>

                    {/* HEADER */}
                    <h2 className="text-2xl font-semibold text-gray-900">Welcome</h2>
                    <p className="subtitle text-gray-600 mt-2 mb-6">
                        Sign in with your phone number to access your portal
                    </p>

                    {/* ================= STEP 1: PHONE ================= */}
                    {vm.step === "phone" && (
                        <>
                            <label className="form-label">Enter your Phone Number</label>

                            <div className="phone-row">
                                <Select
                                    value={vm.selectedCountry}
                                    onValueChange={(v) => {
                                        vm.selectedCountry = v;
                                        rebuild();
                                    }}
                                >
                                    <SelectTrigger className="w-[90px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {vm.countryCodes.map((c) => (
                                            <SelectItem key={c} value={c}>
                                                {c}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Input
                                    value={vm.phone}
                                    placeholder="7XXXXXXXXX"
                                    onChange={(e) => {
                                        vm.phone = e.target.value;
                                        rebuild();
                                    }}
                                />
                            </div>

                            <Button
                                className="w-full mt-5 text-white"
                                style={{ backgroundColor: colors.primary }}
                                disabled={!vm.canGoNextFromPhone}
                                onClick={() => {
                                    vm.goToBranchStep();
                                    rebuild();
                                }}
                            >
                                Send Verification Code
                            </Button>
                            <div className="order-rate-wrapper">
                                <span className="order-rate-text">
                                    Do you want to check your order rate?{" "}
                                    <span className="order-rate-link">Check Now</span>
                                </span>
                            </div>
                        </>
                    )}

                    {/* ================= STEP 2: BRANCH ================= */}
                    {vm.step === "branch" && (
                        <>
                            <label className="form-label">Select your branch</label>

                            <Select
                                value={vm.selectedBranch ?? ""}
                                onValueChange={(v) => {
                                    vm.selectedBranch = v;
                                    rebuild();
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select branch" />
                                </SelectTrigger>
                                <SelectContent>
                                    {vm.branches.map((b) => (
                                        <SelectItem key={b} value={b}>
                                            {b}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button
                                className="w-full mt-5 text-white"
                                style={{ backgroundColor: colors.primary }}
                                disabled={!vm.canSendOtp || vm.isBusy}
                                onClick={async () => {
                                    rebuild();
                                    await vm.sendOtp();
                                    rebuild();
                                }}
                            >
                                {vm.isBusy ? <Loader size={18} color="#fff" /> : "Confirm"}
                            </Button>
                            <div className="order-rate-wrapper">
                                <span className="order-rate-text">
                                    Do you want to check your order rate?{" "}
                                    <span className="order-rate-link">Check Now</span>
                                </span>
                            </div>
                        </>
                    )}

                    {/* ================= STEP 3: OTP ================= */}
                    {vm.step === "otp" && (
                        <>
                            <div className="otp-header">
                                <div className="otp-header-left">
                                    <span className="form-label">Enter 6-Digit Code</span>
                                    <span className="otp-sent-text">
                                        Code sent to {vm.selectedCountry}
                                        {vm.phone}
                                    </span>
                                </div>

                                <Button
                                    variant="link"
                                    className="p-0 otp-change-btn"
                                    style={{ color: colors.primary }}
                                    onClick={() => {
                                        vm.resetOtp();
                                        rebuild();
                                    }}
                                >
                                    Change number
                                </Button>
                            </div>

                            <div className="otp-row mt-3">
                                {vm.otp.map((_, i) => (
                                    <Input
                                        key={i}
                                        ref={(el) => {
                                            if (el) {
                                                otpRefs.current[i] = el;
                                            }
                                        }}
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={vm.otp[i]}
                                        className="w-[44px] h-[48px] text-center text-lg"
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "").slice(-1);
                                            vm.otp[i] = value;
                                            rebuild();

                                            if (value && i < otpRefs.current.length - 1) {
                                                otpRefs.current[i + 1]?.focus();
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Backspace" && !vm.otp[i] && i > 0) {
                                                otpRefs.current[i - 1]?.focus();
                                            }
                                        }}
                                    />

                                ))}
                            </div>

                            <Button
                                className="w-full mt-5 text-white"
                                style={{ backgroundColor: colors.primary }}
                                disabled={!vm.isOtpComplete || vm.isBusy}
                                onClick={async () => {
                                    const success = await vm.verifyOtp();
                                    rebuild();
                                    if (success) navigate("/app", { replace: true });
                                }}
                            >
                                {vm.isBusy ? <Loader size={18} color="#fff" /> : "Verify & Sign In"}
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* ================= RIGHT PANEL ================= */}
            <div className="right-panel">
                <div className="right-panel-center">
                    <div className="right-panel-content">
                        <div className="right-panel-image">
                            <img
                                src={loginIllustration}
                                className="hero-image"
                                alt="Login illustration"
                            />
                        </div>

                        <div className="right-panel-text">
                            <h3>
                                Revolutionize Delivery with
                                <br />
                                Smarter Logistics
                            </h3>

                            <div className="right-panel-divider" />

                            <p>
                                Track shipments in real-time, manage your deliveries efficiently,
                                and optimize your logistics workflow.
                            </p>
                        </div>

                        {/* FEATURE CARDS */}
                        <div className="feature-row">
                            {[
                                {
                                    image: shipmentTruck,
                                    title: "Fast Delivery",
                                    l1: "Express shipping",
                                    l2: "worldwide",
                                },
                                {
                                    image: secureShield,
                                    title: "Secure",
                                    l1: "Protected &",
                                    l2: "insured",
                                },
                                {
                                    image: clock,
                                    title: "24/7 Track",
                                    l1: "Real-time",
                                    l2: "updates",
                                },
                            ].map((f) => (
                                <div key={f.title} className="feature-card">
                                    <div className="feature-inner">
                                        <div className="feature-icon">
                                            <img
                                                src={f.image}
                                                alt={f.title}
                                                className="feature-image"
                                            />
                                        </div>

                                        <div className="feature-title">{f.title}</div>

                                        <div className="feature-subtitle">
                                            <span className="subtitle-line-1">{f.l1}</span>
                                            <span className="subtitle-line-2">{f.l2}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
