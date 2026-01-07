import { Outlet } from "react-router-dom";
import Header from "@/components/table/Header";
import SideMenu from "@/components/table/SideMenu";
import { useDirection } from "@/i18n/useDirection"; // 👈 ADD THIS
import { useKeyboardShortcuts } from "@/accessibility/keyboardShortcuts";

export default function AppLayout() {
    useDirection(); // 👈 CALL IT HERE (TOP LEVEL)
    useKeyboardShortcuts();

    return (
        <div className="h-screen flex flex-col bg-[var(--color-page-background)]">
            {/* HEADER */}
            <Header />

            {/* BODY */}
            <div className="flex flex-1 overflow-hidden p-4 gap-4">
                <SideMenu />

                <main className="flex-1 bg-[var(--color-white-1)] rounded-2xl overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
