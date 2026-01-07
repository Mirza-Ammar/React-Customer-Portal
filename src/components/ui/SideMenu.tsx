import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    User,
    MapPin,
    Package,
    ShoppingBag,
    ChevronRight,
    Home,
    Truck,
    LogOut,
} from "lucide-react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { userAuth } from "@/hooks/userAuth";
import { clearHomeCache } from "@/hooks/userHome";

const APP_BASE = "/app";

/* ======================================================
 * Menu Item
 * ====================================================== */
type MenuItemProps = {
    icon: React.ReactNode;
    title: string;
    route: string;
    selectable?: boolean;
    expandable?: boolean;
    expanded?: boolean;
    collapsed?: boolean;
};

function MenuItem({
    icon,
    title,
    route,
    selectable = true,
    expandable,
    expanded,
    collapsed,
}: MenuItemProps) {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isDashboard = route === APP_BASE;

    const isSelected =
        selectable &&
        (isDashboard
            ? pathname === APP_BASE
            : pathname === route || pathname.startsWith(route + "/"));

    return (
        <button
            title={collapsed ? title : undefined}
            onClick={() => navigate(route)}
            className={clsx(
                `
                flex items-center h-[40px] rounded-[6px]
                text-sm font-semibold transition-colors w-full
                px-2 gap-3
                `,
                isSelected
                    ? "bg-[var(--color-secondary)] text-[var(--color-dark-1)]"
                    : "text-[var(--color-dark-2)] hover:bg-[var(--color-white-4)]"
            )}
        >
            {/* ICON (fixed position) */}
            <span className="w-6 flex justify-center shrink-0">
                {icon}
            </span>

            {/* TEXT (animated, never unmounted) */}
            <span
                className={clsx(
                    "whitespace-nowrap overflow-hidden transition-all duration-200",
                    collapsed
                        ? "opacity-0 max-w-0"
                        : "opacity-100 max-w-[160px]"
                )}
            >
                {title}
            </span>

            {/* CHEVRON */}
            {expandable && (
                <ChevronRight
                    size={16}
                    className={clsx(
                        "ms-auto shrink-0 transition-all duration-200",
                        expanded && !collapsed && "rotate-90",
                        collapsed && "opacity-0"
                    )}
                />
            )}
        </button>
    );
}

/* ======================================================
 * Sub Menu Item
 * ====================================================== */
function SubMenuItem({
    title,
    route,
    collapsed,
}: {
    title: string;
    route: string;
    collapsed: boolean;
}) {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isSelected =
        pathname === route || pathname.startsWith(route + "/");

    return (
        <button
            title={collapsed ? title : undefined}
            onClick={() => navigate(route)}
            className={clsx(
                `
                flex items-center h-[36px] rounded-[6px]
                text-[13px] transition-colors w-full
                px-2 gap-3
                `,
                isSelected
                    ? "bg-[var(--color-secondary)] text-[var(--color-dark-1)] font-bold"
                    : "text-[var(--color-dark-2)] hover:bg-[var(--color-white-4)] font-semibold"
            )}
        >
            {/* DOT (fixed position) */}
            <span className="w-6 flex justify-center shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            </span>

            {/* TEXT */}
            <span
                className={clsx(
                    "whitespace-nowrap overflow-hidden transition-all duration-200 pl-0",
                    collapsed
                        ? "opacity-0 max-w-0"
                        : "opacity-100 max-w-[160px]"
                )}
            >
                {title}
            </span>
        </button>
    );
}

/* ======================================================
 * Side Menu
 * ====================================================== */
export default function SideMenu() {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const auth = userAuth();

    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("sidemenu-collapsed");
        if (saved) setCollapsed(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("sidemenu-collapsed", JSON.stringify(collapsed));
    }, [collapsed]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const isMac = navigator.platform.toUpperCase().includes("MAC");

            if (
                (isMac && e.metaKey && e.key.toLowerCase() === "b") ||
                (!isMac && e.ctrlKey && e.key.toLowerCase() === "b")
            ) {
                e.preventDefault();
                setCollapsed((prev) => !prev);
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const poBoxExpanded =
        pathname.startsWith(`${APP_BASE}/po-box-details`) ||
        pathname.startsWith(`${APP_BASE}/po-box-items`) ||
        pathname.startsWith(`${APP_BASE}/iqama-orders`);

    const ordersExpanded =
        pathname.startsWith(`${APP_BASE}/delivery-orders`) ||
        pathname.startsWith(`${APP_BASE}/international-orders`) ||
        pathname.startsWith(`${APP_BASE}/clickship-orders`);

    const supportExpanded =
        pathname.startsWith(`${APP_BASE}/settings`) ||
        pathname.startsWith(`${APP_BASE}/help`);

    return (
        <aside
            className={clsx(
                "h-full bg-white rounded-[20px] shadow p-4 flex flex-col transition-all duration-300 ease-in-out",
                collapsed ? "w-[72px]" : "w-[268px]"
            )}
        >
            <div className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden">

                <MenuItem
                    icon={<LayoutDashboard size={20} />}
                    title={t("menu.dashboard")}
                    route={APP_BASE}
                    collapsed={collapsed}
                />

                <MenuItem
                    icon={<User size={20} />}
                    title={t("menu.lawyerProfile")}
                    route={`${APP_BASE}/lawyer-profile`}
                    collapsed={collapsed}
                />

                <MenuItem
                    icon={<MapPin size={20} />}
                    title={t("menu.address")}
                    route={`${APP_BASE}/addresses`}
                    collapsed={collapsed}
                />

                <MenuItem
                    icon={<Package size={20} />}
                    title={t("menu.epNumber")}
                    route={`${APP_BASE}/ep-number`}
                    collapsed={collapsed}
                />

                {/* ================= PO BOX ================= */}
                <MenuItem
                    icon={<Home size={20} />}
                    title={t("menu.poBox")}
                    route={`${APP_BASE}/po-box-details`}
                    selectable={false}
                    expandable
                    expanded={poBoxExpanded}
                    collapsed={collapsed}
                />

                <div
                    className={clsx(
                        "overflow-hidden transition-all duration-200",
                        poBoxExpanded ? "max-h-40" : "max-h-0"
                    )}
                >
                    <SubMenuItem
                        title={t("menu.poBoxDetails")}
                        route={`${APP_BASE}/po-box-details`}
                        collapsed={collapsed}
                    />
                    <SubMenuItem
                        title={t("menu.poBoxItems")}
                        route={`${APP_BASE}/po-box-items`}
                        collapsed={collapsed}
                    />
                    <SubMenuItem
                        title={t("menu.iqamaOrder")}
                        route={`${APP_BASE}/iqama-orders`}
                        collapsed={collapsed}
                    />
                </div>

                {/* ================= ORDERS ================= */}
                <MenuItem
                    icon={<ShoppingBag size={20} />}
                    title={t("menu.orders")}
                    route={`${APP_BASE}/delivery-orders`}
                    selectable={false}
                    expandable
                    expanded={ordersExpanded}
                    collapsed={collapsed}
                />

                <div
                    className={clsx(
                        "overflow-hidden transition-all duration-200",
                        ordersExpanded ? "max-h-60" : "max-h-0"
                    )}
                >
                    <SubMenuItem
                        title={t("menu.deliveryOrders")}
                        route={`${APP_BASE}/delivery-orders`}
                        collapsed={collapsed}
                    />
                    <SubMenuItem
                        title={t("menu.internationalOrders")}
                        route={`${APP_BASE}/international-orders`}
                        collapsed={collapsed}
                    />
                    <SubMenuItem
                        title={t("menu.clickShipOrders")}
                        route={`${APP_BASE}/clickship-orders`}
                        collapsed={collapsed}
                    />
                </div>

                <MenuItem
                    icon={<Truck size={20} />}
                    title={t("menu.shipmentTracking")}
                    route={`${APP_BASE}/shipment-tracking`}
                    collapsed={collapsed}
                />

                {/* ================= SUPPORT ================= */}
                <MenuItem
                    icon={<User size={20} />}
                    title={t("menu.support")}
                    route={`${APP_BASE}/settings`}
                    selectable={false}
                    expandable
                    expanded={supportExpanded}
                    collapsed={collapsed}
                />

                <div
                    className={clsx(
                        "overflow-hidden transition-all duration-200",
                        supportExpanded ? "max-h-40" : "max-h-0"
                    )}
                >
                    <SubMenuItem
                        title={t("menu.settings")}
                        route={`${APP_BASE}/settings`}
                        collapsed={collapsed}
                    />
                    <SubMenuItem
                        title={t("menu.help")}
                        route={`${APP_BASE}/help`}
                        collapsed={collapsed}
                    />
                </div>
            </div>

            {/* SIGN OUT */}
            <div className="pt-3 border-t border-[var(--color-white-4)]">
                <button
                    title={collapsed ? t("menu.signOut") : undefined}
                    onClick={() => {
                        clearHomeCache();
                        auth.logout();
                        navigate("/login", { replace: true });
                    }}
                    className={clsx(
                        `
                        flex items-center w-full h-[40px] rounded-[6px]
                        text-sm font-semibold text-red-600
                        hover:bg-red-50 transition-colors
                        px-2 gap-3
                        `
                    )}
                >
                    <span className="w-6 flex justify-center shrink-0">
                        <LogOut size={18} />
                    </span>

                    <span
                        className={clsx(
                            "whitespace-nowrap overflow-hidden transition-all duration-200",
                            collapsed
                                ? "opacity-0 max-w-0"
                                : "opacity-100 max-w-[160px]"
                        )}
                    >
                        {t("menu.signOut")}
                    </span>
                </button>
            </div>
        </aside>
    );
}
