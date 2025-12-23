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
} from "lucide-react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

/** Base path for layout routes */
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
};

function MenuItem({
    icon,
    title,
    route,
    selectable = true,
    expandable,
    expanded,
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
            onClick={() => navigate(route)}
            className={clsx(
                `
                flex items-center gap-3
                h-[40px] px-4 py-2 rounded-[6px]
                text-sm font-semibold transition-colors w-full
                `,
                isSelected
                    ? "bg-[var(--color-secondary)] text-[var(--color-dark-1)]"
                    : "text-[var(--color-dark-2)] hover:bg-[var(--color-white-4)]"
            )}
        >
            <span className="w-6 flex justify-center shrink-0">
                {icon}
            </span>

            <span className="truncate text-right">
                {title}
            </span>

            {expandable && (
                <ChevronRight
                    size={16}
                    className={clsx(
                        "ms-auto shrink-0 transition-transform duration-200",
                        expanded && "rotate-90"
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
}: {
    title: string;
    route: string;
}) {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isSelected =
        pathname === route || pathname.startsWith(route + "/");

    return (
        <button
            onClick={() => navigate(route)}
            className={clsx(
                `
                flex items-center gap-3
                h-[36px] px-4 py-2 rounded-[6px]
                text-[13px] transition-colors w-full
                me-6
                `,
                isSelected
                    ? "bg-[var(--color-secondary)] text-[var(--color-dark-1)] font-bold"
                    : "text-[var(--color-dark-2)] hover:bg-[var(--color-white-4)] font-semibold"
            )}
        >
            <span className="w-3 flex justify-center shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            </span>

            <span className="truncate text-right">
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
        <aside className="w-[268px] h-full bg-white rounded-[20px] shadow p-4 flex flex-col overflow-hidden">
            <div className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden">

                <MenuItem
                    icon={<LayoutDashboard size={20} />}
                    title={t("menu.dashboard")}
                    route={APP_BASE}
                />

                <MenuItem
                    icon={<User size={20} />}
                    title={t("menu.lawyerProfile")}
                    route={`${APP_BASE}/lawyer-profile`}
                />

                <MenuItem
                    icon={<MapPin size={20} />}
                    title={t("menu.address")}
                    route={`${APP_BASE}/addresses`}
                />

                <MenuItem
                    icon={<Package size={20} />}
                    title={t("menu.epNumber")}
                    route={`${APP_BASE}/ep-number`}
                />

                {/* ================= PO BOX ================= */}
                <MenuItem
                    icon={<Home size={20} />}
                    title={t("menu.poBox")}
                    route={`${APP_BASE}/po-box-details`}
                    selectable={false}
                    expandable
                    expanded={poBoxExpanded}
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
                    />
                    <SubMenuItem
                        title={t("menu.poBoxItems")}
                        route={`${APP_BASE}/po-box-items`}
                    />
                    <SubMenuItem
                        title={t("menu.iqamaOrder")}
                        route={`${APP_BASE}/iqama-orders`}
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
                    />
                    <SubMenuItem
                        title={t("menu.internationalOrders")}
                        route={`${APP_BASE}/international-orders`}
                    />
                    <SubMenuItem
                        title={t("menu.clickShipOrders")}
                        route={`${APP_BASE}/clickship-orders`}
                    />
                </div>

                <MenuItem
                    icon={<Truck size={20} />}
                    title={t("menu.shipmentTracking")}
                    route={`${APP_BASE}/shipment-tracking`}
                />

                {/* ================= SUPPORT ================= */}
                <MenuItem
                    icon={<User size={20} />}
                    title={t("menu.support")}
                    route={`${APP_BASE}/settings`}
                    selectable={false}
                    expandable
                    expanded={supportExpanded}
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
                    />
                    <SubMenuItem
                        title={t("menu.help")}
                        route={`${APP_BASE}/help`}
                    />
                </div>
            </div>
        </aside>
    );
}
