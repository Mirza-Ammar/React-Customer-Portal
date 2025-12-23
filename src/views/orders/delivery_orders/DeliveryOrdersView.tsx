// DeliveryOrdersView.tsx

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import StickyTable from "@/components/table/StickyTable";
import StatusChip from "@/components/table/StatusChip";
import PaginationFooter from "@/components/table/PaginationFooter";

import type { TableColumn } from "@/components/table/TableColumn";
import type { DeliveryOrderData } from "@/datamodels/DeliveryOrderData";
import { DeliveryOrdersViewModel } from "./DeliveryOrdersViewModel";
import { Button } from "@/components/ui/button";

export default function DeliveryOrdersView() {
    const [vm] = useState(() => new DeliveryOrdersViewModel());
    const [, forceUpdate] = useState(0);
    const rebuild = () => forceUpdate(v => v + 1);
    const { t } = useTranslation();

    useEffect(() => {
        vm.initialize();
        rebuild();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ================= TABLE COLUMNS ================= */

    const columns: TableColumn<DeliveryOrderData>[] = [
        {
            flex: 1,
            header: t("deliveryOrders.columns.epCode"),
            cell: i => i.epCode,
        },
        {
            flex: 1.5,
            header: t("deliveryOrders.columns.orderCode"),
            cell: i => i.orderCode,
        },
        {
            flex: 2,
            header: t("deliveryOrders.columns.senderName"),
            cell: i => i.senderName,
        },
        {
            flex: 2,
            header: t("deliveryOrders.columns.receiverName"),
            cell: i => i.receiverName,
        },
        {
            flex: 1.5,
            header: t("deliveryOrders.columns.price"),
            cell: i => i.price,
        },
        {
            flex: 2,
            header: t("deliveryOrders.columns.paymentType"),
            cell: i => i.paymentType,
        },
        {
            flex: 1.8,
            header: t("deliveryOrders.columns.createdDate"),
            cell: i => i.createdAt,
        },
        {
            flex: 1.8,
            header: t("deliveryOrders.columns.updatedDate"),
            cell: i => i.updatedAt,
        },
        {
            flex: 1.5,
            header: t("deliveryOrders.columns.status"),
            align: "center",
            cell: i => {
                if (i.status === "CONFIRMED") {
                    return (
                        <StatusChip
                            label={t("status.confirmed")}
                            variant="success"
                        />
                    );
                }

                if (i.status === "PENDING") {
                    return (
                        <StatusChip
                            label={t("status.pending")}
                            variant="warning"
                        />
                    );
                }

                return (
                    <StatusChip
                        label={t("status.cancelled")}
                        variant="error"
                    />
                );
            },
        },
    ];

    /* ================= VIEW ================= */

    const renderText = (value: string, placeholder: string) =>
        value === "all" ? (
            <span className="text-[var(--color-dark-3)]">
                {placeholder}
            </span>
        ) : (
            <SelectValue />
        );

    return (
        <div className="h-full flex flex-col bg-[var(--color-white-1)] rounded-xl">

            {/* HEADER */}
            <div className="px-4 py-3 flex items-center gap-3">

                {/* SEARCH */}
                <div className="flex-1">
                    <Input
                        placeholder={t("deliveryOrders.searchPlaceholder")}
                        value={vm.search}
                        onChange={e => {
                            vm.onSearchChanged(e.target.value);
                            rebuild();
                        }}
                    />
                </div>

                {/* STATUS */}
                <div className="w-[160px]">
                    <Select
                        value={vm.status}
                        onValueChange={v => {
                            vm.setStatus(v as any);
                            rebuild();
                        }}
                    >
                        <SelectTrigger className="flex justify-between items-center">
                            <div className="flex-1 text-left">
                                {renderText(
                                    vm.status,
                                    t("deliveryOrders.selectStatus")
                                )}
                            </div>
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem
                                value="all"
                                className="text-[var(--color-dark-3)]"
                            >
                                {t("common.all")}
                            </SelectItem>

                            <div className="h-px bg-[var(--color-white-5)] my-1" />

                            <SelectItem value="CONFIRMED">
                                {t("deliveryOrders.status.confirmed")}
                            </SelectItem>
                            <SelectItem value="PENDING">
                                {t("status.pending")}
                            </SelectItem>
                            <SelectItem value="CANCELLED">
                                {t("deliveryOrders.status.cancelled")}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    onClick={() => console.log("")}
                    className="w-[180px] text-white"
                    style={{ backgroundColor: "var(--color-primary)" }}
                >
                    {t("deliveryOrders.requestDelivery")}
                </Button>

            </div>

            {/* TABLE + FOOTER */}
            <div className="flex-1 px-4 pb-4">
                <div className="h-full flex flex-col rounded-lg overflow-hidden">
                    <div className="flex-1 overflow-hidden">
                        <StickyTable
                            items={vm.items}
                            columns={columns}
                            headerHeight={56}
                            rowPadding="px-3 py-4"
                            searchQuery={vm.search}
                        />
                    </div>

                    <PaginationFooter
                        page={vm.page}
                        pageSize={vm.pageSize}
                        totalCount={vm.totalCount}
                        onPageChange={p => { vm.setPage(p); rebuild(); }}
                        onPageSizeChange={s => { vm.setPageSize(s); rebuild(); }}
                        onPrev={() => { vm.previousPage(); rebuild(); }}
                        onNext={() => { vm.nextPage(); rebuild(); }}
                    />
                </div>
            </div>
        </div>
    );
}
