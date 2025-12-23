// DeliveryOrdersViewModel.ts

import type { DeliveryOrderData, DeliveryOrderStatus } from "@/datamodels/DeliveryOrderData";

export class DeliveryOrdersViewModel {
    /* ================= STATE ================= */

    search = "";
    status: DeliveryOrderStatus | "all" = "all";

    private all: DeliveryOrderData[] = [];
    items: DeliveryOrderData[] = [];

    page = 1;
    pageSize = 10;
    totalCount = 0;

    /* ================= INIT ================= */

    initialize() {
        this.all = [
            {
                epCode: "EP001",
                orderCode: "345677",
                senderName: "John",
                receiverName: "John",
                price: "10,000 IQD",
                paymentType: "Sender Cash",
                createdAt: "Dec 1, 2025",
                updatedAt: "Dec 1, 2025",
                status: "CONFIRMED",
            },
            {
                epCode: "EP001",
                orderCode: "345677",
                senderName: "Errick",
                receiverName: "Errick",
                price: "10,000 IQD",
                paymentType: "Sender Cash",
                createdAt: "Dec 1, 2025",
                updatedAt: "Dec 1, 2025",
                status: "PENDING",
            },
            {
                epCode: "EP001",
                orderCode: "345677",
                senderName: "Errick",
                receiverName: "John",
                price: "10,000 IQD",
                paymentType: "Sender Cash",
                createdAt: "Dec 1, 2025",
                updatedAt: "Dec 1, 2025",
                status: "CANCELLED",
            },
        ];

        this.applyFilters();
    }

    /* ================= FILTERS ================= */

    private applyFilters() {
        const q = this.search.trim().toLowerCase();

        const filtered = this.all.filter(i => {
            const matchSearch =
                !q ||
                i.orderCode.toLowerCase().includes(q) ||
                i.senderName.toLowerCase().includes(q) ||
                i.receiverName.toLowerCase().includes(q);

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

    setStatus(value: DeliveryOrderStatus | "all") {
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
