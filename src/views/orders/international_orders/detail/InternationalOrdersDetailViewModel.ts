import type { InternationalOrderData } from "@/datamodels/InternationalOrderData";

export class InternationalOrdersDetailViewModel {
    order?: InternationalOrderData;

    initialize(data?: InternationalOrderData) {
        this.order = data;
    }

    get value() {
        return this.order;
    }
}
