// src/pages/dashboard/DashboardViewModel.ts
import { userHome, type HomeData, type Shortcut } from "@/hooks/userHome";

export class DashboardViewModel {
    private homeApi = userHome();

    home: HomeData | null = null;

    /* ================================
     * Computed
     * ================================ */
    get banners(): string[] {
        return this.home?.appBanners ?? [];
    }

    get activeShortcuts(): Shortcut[] {
        if (!this.home) return [];

        return [
            this.home.epWalletShortcut,
            this.home.rateCalulateShortCut,
            this.home.localDeliveryShortcut,
            this.home.internationalShortcut,
            this.home.clickShipShortcut,
            this.home.instantShortcut,
            this.home.iqamaCard,
        ].filter(s => s.isShow);
    }

    /* ================================
     * Actions
     * ================================ */
    async load(force = false): Promise<HomeData> {
        this.home = await this.homeApi.getHome({ force });
        return this.home;
    }

    reset() {
        this.home = null;
    }
}
