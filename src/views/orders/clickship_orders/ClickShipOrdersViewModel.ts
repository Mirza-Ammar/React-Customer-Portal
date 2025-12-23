// ClickShipOrdersViewModel.ts

import type { ClickShipOrderData, OrderStatus } from "@/datamodels/ClickShipOrderData";


export class ClickShipOrdersViewModel {
    /* ================= STATE ================= */

    search = "";
    status: OrderStatus | "all" = "all";

    private all: ClickShipOrderData[] = [];
    items: ClickShipOrderData[] = [];

    page = 1;
    pageSize = 10;
    totalCount = 0;

    /* ================= INIT ================= */

    initialize() {
        this.all = [
            {
                price: "10,000 IQD",
                weight: null,
                country: "EP-1009",
                trackNumber: "Domestic (Outbound)",
                paymentStatus: "PAID",
                status: "CONFIRMED",
                createdAt: "Dec 1, 2025",
                updatedAt: "Dec 1, 2025",
            },
            {
                price: "10,000 IQD",
                weight: null,
                country: "EP-1009",
                trackNumber: "Domestic (Outbound)",
                paymentStatus: "PAID",
                status: "CONFIRMED",
                createdAt: "Dec 1, 2025",
                updatedAt: "Dec 1, 2025",
            },
        ];

        this.applyFilters();
    }

    /* ================= FILTERS ================= */

    private applyFilters() {
        const q = this.search.trim().toLowerCase();

        const filtered = this.all.filter(i => {
            const matchSearch =
                !q || i.trackNumber.toLowerCase().includes(q);

            const matchStatus =
                this.status === "all" || i.status === this.status;

            return matchSearch && matchStatus;
        });

        this.totalCount = filtered.length;

        const start = (this.page - 1) * this.pageSize;
        this.items = filtered.slice(start, start + this.pageSize);
    }

    /* ================= ACTIONS ================= */

    onSearchChanged(value: string) {
        this.search = value;
        this.page = 1;
        this.applyFilters();
    }

    setStatus(value: OrderStatus | "all") {
        this.status = value;
        this.page = 1;
        this.applyFilters();
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
        const max = Math.ceil(this.totalCount / this.pageSize);
        if (this.page < max) {
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
}
