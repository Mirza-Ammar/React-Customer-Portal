// InternationalOrderData.ts

export type OrderStatus = "CONFIRMED" | "PENDING" | "CANCELLED";

export interface InternationalOrderData {
    shipmentCode: string;
    domesticId: string | null;
    epPoNumber: string;
    price: string;
    location: string;
    paymentStatus: string;
    status: OrderStatus;
    updatedAt: string;
}
