import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// ViewModel
import { LoginViewModel } from "./LoginViewModel";

// Styles
import "./login.css";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

// UI utilities
import { Loader } from "@/components/ui/loader/Loader";

// Assets & theme
import {
    logoYellowSvg,
    logoKurdishSvg,
    loginIllustration,
    shipmentTruck,
    secureShield,
    clock,
} from "@/lib/assets";
import { colors } from "@/theme/colors";

// Language
import { Globe, ChevronDown } from "lucide-react";
import { LANGUAGES } from "@/i18n/languages";

export default function LoginView() {
    /* ======================================================
     * ViewModel (manual re-render pattern)
     * ====================================================== */
    const [vm] = useState(() => new LoginViewModel());

    // Used to force React to re-render when ViewModel changes
    const [, forceUpdate] = useState(0);
    const rebuild = () => forceUpdate(v => v + 1);

    /* ======================================================
     * Navigation & refs
     * ====================================================== */
    const navigate = useNavigate();
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
    const langRef = useRef<HTMLDivElement>(null);

    /* ======================================================
     * i18n & language state
     * ====================================================== */
    const { i18n, t } = useTranslation();

    const [langOpen, setLangOpen] = useState(false);

    // Initialize language from localStorage (fallback to first language)
    const [selectedLang, setSelectedLang] = useState(() => {
        const saved = localStorage.getItem("lang");
        return LANGUAGES.find(l => l.i18n === saved) || LANGUAGES[0];
    });

    const isRTL = selectedLang.rtl;
    const logoSrc = isRTL ? logoKurdishSvg : logoYellowSvg;

    /* ======================================================
     * Effects
     * ====================================================== */

    // Apply language + direction changes globally
    useEffect(() => {
        i18n.changeLanguage(selectedLang.i18n);
        document.documentElement.dir = selectedLang.rtl ? "rtl" : "ltr";
        document.documentElement.lang = selectedLang.i18n;
        localStorage.setItem("lang", selectedLang.i18n);
    }, [selectedLang, i18n]);

    // Close language dropdown when clicking outside
    useEffect(() => {
        function handleOutsideClick(e: MouseEvent) {
            if (langRef.current && !langRef.current.contains(e.target as Node)) {
                setLangOpen(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    // Auto-focus first OTP input when entering OTP step
    useEffect(() => {
        if (vm.step === "otp") {
            setTimeout(() => otpRefs.current[0]?.focus(), 50);
        }
    }, [vm.step]);

    // Re-render every second during OTP step (timer / resend UX)
    useEffect(() => {
        if (vm.step !== "otp") return;

        const interval = setInterval(rebuild, 1000);
        return () => clearInterval(interval);
    }, [vm.step]);

    /* ======================================================
     * Render
     * ====================================================== */
    return (
        <div className="login-root">
            {/* ======================================================
             * LEFT PANEL (Form)
             * ====================================================== */}
            <div className="left-panel relative">
                {/* Language selector */}
                <div className="absolute top-4 right-4 z-50" ref={langRef}>
                    <button
                        onClick={() => setLangOpen(v => !v)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm bg-white border border-black/10 hover:bg-gray-50"
                    >
                        <Globe size={16} />
                        {selectedLang.ui}
                        <ChevronDown size={14} />
                    </button>

                    {langOpen && (
                        <div className="mt-2 w-36 bg-white border border-black/10 rounded-lg shadow-md">
                            {LANGUAGES.map(lang => (
                                <button
                                    key={lang.i18n}
                                    onClick={() => {
                                        setSelectedLang(lang);
                                        setLangOpen(false);
                                    }}
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="form-container form-left">
                    {/* Logo */}
                    <div className="logo-wrapper">
                        <img
                            src={logoSrc}
                            className="logo"
                            alt={t("login.companyLogoAlt")}
                        />
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-900">
                        {t("login.welcome")}
                    </h2>
                    <p className="subtitle text-gray-600 mt-2 mb-6">
                        {t("login.subtitle")}
                    </p>

                    {/* ================= PHONE STEP ================= */}
                    {vm.step === "phone" && (
                        <>
                            <label className="form-label">
                                {t("login.phoneLabel")}
                            </label>

                            <div className="phone-row">
                                <Select
                                    value={vm.selectedCountry}
                                    onValueChange={v => {
                                        vm.selectedCountry = v;
                                        rebuild();
                                    }}
                                >
                                    <SelectTrigger className="w-[90px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {vm.countryCodes.map(code => (
                                            <SelectItem key={code} value={code}>
                                                {code}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Input
                                    value={vm.phone}
                                    placeholder={t("login.phonePlaceholder")}
                                    onChange={e => {
                                        vm.phone = e.target.value;
                                        rebuild();
                                    }}
                                />
                            </div>

                            <Button
                                className="w-full mt-5 text-white"
                                style={{ backgroundColor: colors.primary }}
                                disabled={!vm.canGoNextFromPhone || vm.isBusy}
                                onClick={async () => {
                                    rebuild(); // allow loader to render
                                    await vm.sendOtp();
                                    rebuild();
                                }}
                            >
                                {vm.isBusy
                                    ? <Loader size={18} color="#fff" />
                                    : t("login.sendCode")}
                            </Button>

                            {vm.error && (
                                <p className="mt-2 text-sm text-red-600">
                                    {t(vm.error)}
                                </p>
                            )}
                        </>
                    )}

                    {/* ================= OTP STEP ================= */}
                    {vm.step === "otp" && (
                        <>
                            <span className="form-label">
                                {t("login.enterOtp")}
                            </span>

                            <div className="otp-row mt-3">
                                {vm.otp.map((_, i) => (
                                    <Input
                                        key={i}
                                        ref={(el) => {
                                            if (el) otpRefs.current[i] = el;
                                        }}
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={vm.otp[i]}
                                        className="w-[44px] h-[48px] text-center text-lg"
                                        onChange={e => {
                                            const value = e.target.value
                                                .replace(/\D/g, "")
                                                .slice(-1);

                                            vm.otp[i] = value;
                                            vm.otpError = ""; // clear error while typing
                                            rebuild();

                                            if (value && i < 5) {
                                                otpRefs.current[i + 1]?.focus();
                                            }
                                        }}
                                        onKeyDown={e => {
                                            if (
                                                e.key === "Backspace" &&
                                                !vm.otp[i] &&
                                                i > 0
                                            ) {
                                                otpRefs.current[i - 1]?.focus();
                                            }
                                        }}
                                    />
                                ))}
                            </div>

                            {vm.otpError && (
                                <p className="mt-2 text-sm text-red-600 text-center">
                                    {t(vm.otpError)}
                                </p>
                            )}

                            <Button
                                className="w-full mt-5 text-white"
                                style={{ backgroundColor: colors.primary }}
                                disabled={!vm.isOtpComplete || vm.isBusy}
                                onClick={async () => {
                                    rebuild();
                                    const success = await vm.verifyOtp();
                                    rebuild();

                                    if (success) {
                                        navigate("/app", { replace: true });
                                    }
                                }}
                            >
                                {vm.isBusy
                                    ? <Loader size={18} color="#fff" />
                                    : t("login.verify")}
                            </Button>
                        </>
                    )}

                    {/* ================= BRANCH STEP ================= */}
                    {vm.step === "branch" && (
                        <>
                            <label className="form-label">
                                {t("login.selectBranch")}
                            </label>

                            <Select
                                value={
                                    vm.selectedBranch
                                        ? String(vm.selectedBranch.id)
                                        : ""
                                }
                                onValueChange={value => {
                                    const branchId = Number(value);
                                    vm.selectedBranch =
                                        vm.branches.find(b => b.id === branchId) || null;
                                    rebuild();
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t("login.branchPlaceholder")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {vm.branches.map(branch => (
                                        <SelectItem
                                            key={branch.id}
                                            value={String(branch.id)}
                                        >
                                            {branch.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button
                                className="w-full mt-5 text-white"
                                style={{ backgroundColor: colors.primary }}
                                disabled={!vm.selectedBranch || vm.isBusy}
                                onClick={async () => {
                                    rebuild();
                                    const success = await vm.setBranch();
                                    rebuild();

                                    if (success) {
                                        navigate("/app", { replace: true });
                                    }
                                }}
                            >
                                {vm.isBusy
                                    ? <Loader size={18} color="#fff" />
                                    : t("login.continue")}
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* ======================================================
             * RIGHT PANEL (Marketing / Info)
             * ====================================================== */}
            <div className="right-panel">
                <div className="right-panel-center">
                    <div className="right-panel-content">
                        <div className="right-panel-image">
                            <img
                                src={loginIllustration}
                                className="hero-image"
                                alt={t("login.heroAlt")}
                            />
                        </div>

                        <div className="right-panel-text">
                            <h3>
                                {t("login.heroTitleLine1")}
                                <br />
                                {t("login.heroTitleLine2")}
                            </h3>

                            <div className="right-panel-divider" />

                            <p>{t("login.heroDescription")}</p>
                        </div>

                        <div className="feature-row">
                            {[
                                {
                                    image: shipmentTruck,
                                    title: t("login.features.fast.title"),
                                    l1: t("login.features.fast.l1"),
                                    l2: t("login.features.fast.l2"),
                                },
                                {
                                    image: secureShield,
                                    title: t("login.features.secure.title"),
                                    l1: t("login.features.secure.l1"),
                                    l2: t("login.features.secure.l2"),
                                },
                                {
                                    image: clock,
                                    title: t("login.features.track.title"),
                                    l1: t("login.features.track.l1"),
                                    l2: t("login.features.track.l2"),
                                },
                            ].map(feature => (
                                <div key={feature.title} className="feature-card">
                                    <div className="feature-inner">
                                        <div className="feature-icon">
                                            <img
                                                src={feature.image}
                                                alt={feature.title}
                                                className="feature-image"
                                            />
                                        </div>
                                        <div className="feature-title">
                                            {feature.title}
                                        </div>
                                        <div className="feature-subtitle">
                                            <span className="subtitle-line-1">
                                                {feature.l1}
                                            </span>
                                            <span className="subtitle-line-2">
                                                {feature.l2}
                                            </span>
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
