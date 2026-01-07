import type { AddressData } from "@/datamodels/AddressData";
import { userAddress } from "@/hooks/userAddress";
import { userAuth } from "@/hooks/userAuth";

type AddressMode = "domestic" | "international";

export class AddressesViewModel {
    /* ======================================================
     * Dependencies
     * ====================================================== */
    private addressService = userAddress();
    private auth = userAuth();

    /* ======================================================
     * State
     * ====================================================== */
    search = "";
    mode: AddressMode = "domestic";

    page = 1;
    pageSize = 10;

    items: AddressData[] = [];
    totalCount = 0;

    isLoading = false;
    error?: string;

    /* ======================================================
     * Internal State
     * ====================================================== */
    private all: AddressData[] = [];
    private cache: Partial<Record<AddressMode, AddressData[]>> = {};

    /* ======================================================
     * Initialization
     * ====================================================== */
    initialize() {
        this.isLoading = true;
        this.items = [];
        this.totalCount = 0;

        return this.loadForMode(this.mode);
    }

    /* ======================================================
     * Data Loading
     * ====================================================== */
    private async loadForMode(mode: AddressMode) {
        const cached = this.cache[mode];

        if (cached) {
            this.all = cached;
            this.page = 1;
            this.applyFilters();
            this.isLoading = false;
            return;
        }

        const user = this.auth.getCurrentUser();
        if (!user) {
            this.error = "User not authenticated";
            this.isLoading = false;
            return;
        }

        try {
            const addresses = await this.addressService.getAddresses({
                supabaseAccessToken: user.supabaseAccessToken,
                mode,
            });

            const filtered = addresses.filter((a) =>
                mode === "domestic"
                    ? a.addressType === "Domestic"
                    : a.addressType === "International"
            );

            this.cache[mode] = filtered;
            this.all = filtered;
            this.page = 1;
            this.applyFilters();
        } catch (e) {
            console.error(e);
            this.all = [];
            this.items = [];
            this.totalCount = 0;
            this.error = "Failed to load addresses";
        } finally {
            this.isLoading = false;
        }
    }

    /* ======================================================
     * Filtering & Pagination
     * ====================================================== */
    private applyFilters() {
        const q = this.search.trim().toLowerCase();

        const filtered = this.all.filter(
            (a) =>
                !q ||
                a.address.toLowerCase().includes(q) ||
                a.label?.toLowerCase().includes(q) ||
                a.phone?.toLowerCase().includes(q)
        );

        this.totalCount = filtered.length;

        const start = (this.page - 1) * this.pageSize;
        this.items = filtered.slice(start, start + this.pageSize);
    }

    /* ======================================================
     * Actions
     * ====================================================== */
    onSearchChanged(value: string) {
        this.search = value;
        this.page = 1;
        this.applyFilters();
    }

    async setMode(mode: AddressMode) {
        if (this.mode === mode) return;

        this.mode = mode;
        this.page = 1;

        if (!this.cache[mode]) {
            this.isLoading = true;
            this.items = [];
            this.totalCount = 0;
        }

        await this.loadForMode(mode);
    }

    setPage(page: number) {
        this.page = page;
        this.applyFilters();
    }

    setPageSize(size: number) {
        this.pageSize = size;
        this.page = 1;
        this.applyFilters();
    }

    nextPage() {
        const maxPage = Math.ceil(this.totalCount / this.pageSize);
        if (this.page < maxPage) {
            this.page++;
            this.applyFilters();
        }
    }

    previousPage() {
        if (this.page > 1) {
            this.page--;
            this.applyFilters();
        }
    }

    /* ======================================================
     * UI Helpers
     * ====================================================== */
    get isEmpty() {
        return !this.isLoading && this.totalCount === 0;
    }

    get isTableLoading() {
        return this.isLoading && this.items.length === 0;
    }

    onAddNew() {
        console.log("[AddressVM] Add new address");
    }
}
