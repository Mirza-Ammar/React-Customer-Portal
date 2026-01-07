import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logoKurdishSvg, logoYellowSvg } from "@/lib/assets";
import { Bell, Globe, Search, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "@/i18n/languages";
import { GLOBAL_SEARCH_ITEMS } from "@/accessibility/GlobalSearch";

/* ================= TEXT HIGHLIGHT ================= */
function highlightMatch(text: string, query: string) {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "ig");
    const parts = text.split(regex);

    return parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="text-[var(--color-primary)] font-semibold">
                {part}
            </span>
        ) : (
            part
        )
    );
}

export default function Header() {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();

    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    const [langOpen, setLangOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    /* ================= LANGUAGE ================= */
    const [selectedLang, setSelectedLang] = useState(() => {
        const saved = localStorage.getItem("lang");
        return LANGUAGES.find(l => l.i18n === saved) || LANGUAGES[0];
    });

    useEffect(() => {
        i18n.changeLanguage(selectedLang.i18n);
        document.documentElement.dir = selectedLang.rtl ? "rtl" : "ltr";
        document.documentElement.lang = selectedLang.i18n;
        localStorage.setItem("lang", selectedLang.i18n);
    }, [selectedLang, i18n]);

    const isRTL = selectedLang.rtl;
    const logoSrc = isRTL ? logoKurdishSvg : logoYellowSvg;

    /* ================= CMD / CTRL + K ================= */
    useEffect(() => {
        function handleShortcut(e: KeyboardEvent) {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setSearchOpen(true);
                setActiveIndex(-1);
                setTimeout(() => {
                    const input = searchRef.current?.querySelector("input");
                    input?.focus();
                }, 0);
            }
        }

        window.addEventListener("keydown", handleShortcut);
        return () => window.removeEventListener("keydown", handleShortcut);
    }, []);

    /* ================= OUTSIDE CLICK ================= */
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setLangOpen(false);
            }

            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setSearchOpen(false);
                setActiveIndex(-1);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /* ================= SEARCH RESULTS ================= */
    const results = GLOBAL_SEARCH_ITEMS.filter(item =>
        t(item.labelKey).toLowerCase().includes(query.toLowerCase())
    );

    /* ================= KEYBOARD NAV ================= */
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (!searchOpen || results.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
                break;
            case "ArrowUp":
                e.preventDefault();
                setActiveIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
                break;
            case "Enter":
                if (activeIndex >= 0) {
                    navigate(results[activeIndex].route);
                    setQuery("");
                    setSearchOpen(false);
                    setActiveIndex(-1);
                }
                break;
            case "Escape":
                setSearchOpen(false);
                setActiveIndex(-1);
                break;
        }
    }

    /* ================= ANIMATED PLACEHOLDER ================= */
    const placeholderTexts = [
        t("header.search"),
        navigator.platform.includes("Mac") ? "⌘ K for search" : "Ctrl + K for search",
    ];

    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex(prev => (prev + 1) % placeholderTexts.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <header className="px-4 pt-4 relative z-[100]">
            <div className="h-[50px] rounded-full bg-white border border-black/10 flex items-center pl-2 pr-4 rtl:pl-4 rtl:pr-2 relative">

                {/* LEFT */}
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate("/app")} aria-label="Go to dashboard">
                        <img src={logoSrc} alt="logo" className="h-8" />
                    </button>

                    <div className="h-5 w-px bg-[var(--color-dark-5)]" />

                    <span className="text-sm font-medium text-[var(--color-dark-1)]">
                        {t("header.individual")}
                    </span>
                </div>

                <div className="flex-1" />

                {/* RIGHT */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Bell size={20} />
                        <span className="absolute -top-2 -right-2 min-w-[15px] h-[18px] px-1 flex items-center justify-center rounded-full text-[10px] font-semibold text-white bg-[var(--color-error)]">
                            10
                        </span>
                    </div>

                    {/* LANGUAGE */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setLangOpen(v => !v)}
                            className="flex items-center gap-1 text-sm px-2 py-1 rounded-md hover:bg-[var(--color-white-4)]"
                        >
                            <Globe size={16} />
                            {selectedLang.ui}
                            <ChevronDown size={14} />
                        </button>

                        {langOpen && (
                            <div className="absolute right-0 mt-2 w-36 bg-white border border-black/10 rounded-lg shadow-md">
                                {LANGUAGES.map(lang => (
                                    <button
                                        key={lang.i18n}
                                        onClick={() => {
                                            setSelectedLang(lang);
                                            setLangOpen(false);
                                        }}
                                        className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--color-white-4)]"
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* USER */}
                    <button className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-[var(--color-white-4)]">
                        <div className="h-7 w-7 rounded-full bg-[var(--color-white-4)]" />
                        <div className="text-xs text-left">
                            <div className="font-semibold">Mohammad Iqma</div>
                            <div className="text-[10px]">+9647654321234</div>
                        </div>
                        <ChevronDown size={14} className="opacity-70" />
                    </button>
                </div>

                {/* ================= SEARCH ================= */}
                <div
                    ref={searchRef}
                    className="absolute left-1/2 -translate-x-1/2 top-[8px] w-[530px]"
                >
                    <div className="h-[35px] rounded-full bg-[var(--color-white-6)] border border-black/15 flex items-center px-4 relative overflow-hidden">
                        <Search size={16} />

                        {/* Animated placeholder */}
                        {!query && (
                            <span
                                key={placeholderIndex}
                                className={`
                                    absolute
                                    ${isRTL ? "right-10 text-right" : "left-10 text-left"}
                                    text-sm text-black/40
                                    pointer-events-none
                                    animate-fade-slide
                                `}
                            >
                                {placeholderTexts[placeholderIndex]}
                            </span>
                        )}

                        {/* Input */}
                        <input
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setSearchOpen(true);
                                setActiveIndex(-1);
                            }}
                            onKeyDown={handleKeyDown}
                            dir={isRTL ? "rtl" : "ltr"}
                            className={`
                                ml-2
                                bg-transparent
                                outline-none
                                text-sm
                                flex-1
                                relative
                                z-10
                                ${isRTL ? "text-right" : "text-left"}
                            `}
                        />
                    </div>

                    {searchOpen && query && results.length > 0 && (
                        <div className="mt-2 bg-white border border-black/10 rounded-lg shadow-lg overflow-hidden">
                            {results.map((item, index) => (
                                <button
                                    key={item.key}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onClick={() => {
                                        navigate(item.route);
                                        setQuery("");
                                        setSearchOpen(false);
                                        setActiveIndex(-1);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm ${index === activeIndex
                                        ? "bg-[var(--color-secondary)]"
                                        : "hover:bg-[var(--color-white-4)]"
                                        }`}
                                >
                                    {highlightMatch(t(item.labelKey), query)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
