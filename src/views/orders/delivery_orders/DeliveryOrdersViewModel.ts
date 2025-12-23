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
                receiverName: "Ali",
                price: "10,000 IQD",
                paymentType: "Sender Cash",
                createdAt: "Dec 1, 2025",
                updatedAt: "Dec 1, 2025",
                status: "CONFIRMED",
            },
            {
                epCode: "EP002",
                orderCode: "345678",
                senderName: "Errick",
                receiverName: "Sara",
                price: "15,000 IQD",
                paymentType: "Receiver Cash",
                createdAt: "Dec 2, 2025",
                updatedAt: "Dec 2, 2025",
                status: "PENDING",
            },
            {
                epCode: "EP003",
                orderCode: "345679",
                senderName: "Ahmed",
                receiverName: "John",
                price: "8,500 IQD",
                paymentType: "Sender Cash",
                createdAt: "Dec 3, 2025",
                updatedAt: "Dec 3, 2025",
                status: "CANCELLED",
            },
            {
                epCode: "EP004",
                orderCode: "345680",
                senderName: "Lana",
                receiverName: "Mariam",
                price: "20,000 IQD",
                paymentType: "Online Payment",
                createdAt: "Dec 4, 2025",
                updatedAt: "Dec 4, 2025",
                status: "CONFIRMED",
            },
            {
                epCode: "EP005",
                orderCode: "345681",
                senderName: "Omar",
                receiverName: "Hassan",
                price: "12,000 IQD",
                paymentType: "Receiver Cash",
                createdAt: "Dec 5, 2025",
                updatedAt: "Dec 5, 2025",
                status: "PENDING",
            },
            {
                epCode: "EP006",
                orderCode: "345682",
                senderName: "Noor",
                receiverName: "Zain",
                price: "18,000 IQD",
                paymentType: "Sender Cash",
                createdAt: "Dec 6, 2025",
                updatedAt: "Dec 6, 2025",
                status: "CONFIRMED",
            },
            {
                epCode: "EP007",
                orderCode: "345683",
                senderName: "Yousef",
                receiverName: "Kareem",
                price: "9,000 IQD",
                paymentType: "Online Payment",
                createdAt: "Dec 7, 2025",
                updatedAt: "Dec 7, 2025",
                status: "CANCELLED",
            },
            {
                epCode: "EP008",
                orderCode: "345684",
                senderName: "Fatima",
                receiverName: "Aisha",
                price: "25,000 IQD",
                paymentType: "Sender Cash",
                createdAt: "Dec 8, 2025",
                updatedAt: "Dec 8, 2025",
                status: "CONFIRMED",
            },
            {
                epCode: "EP009",
                orderCode: "345685",
                senderName: "Bilal",
                receiverName: "Omar",
                price: "7,500 IQD",
                paymentType: "Receiver Cash",
                createdAt: "Dec 9, 2025",
                updatedAt: "Dec 9, 2025",
                status: "PENDING",
            },
            {
                epCode: "EP010",
                orderCode: "345686",
                senderName: "Zara",
                receiverName: "Nabil",
                price: "30,000 IQD",
                paymentType: "Online Payment",
                createdAt: "Dec 10, 2025",
                updatedAt: "Dec 10, 2025",
                status: "CONFIRMED",
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
