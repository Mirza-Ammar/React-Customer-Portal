import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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
import { Button } from "@/components/ui/button";

import type { TableColumn } from "@/components/table/TableColumn";
import type { InternationalOrderData } from "@/datamodels/InternationalOrderData";
import { InternationalOrdersViewModel } from "./InternationalOrdersViewModel";

export default function InternationalOrdersView() {
    const [vm] = useState(() => new InternationalOrdersViewModel());
    const [, forceUpdate] = useState(0);
    const rebuild = () => forceUpdate(v => v + 1);

    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        vm.initialize();
        rebuild();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ================= TABLE COLUMNS ================= */

    const columns: TableColumn<InternationalOrderData>[] = [
        {
            flex: 1.3,
            header: t("internationalOrders.columns.shipmentCode"),
            cell: i => i.shipmentCode,
        },
        {
            flex: 1,
            header: t("internationalOrders.columns.domesticId"),
            cell: i => i.domesticId ?? "-",
        },
        {
            flex: 1.2,
            header: t("internationalOrders.columns.epPoNumber"),
            cell: i => i.epPoNumber,
        },
        {
            flex: 1.2,
            header: t("internationalOrders.columns.price"),
            cell: i => i.price,
        },
        {
            flex: 1.3,
            header: t("internationalOrders.columns.location"),
            cell: i => i.location,
        },
        {
            flex: 1.3,
            header: t("internationalOrders.columns.paymentStatus"),
            align: "center",
            cell: i => {
                if (i.paymentStatus === "PAID") {
                    return (
                        <StatusChip
                            label={t("status.paid")}
                            variant="success"
                        />
                    );
                }

                return (
                    <StatusChip
                        label={t("status.unpaid")}
                        variant="error"
                    />
                );
            },
        },
        {
            flex: 1.3,
            header: t("internationalOrders.columns.status"),
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
        {
            flex: 1.5,
            header: t("internationalOrders.columns.updatedDate"),
            cell: i => i.updatedAt,
        },
    ];

    /* ================= HELPERS ================= */

    const renderText = (value: string, placeholder: string) =>
        value === "all" ? (
            <span className="text-[var(--color-dark-3)]">
                {placeholder}
            </span>
        ) : (
            <SelectValue />
        );

    /* ================= VIEW ================= */

    return (
        <div className="h-full flex flex-col bg-[var(--color-white-1)] rounded-xl">
            {/* ================= HEADER ================= */}
            <div className="px-4 py-3 flex items-center gap-3">
                {/* SEARCH */}
                <div className="flex-1">
                    <Input
                        placeholder={t(
                            "internationalOrders.searchPlaceholder"
                        )}
                        value={vm.search}
                        onChange={e => {
                            vm.onSearchChanged(e.target.value);
                            rebuild();
                        }}
                    />
                </div>

                {/* STATUS FILTER */}
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
                                    t(
                                        "internationalOrders.selectStatus"
                                    )
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
                                {t("status.confirmed")}
                            </SelectItem>
                            <SelectItem value="PENDING">
                                {t("status.pending")}
                            </SelectItem>
                            <SelectItem value="CANCELLED">
                                {t("status.cancelled")}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* REQUEST DELIVERY */}
                <Button
                    onClick={() =>
                        console.log("Request international delivery")
                    }
                    className="w-[180px] text-white"
                    style={{ backgroundColor: "var(--color-primary)" }}
                >
                    {t("internationalOrders.requestDelivery")}
                </Button>
            </div>

            {/* ================= TABLE + FOOTER ================= */}
            <div className="flex-1 px-4 pb-4">
                <div className="h-full flex flex-col rounded-lg overflow-hidden">
                    <div className="flex-1 overflow-hidden">
                        <StickyTable
                            items={vm.items}
                            columns={columns}
                            headerHeight={56}
                            rowPadding="px-3 py-4"
                            searchQuery={vm.search}
                            onRowClick={(item) => {
                                navigate(item.shipmentCode, { state: item });
                            }}
                        />
                    </div>

                    <PaginationFooter
                        page={vm.page}
                        pageSize={vm.pageSize}
                        totalCount={vm.totalCount}
                        onPageChange={p => {
                            vm.setPage(p);
                            rebuild();
                        }}
                        onPageSizeChange={s => {
                            vm.setPageSize(s);
                            rebuild();
                        }}
                        onPrev={() => {
                            vm.previousPage();
                            rebuild();
                        }}
                        onNext={() => {
                            vm.nextPage();
                            rebuild();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
