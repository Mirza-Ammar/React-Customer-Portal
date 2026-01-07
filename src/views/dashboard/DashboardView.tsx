// src/pages/dashboard/DashboardView.tsx
import { useEffect, useState } from "react";
import { DashboardViewModel } from "./DashboardViewModel";
import clsx from "clsx";

function Shimmer({ className }: { className?: string }) {
    return (
        <div
            className={clsx(
                "relative overflow-hidden bg-gray-200 rounded-md",
                "before:absolute before:inset-0",
                "before:-translate-x-full before:animate-[shimmer_1.6s_infinite]",
                "before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent",
                className
            )}
        />
    );
}

export default function DashboardView() {
    const [vm] = useState(() => new DashboardViewModel());

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    /* ================================
     * Load on enter
     * ================================ */
    useEffect(() => {
        let mounted = true;

        setIsLoading(true);
        setError("");
        vm.reset();

        vm.load()
            .catch((e: any) => {
                if (mounted) {
                    setError(e?.message || "Failed to load dashboard");
                }
            })
            .finally(() => {
                if (mounted) setIsLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, []);

    /* ================================
     * Loading State
     * ================================ */
    if (isLoading) {
        return (
            <div className="p-6 space-y-8 bg-white">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <Shimmer className="h-6 w-48 rounded-lg" />
                        <Shimmer className="h-4 w-32 rounded-md" />
                    </div>

                    <div className="space-y-2 text-right">
                        <Shimmer className="h-4 w-24 ml-auto rounded-md" />
                        <Shimmer className="h-5 w-20 ml-auto rounded-full" />
                    </div>
                </div>

                {/* Banners */}
                <div className="flex gap-4 overflow-hidden">
                    {[1, 2, 3].map(i => (
                        <Shimmer
                            key={i}
                            className="h-[160px] w-[300px] rounded-xl border border-gray-200"
                        />
                    ))}
                </div>

                {/* Services */}
                <div>
                    <Shimmer className="h-5 w-32 mb-4 rounded-md" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <Shimmer
                                key={i}
                                className="h-[90px] rounded-xl border border-gray-200"
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    /* ================================
     * Error State
     * ================================ */
    if (error) {
        return (
            <div className="h-full flex items-center justify-center text-red-600 bg-white">
                {error}
            </div>
        );
    }

    if (!vm.home) return null;

    /* ================================
     * Main View
     * ================================ */
    return (
        <div className="p-6 space-y-8 bg-white">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-[var(--color-dark-1)]">
                        Welcome 👋
                    </h1>
                    <p className="text-sm text-[var(--color-dark-2)]">
                        {vm.home.userType} Account
                    </p>
                </div>

                <div className="text-right space-y-1">
                    <div className="text-sm font-medium text-[var(--color-dark-2)]">
                        EP Number
                    </div>
                    <div className="font-semibold">
                        {vm.home.epNumber}
                    </div>
                    <span
                        className={clsx(
                            "inline-block text-xs px-2 py-1 rounded-full font-medium",
                            vm.home.epNumberStatus === "Approved" && "bg-green-100 text-green-700",
                            vm.home.epNumberStatus === "Pending" && "bg-orange-100 text-orange-700",
                            vm.home.epNumberStatus === "Rejected" && "bg-red-100 text-red-700"
                        )}
                    >
                        {vm.home.epNumberStatus}
                    </span>
                </div>
            </div>

            {/* Banners */}
            {vm.banners.length > 0 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {vm.banners.map((banner, i) => (
                        <img
                            key={i}
                            src={banner}
                            alt="Banner"
                            className="h-[160px] min-w-[300px] rounded-xl object-cover border border-gray-200 shadow-sm hover:shadow-md transition"
                        />
                    ))}
                </div>
            )}

            {/* Services */}
            <div>
                <h2 className="text-lg font-semibold mb-4 text-[var(--color-dark-1)]">
                    Services
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {vm.activeShortcuts.map(s => (
                        <button
                            key={s.title}
                            disabled={!s.isEnabled}
                            className={clsx(
                                "h-[90px] rounded-xl border flex flex-col items-center justify-center gap-1 text-sm font-semibold transition-all duration-200",
                                s.isEnabled
                                    ? "bg-white border-gray-200 hover:border-[var(--color-primary)] hover:shadow-md active:scale-[0.98]"
                                    : "bg-gray-50 text-gray-400 cursor-not-allowed"
                            )}
                        >
                            <span>{s.title}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
