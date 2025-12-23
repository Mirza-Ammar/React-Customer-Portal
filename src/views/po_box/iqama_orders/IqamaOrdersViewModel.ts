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
                identification: "EP: EP-2233 PO: ERB-2233",
                orderCode: "435771",
                status: "435771",
                customerName: "Ali Hassan",
                receiverName: "Mohammed Kareem",
                receiverPhone: "+9649876500001",
                passport: "1234567890",
                price: 5500,
                paymentType: "Wallet",
                paymentStatus: "PENDING",
                createdAt: "5 Jul, 2025",
                updatedAt: "5 Jul, 2025",
            },
            {
                identification: "EP: EP-2234",
                orderCode: "435772",
                status: "435772",
                customerName: "Noor Ahmed",
                receiverName: "Lana Saeed",
                receiverPhone: "+9649876500002",
                passport: "2234567890",
                price: 8000,
                paymentType: "Cash",
                paymentStatus: "PAID",
                createdAt: "6 Jul, 2025",
                updatedAt: "6 Jul, 2025",
            },
            {
                identification: "",
                orderCode: "435773",
                status: "435773",
                customerName: "Omar Khalid",
                receiverName: "Yazan Ali",
                receiverPhone: "+9649876500003",
                passport: "3234567890",
                price: 6200,
                paymentType: "Wallet",
                paymentStatus: "PENDING",
                createdAt: "7 Jul, 2025",
                updatedAt: "7 Jul, 2025",
            },
            {
                identification: "EP: EP-2235 PO: ERB-2235",
                orderCode: "435774",
                status: "435774",
                customerName: "Sara Mahmood",
                receiverName: "Huda Salman",
                receiverPhone: "+9649876500004",
                passport: "4234567890",
                price: 9000,
                paymentType: "Cash",
                paymentStatus: "PAID",
                createdAt: "8 Jul, 2025",
                updatedAt: "8 Jul, 2025",
            },
            {
                identification: "EP: EP-2236",
                orderCode: "435775",
                status: "435775",
                customerName: "Kareem Adel",
                receiverName: "Hassan Fadil",
                receiverPhone: "+9649876500005",
                passport: "5234567890",
                price: 4800,
                paymentType: "Wallet",
                paymentStatus: "PENDING",
                createdAt: "9 Jul, 2025",
                updatedAt: "9 Jul, 2025",
            },
            {
                identification: "",
                orderCode: "435776",
                status: "435776",
                customerName: "Zainab Ali",
                receiverName: "Mariam Qasim",
                receiverPhone: "+9649876500006",
                passport: "6234567890",
                price: 7600,
                paymentType: "Cash",
                paymentStatus: "PAID",
                createdAt: "10 Jul, 2025",
                updatedAt: "10 Jul, 2025",
            },
            {
                identification: "EP: EP-2237 PO: ERB-2237",
                orderCode: "435777",
                status: "435777",
                customerName: "Yousef Nabil",
                receiverName: "Ahmed Rami",
                receiverPhone: "+9649876500007",
                passport: "7234567890",
                price: 8300,
                paymentType: "Wallet",
                paymentStatus: "PENDING",
                createdAt: "11 Jul, 2025",
                updatedAt: "11 Jul, 2025",
            },
            {
                identification: "EP: EP-2238",
                orderCode: "435778",
                status: "435778",
                customerName: "Dalia Samir",
                receiverName: "Rana Firas",
                receiverPhone: "+9649876500008",
                passport: "8234567890",
                price: 6700,
                paymentType: "Cash",
                paymentStatus: "PAID",
                createdAt: "12 Jul, 2025",
                updatedAt: "12 Jul, 2025",
            },
            {
                identification: "",
                orderCode: "435779",
                status: "435779",
                customerName: "Bilal Hamza",
                receiverName: "Sami Joud",
                receiverPhone: "+9649876500009",
                passport: "9234567890",
                price: 5100,
                paymentType: "Wallet",
                paymentStatus: "PENDING",
                createdAt: "13 Jul, 2025",
                updatedAt: "13 Jul, 2025",
            },
            {
                identification: "EP: EP-2239 PO: ERB-2239",
                orderCode: "435780",
                status: "435780",
                customerName: "Hiba Nasser",
                receiverName: "Ola Hassan",
                receiverPhone: "+9649876500010",
                passport: "1034567890",
                price: 9500,
                paymentType: "Cash",
                paymentStatus: "PAID",
                createdAt: "14 Jul, 2025",
                updatedAt: "14 Jul, 2025",
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
