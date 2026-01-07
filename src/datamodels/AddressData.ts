export type AddressData = {
    id: number;
    address: string;
    phone?: string;
    label?: string;
    note?: string;
    inUse: boolean;
    addressType: "Domestic" | "International";
};
