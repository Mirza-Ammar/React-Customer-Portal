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
import type { PoBoxItemData } from "@/datamodels/PoBoxData";
import { PoBoxItemsModel } from "./PoBoxItemsViewModel";

export default function PoBoxItems() {
    const [vm] = useState(() => new PoBoxItemsModel());
    const [, forceUpdate] = useState(0);
    const rebuild = () => forceUpdate(v => v + 1);
    const { t } = useTranslation();

    useEffect(() => {
        vm.initialize();
        rebuild();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ================= TABLE COLUMNS ================= */

    const columns: TableColumn<PoBoxItemData>[] = [
        {
            flex: 0.6,
            header: t("poBoxItems.id"),
            cell: (_, index) => (
                <div className="text-[var(--color-dark-1)]">
                    {(vm.page - 1) * vm.pageSize + index + 1}
                </div>
            ),
            copyValue: () => "",
        },
        {
            flex: 1.5,
            header: t("poBoxItems.orderCode"),
            cell: i => i.orderCode || "-",
        },
        {
            flex: 2,
            header: t("poBoxItems.source"),
            cell: i => i.source,
        },
        {
            flex: 2,
            header: t("poBoxItems.reference"),
            cell: i => i.reference,
        },
        {
            flex: 2,
            header: t("poBoxItems.description"),
            cell: i => i.description || "-",
        },
        {
            flex: 1.5,
            header: t("poBoxItems.note"),
            cell: i => i.note || "-",
        },
        {
            flex: 1.5,
            header: t("poBoxItems.location"),
            cell: i => i.location,
        },
        {
            flex: 1.8,
            header: t("poBoxItems.createdBy"),
            cell: i => i.createdBy,
        },
        {
            flex: 1.8,
            header: t("poBoxItems.createdAt"),
            cell: i => i.createdAt,
        },
        {
            flex: 1.5,
            header: t("poBoxItems.status"),
            align: "center",
            cell: i => {
                if (i.status === "RECEIVED")
                    return <StatusChip label={t("status.received")} variant="success" />;

                if (i.status === "DELIVERED")
                    return <StatusChip label={t("status.delivered")} variant="success" />;

                return <StatusChip label={t("status.pending")} variant="warning" />;
            },
            copyValue: () => "",
        },
    ];

    /* ================= FILTER TEXT ================= */

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
                        placeholder={t("poBoxItems.search")}
                        value={vm.search}
                        onChange={e => {
                            vm.onSearchChanged(e.target.value);
                            rebuild();
                        }}
                    />
                </div>

                {/* DATE */}
                <div className="w-[160px]">
                    <Select value={vm.date} onValueChange={v => { vm.setDate(v); rebuild(); }}>
                        <SelectTrigger className="flex justify-between items-center">
                            <span className="text-left">
                                {renderText(vm.date, t("poBoxItems.selectDate"))}
                            </span>
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all" className="text-[var(--color-dark-3)]">
                                {t("common.all")}
                            </SelectItem>
                            <div className="h-px bg-[var(--color-white-5)] my-1" />
                            <SelectItem value="today">{t("poBoxItems.today")}</SelectItem>
                            <SelectItem value="week">{t("poBoxItems.thisWeek")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* TYPE */}
                <div className="w-[160px]">
                    <Select value={vm.type} onValueChange={v => { vm.setType(v); rebuild(); }}>
                        <SelectTrigger className="flex justify-between items-center">
                            <div className="flex-1 text-left">
                                {renderText(vm.type, t("poBoxItems.selectType"))}
                            </div>
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all" className="text-[var(--color-dark-3)]">
                                {t("common.all")}
                            </SelectItem>
                            <div className="h-px bg-[var(--color-white-5)] my-1" />
                            <SelectItem value="electronics">{t("poBoxItems.electronics")}</SelectItem>
                            <SelectItem value="documents">{t("poBoxItems.documents")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* STATUS */}
                <div className="w-[160px]">
                    <Select value={vm.status} onValueChange={v => { vm.setStatus(v as any); rebuild(); }}>
                        <SelectTrigger className="pr-10 flex items-center">
                            <div className="flex-1 text-left">
                                {renderText(vm.status, t("poBoxItems.selectStatus"))}
                            </div>
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all" className="text-[var(--color-dark-3)]">
                                {t("common.all")}
                            </SelectItem>
                            <div className="h-px bg-[var(--color-white-5)] my-1" />
                            <SelectItem value="RECEIVED">{t("status.received")}</SelectItem>
                            <SelectItem value="DELIVERED">{t("status.delivered")}</SelectItem>
                            <SelectItem value="PENDING">{t("status.pending")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
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
