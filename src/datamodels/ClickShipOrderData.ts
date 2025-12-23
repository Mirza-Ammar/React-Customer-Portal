// ClickShipOrderData.ts

export type OrderStatus = "CONFIRMED" | "PENDING" | "CANCELLED";

export interface ClickShipOrderData {
    price: string;
    weight: string | null;
    country: string;
    trackNumber: string;
    paymentStatus: string;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
}
