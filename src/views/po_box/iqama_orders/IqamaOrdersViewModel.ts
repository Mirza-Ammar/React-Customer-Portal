import type { IqamaOrderData } from "@/datamodels/IqamaOrderData";

export class IqamaOrdersModel {
    /* ================= STATE ================= */

    search = "";

    private all: IqamaOrderData[] = [];
    items: IqamaOrderData[] = [];

    page = 1;
    pageSize = 10;
    totalCount = 0;

    /* ================= INIT ================= */

    initialize() {
        this.all = [
            {
                identification: "EP: EP-1234 PO: ERB-1234",
                orderCode: "435768",
                status: "435768",
                customerName: "Rasha T",
                receiverName: "John Ray",
                receiverPhone: "+9649876543214",
                passport: "6754545454",
                price: 5000,
                paymentType: "Wallet",
                paymentStatus: "PENDING",
                createdAt: "2 Jul, 2025",
                updatedAt: "2 Jul, 2025",
            },
            {
                identification: "EP: EP-9876",
                orderCode: "435769",
                status: "435769",
                customerName: "John",
                receiverName: "Adam Smith",
                receiverPhone: "+9649876549999",
                passport: "88888545454",
                price: 7000,
                paymentType: "Cash",
                paymentStatus: "PAID",
                createdAt: "3 Jul, 2025",
                updatedAt: "3 Jul, 2025",
            },
            {
                identification: "",
                orderCode: "435770",
                status: "435770",
                customerName: "Melissa",
                receiverName: "Sara Lee",
                receiverPhone: "+9649876511111",
                passport: "77777454545",
                price: 6500,
                paymentType: "Wallet",
                paymentStatus: "PENDING",
                createdAt: "4 Jul, 2025",
                updatedAt: "4 Jul, 2025",
            },
        ];

        this.applyFilters();
    }

    /* ================= FILTER + PAGINATION ================= */

    private applyFilters() {
        const q = this.search.trim().toLowerCase();

        const filtered = this.all.filter(i => {
            if (!q) return true;

            return (
                i.identification.toLowerCase().includes(q) ||
                i.orderCode.toLowerCase().includes(q) ||
                i.customerName.toLowerCase().includes(q) ||
                i.receiverName.toLowerCase().includes(q) ||
                i.passport.toLowerCase().includes(q) ||
                (i.identification ?? "").toLowerCase().includes(q)
            );
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
