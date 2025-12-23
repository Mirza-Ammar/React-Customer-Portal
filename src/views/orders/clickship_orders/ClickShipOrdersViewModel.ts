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
                country: "Iraq",
                trackNumber: "TRK-100001",
                paymentStatus: "PAID",
                status: "CONFIRMED",
                createdAt: "Dec 1, 2025",
                updatedAt: "Dec 1, 2025",
            },
            {
                price: "15,000 IQD",
                weight: "2.5 kg",
                country: "Jordan",
                trackNumber: "TRK-100002",
                paymentStatus: "UNPAID",
                status: "PENDING",
                createdAt: "Dec 2, 2025",
                updatedAt: "Dec 2, 2025",
            },
            {
                price: "8,000 IQD",
                weight: "1 kg",
                country: "Turkey",
                trackNumber: "TRK-100003",
                paymentStatus: "PAID",
                status: "CONFIRMED",
                createdAt: "Dec 3, 2025",
                updatedAt: "Dec 3, 2025",
            },
            {
                price: "20,000 IQD",
                weight: "5 kg",
                country: "UAE",
                trackNumber: "TRK-100004",
                paymentStatus: "UNPAID",
                status: "CANCELLED",
                createdAt: "Dec 4, 2025",
                updatedAt: "Dec 4, 2025",
            },
            {
                price: "12,500 IQD",
                weight: null,
                country: "Saudi Arabia",
                trackNumber: "TRK-100005",
                paymentStatus: "PAID",
                status: "CONFIRMED",
                createdAt: "Dec 5, 2025",
                updatedAt: "Dec 5, 2025",
            },
            {
                price: "18,000 IQD",
                weight: "3 kg",
                country: "Lebanon",
                trackNumber: "TRK-100006",
                paymentStatus: "PAID",
                status: "CONFIRMED",
                createdAt: "Dec 6, 2025",
                updatedAt: "Dec 6, 2025",
            },
            {
                price: "9,000 IQD",
                weight: "0.8 kg",
                country: "Kuwait",
                trackNumber: "TRK-100007",
                paymentStatus: "UNPAID",
                status: "PENDING",
                createdAt: "Dec 7, 2025",
                updatedAt: "Dec 7, 2025",
            },
            {
                price: "25,000 IQD",
                weight: "6 kg",
                country: "Qatar",
                trackNumber: "TRK-100008",
                paymentStatus: "PAID",
                status: "CANCELLED",
                createdAt: "Dec 8, 2025",
                updatedAt: "Dec 8, 2025",
            },
            {
                price: "7,500 IQD",
                weight: null,
                country: "Bahrain",
                trackNumber: "TRK-100009",
                paymentStatus: "UNPAID",
                status: "CANCELLED",
                createdAt: "Dec 9, 2025",
                updatedAt: "Dec 9, 2025",
            },
            {
                price: "30,000 IQD",
                weight: "10 kg",
                country: "Egypt",
                trackNumber: "TRK-100010",
                paymentStatus: "PAID",
                status: "CONFIRMED",
                createdAt: "Dec 10, 2025",
                updatedAt: "Dec 10, 2025",
            },
        ];
        ;

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
