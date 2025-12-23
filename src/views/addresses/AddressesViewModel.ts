import type { AddressData } from "@/datamodels/AddressData";

export class AddressesViewModel {
    /* ================= STATE ================= */

    search = "";
    mode: "domestic" | "international" = "domestic";

    private all: AddressData[] = [];
    items: AddressData[] = [];
    totalCount = 0;

    page = 1;
    pageSize = 10; // ✅ DEFAULT = 10

    /* ================= INIT ================= */

    initialize() {
        this.all = [
            {
                address: "6275+3CJ, Erbil, Erbil Governorate, Iraq",
                phone: "9647507836447",
                label: "Office",
                note: "-",
                inUse: false,
            },
            {
                address: "4XMX+X78, 120 Meter St, Erbil, Iraq",
                phone: "9647505451140",
                label: "Apartment",
                note: "Near mall",
                inUse: true,
            },
            {
                address: "Mumbai Rd, Erbil, Iraq",
                phone: "9647700000000",
                label: "Home",
                note: "",
                inUse: false,
            },
            {
                address: "Dream City, Erbil, Iraq",
                phone: "9647511111111",
                label: "Villa",
                note: "Gate 2",
                inUse: false,
            },
            {
                address: "Italian City, Erbil, Iraq",
                phone: "9647522222222",
                label: "Family House",
                note: "",
                inUse: true,
            },
            {
                address: "Naz City, Erbil, Iraq",
                phone: "9647533333333",
                label: "Work",
                note: "Building A",
                inUse: false,
            },
            {
                address: "Ankawa, Erbil, Iraq",
                phone: "9647544444444",
                label: "Friend",
                note: "",
                inUse: false,
            },
            {
                address: "Bakhtiari, Erbil, Iraq",
                phone: "9647555555555",
                label: "Shop",
                note: "Corner store",
                inUse: true,
            },
            {
                address: "Shorsh, Erbil, Iraq",
                phone: "9647566666666",
                label: "Warehouse",
                note: "",
                inUse: false,
            },
            {
                address: "Zanko Village, Erbil, Iraq",
                phone: "9647577777777",
                label: "Dorm",
                note: "Block C",
                inUse: false,
            },
            {
                address: "60 Meter St, Erbil, Iraq",
                phone: "9647588888888",
                label: "Office 2",
                note: "",
                inUse: true,
            },
            {
                address: "100 Meter St, Erbil, Iraq",
                phone: "9647599999999",
                label: "Branch",
                note: "2nd floor",
                inUse: false,
            },
            {
                address: "Runaki, Erbil, Iraq",
                phone: "9647600000001",
                label: "Relative",
                note: "",
                inUse: false,
            },
            {
                address: "Azadi, Erbil, Iraq",
                phone: "9647600000002",
                label: "Old Home",
                note: "",
                inUse: false,
            },
            {
                address: "Iskan, Erbil, Iraq",
                phone: "9647600000003",
                label: "Rental",
                note: "Temporary",
                inUse: true,
            },
            {
                address: "Sami Abdulrahman Park, Erbil, Iraq",
                phone: "9647600000004",
                label: "Park Office",
                note: "",
                inUse: false,
            },
            {
                address: "Airport Rd, Erbil, Iraq",
                phone: "9647600000005",
                label: "Logistics",
                note: "",
                inUse: false,
            },
            {
                address: "Gulan St, Erbil, Iraq",
                phone: "9647600000006",
                label: "Studio",
                note: "",
                inUse: true,
            },
            {
                address: "Mahabad, Erbil, Iraq",
                phone: "9647600000007",
                label: "Secondary Home",
                note: "",
                inUse: false,
            },
            {
                address: "Shaqlawa Rd, Erbil, Iraq",
                phone: "9647600000008",
                label: "Farm",
                note: "Outside city",
                inUse: false,
            },
            {
                address: "6275+3CJ, Erbil, Erbil Governorate, Iraq",
                phone: "9647507836447",
                label: "Office",
                note: "-",
                inUse: false,
            },
            {
                address: "4XMX+X78, 120 Meter St, Erbil, Iraq",
                phone: "9647505451140",
                label: "Apartment",
                note: "Near mall",
                inUse: true,
            },
            {
                address: "Mumbai Rd, Erbil, Iraq",
                phone: "9647700000000",
                label: "Home",
                note: "",
                inUse: false,
            },
            {
                address: "Dream City, Erbil, Iraq",
                phone: "9647511111111",
                label: "Villa",
                note: "Gate 2",
                inUse: false,
            },
            {
                address: "Italian City, Erbil, Iraq",
                phone: "9647522222222",
                label: "Family House",
                note: "",
                inUse: true,
            },
            {
                address: "Naz City, Erbil, Iraq",
                phone: "9647533333333",
                label: "Work",
                note: "Building A",
                inUse: false,
            },
            {
                address: "Ankawa, Erbil, Iraq",
                phone: "9647544444444",
                label: "Friend",
                note: "",
                inUse: false,
            },
            {
                address: "Bakhtiari, Erbil, Iraq",
                phone: "9647555555555",
                label: "Shop",
                note: "Corner store",
                inUse: true,
            },
            {
                address: "Shorsh, Erbil, Iraq",
                phone: "9647566666666",
                label: "Warehouse",
                note: "",
                inUse: false,
            },
            {
                address: "Zanko Village, Erbil, Iraq",
                phone: "9647577777777",
                label: "Dorm",
                note: "Block C",
                inUse: false,
            },
            {
                address: "60 Meter St, Erbil, Iraq",
                phone: "9647588888888",
                label: "Office 2",
                note: "",
                inUse: true,
            },
            {
                address: "100 Meter St, Erbil, Iraq",
                phone: "9647599999999",
                label: "Branch",
                note: "2nd floor",
                inUse: false,
            },
            {
                address: "Runaki, Erbil, Iraq",
                phone: "9647600000001",
                label: "Relative",
                note: "",
                inUse: false,
            },
            {
                address: "Azadi, Erbil, Iraq",
                phone: "9647600000002",
                label: "Old Home",
                note: "",
                inUse: false,
            },
            {
                address: "Iskan, Erbil, Iraq",
                phone: "9647600000003",
                label: "Rental",
                note: "Temporary",
                inUse: true,
            },
            {
                address: "Sami Abdulrahman Park, Erbil, Iraq",
                phone: "9647600000004",
                label: "Park Office",
                note: "",
                inUse: false,
            },
            {
                address: "Airport Rd, Erbil, Iraq",
                phone: "9647600000005",
                label: "Logistics",
                note: "",
                inUse: false,
            },
            {
                address: "Gulan St, Erbil, Iraq",
                phone: "9647600000006",
                label: "Studio",
                note: "",
                inUse: true,
            },
            {
                address: "Mahabad, Erbil, Iraq",
                phone: "9647600000007",
                label: "Secondary Home",
                note: "",
                inUse: false,
            },
            {
                address: "Shaqlawa Rd, Erbil, Iraq",
                phone: "9647600000008",
                label: "Farm",
                note: "Outside city",
                inUse: false,
            },
            {
                address: "6275+3CJ, Erbil, Erbil Governorate, Iraq",
                phone: "9647507836447",
                label: "Office",
                note: "-",
                inUse: false,
            },
            {
                address: "4XMX+X78, 120 Meter St, Erbil, Iraq",
                phone: "9647505451140",
                label: "Apartment",
                note: "Near mall",
                inUse: true,
            },
            {
                address: "Mumbai Rd, Erbil, Iraq",
                phone: "9647700000000",
                label: "Home",
                note: "",
                inUse: false,
            },
            {
                address: "Dream City, Erbil, Iraq",
                phone: "9647511111111",
                label: "Villa",
                note: "Gate 2",
                inUse: false,
            },
            {
                address: "Italian City, Erbil, Iraq",
                phone: "9647522222222",
                label: "Family House",
                note: "",
                inUse: true,
            },
            {
                address: "Naz City, Erbil, Iraq",
                phone: "9647533333333",
                label: "Work",
                note: "Building A",
                inUse: false,
            },
            {
                address: "Ankawa, Erbil, Iraq",
                phone: "9647544444444",
                label: "Friend",
                note: "",
                inUse: false,
            },
            {
                address: "Bakhtiari, Erbil, Iraq",
                phone: "9647555555555",
                label: "Shop",
                note: "Corner store",
                inUse: true,
            },
            {
                address: "Shorsh, Erbil, Iraq",
                phone: "9647566666666",
                label: "Warehouse",
                note: "",
                inUse: false,
            },
            {
                address: "Zanko Village, Erbil, Iraq",
                phone: "9647577777777",
                label: "Dorm",
                note: "Block C",
                inUse: false,
            },
            {
                address: "60 Meter St, Erbil, Iraq",
                phone: "9647588888888",
                label: "Office 2",
                note: "",
                inUse: true,
            },
            {
                address: "100 Meter St, Erbil, Iraq",
                phone: "9647599999999",
                label: "Branch",
                note: "2nd floor",
                inUse: false,
            },
            {
                address: "Runaki, Erbil, Iraq",
                phone: "9647600000001",
                label: "Relative",
                note: "",
                inUse: false,
            },
            {
                address: "Azadi, Erbil, Iraq",
                phone: "9647600000002",
                label: "Old Home",
                note: "",
                inUse: false,
            },
            {
                address: "Iskan, Erbil, Iraq",
                phone: "9647600000003",
                label: "Rental",
                note: "Temporary",
                inUse: true,
            },
            {
                address: "Sami Abdulrahman Park, Erbil, Iraq",
                phone: "9647600000004",
                label: "Park Office",
                note: "",
                inUse: false,
            },
            {
                address: "Airport Rd, Erbil, Iraq",
                phone: "9647600000005",
                label: "Logistics",
                note: "",
                inUse: false,
            },
            {
                address: "Gulan St, Erbil, Iraq",
                phone: "9647600000006",
                label: "Studio",
                note: "",
                inUse: true,
            },
            {
                address: "Mahabad, Erbil, Iraq",
                phone: "9647600000007",
                label: "Secondary Home",
                note: "",
                inUse: false,
            },
            {
                address: "Shaqlawa Rd, Erbil, Iraq",
                phone: "9647600000008",
                label: "Farm",
                note: "Outside city",
                inUse: false,
            },
            {
                address: "6275+3CJ, Erbil, Erbil Governorate, Iraq",
                phone: "9647507836447",
                label: "Office",
                note: "-",
                inUse: false,
            },
            {
                address: "4XMX+X78, 120 Meter St, Erbil, Iraq",
                phone: "9647505451140",
                label: "Apartment",
                note: "Near mall",
                inUse: true,
            },
            {
                address: "Mumbai Rd, Erbil, Iraq",
                phone: "9647700000000",
                label: "Home",
                note: "",
                inUse: false,
            },
            {
                address: "Dream City, Erbil, Iraq",
                phone: "9647511111111",
                label: "Villa",
                note: "Gate 2",
                inUse: false,
            },
            {
                address: "Italian City, Erbil, Iraq",
                phone: "9647522222222",
                label: "Family House",
                note: "",
                inUse: true,
            },
            {
                address: "Naz City, Erbil, Iraq",
                phone: "9647533333333",
                label: "Work",
                note: "Building A",
                inUse: false,
            },
            {
                address: "Ankawa, Erbil, Iraq",
                phone: "9647544444444",
                label: "Friend",
                note: "",
                inUse: false,
            },
            {
                address: "Bakhtiari, Erbil, Iraq",
                phone: "9647555555555",
                label: "Shop",
                note: "Corner store",
                inUse: true,
            },
            {
                address: "Shorsh, Erbil, Iraq",
                phone: "9647566666666",
                label: "Warehouse",
                note: "",
                inUse: false,
            },
            {
                address: "Zanko Village, Erbil, Iraq",
                phone: "9647577777777",
                label: "Dorm",
                note: "Block C",
                inUse: false,
            },
            {
                address: "60 Meter St, Erbil, Iraq",
                phone: "9647588888888",
                label: "Office 2",
                note: "",
                inUse: true,
            },
            {
                address: "100 Meter St, Erbil, Iraq",
                phone: "9647599999999",
                label: "Branch",
                note: "2nd floor",
                inUse: false,
            },
            {
                address: "Runaki, Erbil, Iraq",
                phone: "9647600000001",
                label: "Relative",
                note: "",
                inUse: false,
            },
            {
                address: "Azadi, Erbil, Iraq",
                phone: "9647600000002",
                label: "Old Home",
                note: "",
                inUse: false,
            },
            {
                address: "Iskan, Erbil, Iraq",
                phone: "9647600000003",
                label: "Rental",
                note: "Temporary",
                inUse: true,
            },
            {
                address: "Sami Abdulrahman Park, Erbil, Iraq",
                phone: "9647600000004",
                label: "Park Office",
                note: "",
                inUse: false,
            },
            {
                address: "Airport Rd, Erbil, Iraq",
                phone: "9647600000005",
                label: "Logistics",
                note: "",
                inUse: false,
            },
            {
                address: "Gulan St, Erbil, Iraq",
                phone: "9647600000006",
                label: "Studio",
                note: "",
                inUse: true,
            },
            {
                address: "Mahabad, Erbil, Iraq",
                phone: "9647600000007",
                label: "Secondary Home",
                note: "",
                inUse: false,
            },
            {
                address: "Shaqlawa Rd, Erbil, Iraq",
                phone: "9647600000008",
                label: "Farm",
                note: "Outside city",
                inUse: false,
            },
        ]


        this.applyFilters();
    }

    /* ================= FILTERS ================= */

    private applyFilters() {
        const q = this.search.trim().toLowerCase();

        const filtered = this.all.filter((a) => {
            const matchQuery =
                !q ||
                a.address.toLowerCase().includes(q) ||
                a.label?.toLowerCase().includes(q) ||
                a.phone?.toLowerCase().includes(q);

            const matchMode = this.mode === "domestic";
            return matchQuery && matchMode;
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

    setMode(mode: "domestic" | "international") {
        this.mode = mode;
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
        const maxPage = Math.max(1, Math.ceil(this.totalCount / this.pageSize));
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

    onAddNew() {
        console.log("Add new address");
    }
}
