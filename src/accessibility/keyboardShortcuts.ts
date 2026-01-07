import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const APP_BASE = "/app";

const shortcuts: Record<string, string> = {
    "1": APP_BASE, // Dashboard
    "2": `${APP_BASE}/lawyer-profile`,
    "3": `${APP_BASE}/addresses`,
    "4": `${APP_BASE}/ep-number`,
    "5": `${APP_BASE}/po-box-details`,
    "6": `${APP_BASE}/delivery-orders`,
    "7": `${APP_BASE}/shipment-tracking`,
    "8": `${APP_BASE}/settings`,
};

export function useKeyboardShortcuts() {
    const navigate = useNavigate();

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            // Windows/Linux: Ctrl, Mac: Cmd
            const isModifier = e.ctrlKey || e.metaKey;

            if (!isModifier) return;

            const route = shortcuts[e.key];

            if (route) {
                e.preventDefault();
                navigate(route);
            }
        };

        window.addEventListener("keydown", handler);

        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, [navigate]);
}
