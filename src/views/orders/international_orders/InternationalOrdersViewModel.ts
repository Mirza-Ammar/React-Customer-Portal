// InternationalOrdersViewModel.ts

import type { InternationalOrderData, OrderStatus } from "@/datamodels/InternationalOrderData";


export class InternationalOrdersViewModel {
    /* ================= STATE ================= */

    search = "";
    status: OrderStatus | "all" = "all";

    private all: InternationalOrderData[] = [];
    items: InternationalOrderData[] = [];

    page = 1;
    pageSize = 10;
    totalCount = 0;

    /* ================= INIT ================= */

    initialize() {
        this.all = [
            {
                shipmentCode: "234567",
                domesticId: null,
                epPoNumber: "EP-1009",
                price: "10,000 IQD",
                location: "Domestic (Outbound)",
                paymentStatus: "PAID",
                status: "CONFIRMED",
                updatedAt: "Dec 1, 2025",
            },
            {
                shipmentCode: "234568",
                domesticId: null,
                epPoNumber: "EP-1010",
                price: "15,000 IQD",
                location: "Domestic (Outbound)",
                paymentStatus: "UNPAID",
                status: "PENDING",
                updatedAt: "Dec 1, 2025",
            },
            {
                shipmentCode: "234569",
                domesticId: "DOM-2001",
                epPoNumber: "EP-1011",
                price: "8,500 IQD",
                location: "Domestic (Inbound)",
                paymentStatus: "PAID",
                status: "CONFIRMED",
                updatedAt: "Dec 2, 2025",
            },
            {
                shipmentCode: "234570",
                domesticId: "DOM-2002",
                epPoNumber: "EP-1012",
                price: "20,000 IQD",
                location: "Domestic (Inbound)",
                paymentStatus: "UNPAID",
                status: "PENDING",
                updatedAt: "Dec 2, 2025",
            },
            {
                shipmentCode: "234571",
                domesticId: null,
                epPoNumber: "EP-1013",
                price: "12,000 IQD",
                location: "International (Outbound)",
                paymentStatus: "PAID",
                status: "CONFIRMED",
                updatedAt: "Dec 3, 2025",
            },
            {
                shipmentCode: "234572",
                domesticId: "DOM-2003",
                epPoNumber: "EP-1014",
                price: "18,000 IQD",
                location: "International (Inbound)",
                paymentStatus: "UNPAID",
                status: "CANCELLED",
                updatedAt: "Dec 4, 2025",
            },
            {
                shipmentCode: "234573",
                domesticId: null,
                epPoNumber: "EP-1015",
                price: "9,000 IQD",
                location: "Domestic (Outbound)",
                paymentStatus: "PAID",
                status: "CONFIRMED",
                updatedAt: "Dec 5, 2025",
            },
            {
                shipmentCode: "234574",
                domesticId: "DOM-2004",
                epPoNumber: "EP-1016",
                price: "25,000 IQD",
                location: "International (Outbound)",
                paymentStatus: "PAID",
                status: "CONFIRMED",
                updatedAt: "Dec 6, 2025",
            },
            {
                shipmentCode: "234575",
                domesticId: null,
                epPoNumber: "EP-1017",
                price: "7,500 IQD",
                location: "Domestic (Inbound)",
                paymentStatus: "UNPAID",
                status: "PENDING",
                updatedAt: "Dec 7, 2025",
            },
            {
                shipmentCode: "234576",
                domesticId: "DOM-2005",
                epPoNumber: "EP-1018",
                price: "30,000 IQD",
                location: "International (Inbound)",
                paymentStatus: "PAID",
                status: "CONFIRMED",
                updatedAt: "Dec 8, 2025",
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
                !q ||
                i.shipmentCode.toLowerCase().includes(q) ||
                i.epPoNumber.toLowerCase().includes(q);

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
