export type PaymentStatus = "PENDING" | "PAID";

export interface IqamaOrderData {
    identification: string;
    orderCode: string;
    status: string;
    customerName: string;
    receiverName: string;
    receiverPhone: string;
    passport: string;
    price: number;
    paymentType: string;
    paymentStatus: PaymentStatus;
    createdAt: string;
    updatedAt: string;
}
