// datamodels/PoBoxItemData.ts
export type PoBoxStatus = "RECEIVED" | "DELIVERED" | "PENDING";

export interface PoBoxItemData {
    orderCode: string;
    source: string;
    reference: string;
    description: string;
    note: string;
    location: string;
    createdBy: string;
    createdAt: string;
    status: PoBoxStatus;
}
