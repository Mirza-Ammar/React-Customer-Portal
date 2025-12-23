import type { PoBoxItemData, PoBoxStatus } from "@/datamodels/PoBoxData";

export class PoBoxItemsModel {
    /* ================= STATE ================= */

    search = "";
    date = "all";
    type = "all";
    status: PoBoxStatus | "all" = "all";

    private all: PoBoxItemData[] = [];
    items: PoBoxItemData[] = [];

    page = 1;
    pageSize = 10;
    totalCount = 0;

    /* ================= INIT ================= */

    initialize() {
        this.all = [
            {
                orderCode: "89432",
                source: "Alibaba",
                reference: "REF-2001",
                description: "Computer Parts",
                note: "Fragile",
                location: "Baghdad",
                createdBy: "TechZone",
                createdAt: "Jan 05, 2026",
                status: "RECEIVED",
            },
            {
                orderCode: "11209",
                source: "Amazon",
                reference: "REF-2002",
                description: "Mobile Accessories",
                note: "-",
                location: "Erbil",
                createdBy: "FastShip",
                createdAt: "Jan 07, 2026",
                status: "PENDING",
            },
            {
                orderCode: "45098",
                source: "Noon",
                reference: "REF-2003",
                description: "Home Appliances",
                note: "Handle with care",
                location: "Basra",
                createdBy: "LogiPro",
                createdAt: "Jan 08, 2026",
                status: "DELIVERED",
            },
            {
                orderCode: "-",
                source: "Local Supplier",
                reference: "REF-2004",
                description: "Office Supplies",
                note: "-",
                location: "Sulaymaniyah",
                createdBy: "OfficeMart",
                createdAt: "Jan 10, 2026",
                status: "RECEIVED",
            },
            {
                orderCode: "77881",
                source: "Starlink",
                reference: "REF-2005",
                description: "Networking Devices",
                note: "Urgent",
                location: "Erbil",
                createdBy: "Builderking",
                createdAt: "Jan 12, 2026",
                status: "PENDING",
            },
            {
                orderCode: "66321",
                source: "Ebay",
                reference: "REF-2006",
                description: "Used Electronics",
                note: "-",
                location: "UAE",
                createdBy: "Eagle post",
                createdAt: "Jan 13, 2026",
                status: "DELIVERED",
            },
            {
                orderCode: "99107",
                source: "Amazon",
                reference: "REF-2007",
                description: "Smart Devices",
                note: "Keep dry",
                location: "Erbil",
                createdBy: "FastShip",
                createdAt: "Jan 14, 2026",
                status: "RECEIVED",
            },
            {
                orderCode: "34002",
                source: "Iqma office",
                reference: "REF-2008",
                description: "-",
                note: "Check documents",
                location: "UAE",
                createdBy: "Eagle post",
                createdAt: "Jan 15, 2026",
                status: "DELIVERED",
            },
            {
                orderCode: "55670",
                source: "Alibaba",
                reference: "REF-2009",
                description: "Industrial Tools",
                note: "Heavy",
                location: "Kirkuk",
                createdBy: "TradeLink",
                createdAt: "Jan 16, 2026",
                status: "PENDING",
            },
            {
                orderCode: "88014",
                source: "Local Market",
                reference: "REF-2010",
                description: "Electrical Materials",
                note: "-",
                location: "Najaf",
                createdBy: "SupplyHub",
                createdAt: "Jan 18, 2026",
                status: "RECEIVED",
            },
        ];

        this.applyFilters();
    }

    /* ================= FILTERS ================= */

    private applyFilters() {
        const q = this.search.trim().toLowerCase();

        const filtered = this.all.filter((i) => {
            const matchSearch =
                !q ||
                i.orderCode.toLowerCase().includes(q) ||
                i.source.toLowerCase().includes(q) ||
                i.reference.toLowerCase().includes(q);

            const matchStatus =
                this.status === "all" || i.status === this.status;

            // date & type are placeholders for now
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

    setDate(value: string) {
        this.date = value;
        this.page = 1;
        this.applyFilters();
    }

    setType(value: string) {
        this.type = value;
        this.page = 1;
        this.applyFilters();
    }

    setStatus(value: PoBoxStatus | "all") {
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
