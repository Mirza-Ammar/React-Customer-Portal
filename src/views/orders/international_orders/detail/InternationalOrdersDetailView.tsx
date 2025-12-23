import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StatusChip from "@/components/table/StatusChip";
import { Button } from "@/components/ui/button";
import { InternationalOrdersDetailViewModel } from "./InternationalOrdersDetailViewModel";
import type { InternationalOrderData } from "@/datamodels/InternationalOrderData";

export default function InternationalOrdersDetailView() {
    const location = useLocation();
    const order = location.state as InternationalOrderData | undefined;
    const { t } = useTranslation();

    const [vm] = useState(() => new InternationalOrdersDetailViewModel());
    const [, forceUpdate] = useState(0);
    const rebuild = () => forceUpdate(v => v + 1);

    useEffect(() => {
        vm.initialize(order);
        rebuild();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const orderData = vm.value;

    const Field = ({
        label,
        value,
    }: {
        label: string;
        value?: React.ReactNode;
    }) => (
        <div className="flex gap-2 text-sm">
            <span className="text-[var(--color-dark-3)] min-w-[160px]">
                {label}
            </span>
            <span className="text-[var(--color-dark-1)]">
                {value ?? "-"}
            </span>
        </div>
    );

    if (!orderData) return null;

    return (
        <div className="h-full p-6 bg-[var(--color-white-1)] rounded-xl space-y-8">
            {/* HEADER */}
            <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold">
                    {t("internationalOrdersDetail.title")}
                </h2>

                <div className="flex gap-2">
                    <Button
                        className="w-[180px] text-white"
                        style={{ backgroundColor: "var(--color-primary)" }}
                    >
                        {t("internationalOrdersDetail.payNow")}
                    </Button>
                    <Button
                        className="w-[180px] text-white"
                        style={{ backgroundColor: "var(--color-primary)" }}
                    >
                        {t("internationalOrdersDetail.shipmentTracking")}
                    </Button>
                </div>
            </div>

            {/* ORDER INFO */}
            <div className="grid grid-cols-2 gap-x-16 gap-y-4">
                <Field
                    label={t("internationalOrdersDetail.fields.orderStatus")}
                    value={
                        <StatusChip
                            label={t(`status.${orderData.status.toLowerCase()}`)}
                            variant={
                                orderData.status === "CONFIRMED"
                                    ? "success"
                                    : orderData.status === "PENDING"
                                        ? "warning"
                                        : "error"
                            }
                        />

                    }
                />
                <Field
                    label={t("internationalOrdersDetail.fields.domesticId")}
                    value={orderData.domesticId}
                />

                <Field
                    label={t("internationalOrdersDetail.fields.currentPlace")}
                    value={"International"}
                />
                <Field
                    label={t("internationalOrdersDetail.fields.createdAt")}
                    value={"Dec 20, 2025, 11:00 AM"}
                />

                <Field
                    label={t("internationalOrdersDetail.fields.price")}
                    value={orderData.price}
                />
                <Field
                    label={t("internationalOrdersDetail.fields.poBoxNumber")}
                    value="ERB-1234"
                />

                <Field
                    label={t("internationalOrdersDetail.fields.shipmentCode")}
                    value={orderData.shipmentCode}
                />
                <Field
                    label={t("internationalOrdersDetail.fields.epNumber")}
                    value={orderData.epPoNumber}
                />

                <Field
                    label={t("internationalOrdersDetail.fields.updatedAt")}
                    value={orderData.updatedAt}
                />
                <Field
                    label={t("internationalOrdersDetail.fields.category")}
                    value={"General"}
                />

                <Field
                    label={t("internationalOrdersDetail.fields.note")}
                    value={"Lorem Ipsum"}
                />
                <Field
                    label={t("internationalOrdersDetail.fields.describeShipment")}
                    value={"Lorem Ipsum"}
                />
            </div>

            {/* PAYMENT INFO */}
            <div className="space-y-4">
                <h3 className="font-semibold text-base">
                    {t("internationalOrdersDetail.payment.title")}
                </h3>

                <div className="grid grid-cols-2 gap-x-16 gap-y-4">
                    <Field
                        label={t("internationalOrdersDetail.payment.status")}
                        value={
                            <StatusChip
                                label={t(`status.${orderData.paymentStatus.toLowerCase()}`)}
                                variant={
                                    orderData.paymentStatus === "PAID"
                                        ? "success"
                                        : "error"
                                }
                            />
                        }
                    />
                    <Field
                        label={t("internationalOrdersDetail.payment.method")}
                        value={"Online"}
                    />
                </div>
            </div>

            {/* PICKUP INFO */}
            <div className="space-y-4">
                <h3 className="font-semibold text-base">
                    {t("internationalOrdersDetail.pickup.title")}
                </h3>

                <div className="grid grid-cols-2 gap-x-16 gap-y-4">
                    <Field
                        label={t("internationalOrdersDetail.pickup.shipperId")}
                        value="10889"
                    />
                    <Field
                        label={t("internationalOrdersDetail.pickup.receiverId")}
                        value="123456"
                    />

                    <Field
                        label={t("internationalOrdersDetail.pickup.shipperAddress")}
                        value="Unit U1, Floor F1, Building B1, Dothan Street, Dothan, ALABAMA, United States"
                    />
                    <Field
                        label={t("internationalOrdersDetail.pickup.receiverAddress")}
                        value="DreamCity, 6X4F+H76, Erbil, Erbil Governorate, Iraq"
                    />
                </div>
            </div>
        </div>
    );
}
