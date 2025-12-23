import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import StickyTable from "@/components/table/StickyTable";
import StatusChip from "@/components/table/StatusChip";
import PaginationFooter from "@/components/table/PaginationFooter";

import type { TableColumn } from "@/components/table/TableColumn";
import type { IqamaOrderData } from "@/datamodels/IqamaOrderData";
import { Button } from "@/components/ui/button";
import { IqamaOrdersModel } from "./IqamaOrdersViewModel";
import { Input } from "@/components/ui/input";
import { highlightText } from "@/components/table/Highlight";

export default function IqamaOrders() {
    const [vm] = useState(() => new IqamaOrdersModel());
    const [, forceUpdate] = useState(0);
    const rebuild = () => forceUpdate(v => v + 1);
    const { t } = useTranslation();

    useEffect(() => {
        vm.initialize();
        rebuild();
    }, []);

    const columns: TableColumn<IqamaOrderData>[] = [
        {
            flex: 1.4,
            header: t("iqama.id"),
            cell: i => renderIdentification(i.identification, vm.search),
        },
        {
            flex: 1.4,
            header: t("iqama.orderCode"),
            cell: i => i.orderCode,
            align: "left",
        },
        {
            flex: 1,
            header: t("iqama.status"),
            cell: i => i.status,
            align: "left",
        },
        {
            flex: 1.8,
            header: t("iqama.name"),
            cell: i => i.customerName,
            align: "left",
        },
        {
            flex: 2.2,
            header: t("iqama.receiver"),
            align: "left",
            cell: i => (
                <div>
                    <div>{i.receiverName}</div>
                    <div className="text-sm text-[var(--color-dark-3)]">
                        {i.receiverPhone}
                    </div>
                </div>
            ),
        },
        {
            flex: 1.7,
            header: t("iqama.passport"),
            cell: i => i.passport,
            align: "left",
        },
        {
            flex: 1.2,
            header: t("iqama.price"),
            cell: i => `${i.price} IQD`,
            align: "left",
        },
        {
            flex: 1.3,
            header: t("iqama.created"),
            cell: i => i.createdAt,
            align: "left",
        },
        {
            flex: 1.3,
            header: t("iqama.updated"),
            cell: i => i.updatedAt,
            align: "left",
        },
        {
            flex: 1.2,
            header: t("iqama.paymentType"),
            cell: i => i.paymentType,
            align: "left",
        },
        {
            flex: 1.3,
            header: t("iqama.paymentStatus"),
            align: "center",
            cell: i =>
                i.paymentStatus === "PENDING" ? (
                    <StatusChip
                        label={t("status.pending")}
                        variant="warning"
                    />
                ) : (
                    <StatusChip
                        label={t("status.paid")}
                        variant="success"
                    />
                ),
        },
    ];

    return (
        <div className="h-full flex flex-col bg-[var(--color-white-1)] rounded-xl px-4 pb-4 overflow-visible">

            {/* 🔹 Search + Action */}
            <div className="flex items-center gap-3 py-3 relative z-20">
                {/* Search */}
                <div className="flex-1">
                    <Input
                        placeholder={t("iqama.search")}
                        value={vm.search}
                        onChange={e => {
                            vm.onSearchChanged(e.target.value);
                            rebuild();
                        }}
                    />
                </div>

                {/* Button */}
                <Button
                    onClick={() => console.log("Request Iqama Order clicked")}
                    className="w-[180px] text-white shrink-0"
                    style={{ backgroundColor: "var(--color-primary)" }}
                >
                    {t("iqama.requestIqamaOrder")}
                </Button>
            </div>

            {/* 🔹 Table */}
            <div className="flex-1 overflow-hidden rounded-lg">
                <StickyTable
                    items={vm.items}
                    columns={columns}
                    headerHeight={56}
                    rowPadding="px-3 py-4"
                    searchQuery={vm.search}
                />
            </div>

            {/* 🔹 Pagination */}
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

    );
}

function renderIdentification(
    value?: string,
    search: string = ""
) {
    if (!value) {
        return <span className="text-[var(--color-dark-3)]">—</span>;
    }

    const ep = value.match(/EP:\s*([^\s]+)/i)?.[1];
    const po = value.match(/PO:\s*([^\s]+)/i)?.[1];

    if (!ep && !po) {
        return <span className="text-[var(--color-dark-3)]">—</span>;
    }

    return (
        <div className="leading-tight text-sm">
            {ep && (
                <div>
                    <span className="text-[var(--color-dark-3)]">EP:</span>{" "}
                    {highlightText(ep, search)}
                </div>
            )}
            {po && (
                <div>
                    <span className="text-[var(--color-dark-3)]">PO:</span>{" "}
                    {highlightText(po, search)}
                </div>
            )}
        </div>
    );
}

