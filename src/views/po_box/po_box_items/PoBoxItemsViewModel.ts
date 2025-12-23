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
                orderCode: "-",
                source: "Amazon",
                reference: "REF-1234",
                description: "Electronics",
                note: "Handle",
                location: "Erbil",
                createdBy: "Builderking",
                createdAt: "Nov 19, 2025",
                status: "RECEIVED",
            },
            {
                orderCode: "76544",
                source: "Iqma office",
                reference: "REF-9876",
                description: "Electronics",
                note: "-",
                location: "UAE",
                createdBy: "Eagle post",
                createdAt: "Nov 19, 2025",
                status: "DELIVERED",
            },
            {
                orderCode: "6566",
                source: "Starlink",
                reference: "REF-675",
                description: "-",
                note: "Handle",
                location: "Erbil",
                createdBy: "Builderking",
                createdAt: "Dec 20, 2025",
                status: "PENDING",
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
