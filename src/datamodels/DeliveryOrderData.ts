// datamodels/DeliveryOrderData.ts

export type DeliveryOrderStatus = "CONFIRMED" | "PENDING" | "CANCELLED";

export interface DeliveryOrderData {
    epCode: string;
    orderCode: string;
    senderName: string;
    receiverName: string;
    price: string;
    paymentType: string;
    createdAt: string;
    updatedAt: string;
    status: DeliveryOrderStatus;
}
