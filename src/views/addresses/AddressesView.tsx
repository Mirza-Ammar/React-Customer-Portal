import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AddressesViewModel } from "./AddressesViewModel";

import { Button } from "@/components/ui/button";
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
import type { AddressData } from "@/datamodels/AddressData";
import { noAddress } from "@/lib/assets";

/* ================= EMPTY STATE ================= */

function EmptyAddressesState() {
    const { t } = useTranslation();

    return (
        <div className="h-full w-full flex flex-col items-center justify-center gap-3">
            <img
                src={noAddress}
                alt={t("address.noAddress")}
                className="w-16 h-16 opacity-60"
            />

            <div className="text-[var(--color-dark-3)] text-sm font-bold">
                {t("address.noAddress")}
            </div>
        </div>
    );
}

export default function AddressesView() {
    const { t } = useTranslation();

    const [vm] = useState(() => new AddressesViewModel());
    const [, forceUpdate] = useState(0);
    const rebuild = () => forceUpdate((v) => v + 1);

    useEffect(() => {
        vm.initialize();
        rebuild();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ================= TABLE COLUMNS ================= */

    const columns: TableColumn<AddressData>[] = [
        {
            flex: 0.6,
            header: "#",
            cell: (_, index) =>
                String(
                    (vm.page - 1) * vm.pageSize + index + 1
                ),
            copyValue: () => "",
        },
        {
            flex: 4,
            header: t("address.columns.address"),
            cell: (a) => a.address, // 👈 STRING (IMPORTANT)
        },
        {
            flex: 2,
            header: t("address.columns.contact"),
            align: "left",
            cell: (a) => a.phone ?? "-",
        },
        {
            flex: 2,
            header: t("address.columns.label"),
            align: "left",
            cell: (a) => a.label ?? "-",
        },
        {
            flex: 2,
            header: t("address.columns.note"),
            align: "left",
            cell: (a) =>
                a.note && a.note.length ? a.note : "-",
        },
        {
            flex: 1.5,
            header: t("address.columns.status"),
            align: "center",
            cell: (a) =>
                a.inUse ? (
                    <StatusChip
                        label={t("address.columns.inUse")}
                        variant="success"
                    />
                ) : (
                    <StatusChip
                        label={t("address.columns.unused")}
                        variant="error"
                    />
                ),
            copyValue: () => "",
        },
    ];

    return (
        <div className="h-full flex flex-col bg-[var(--color-white-1)] rounded-xl">
            {/* ================= HEADER ================= */}
            <div className="px-4 py-3 flex items-center gap-3">
                <div className="flex-1">
                    <Input
                        placeholder={t("address.search")}
                        value={vm.search}
                        onChange={(e) => {
                            vm.onSearchChanged(e.target.value);
                            rebuild();
                        }}
                    />
                </div>

                <div className="w-[180px]">
                    <Select
                        value={vm.mode}
                        onValueChange={(v) => {
                            vm.setMode(
                                v as
                                | "domestic"
                                | "international"
                            );
                            rebuild();
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="domestic">
                                {t(
                                    "address.domestic",
                                    "Domestic"
                                )}
                            </SelectItem>
                            <SelectItem value="international">
                                {t(
                                    "address.international",
                                    "International"
                                )}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    onClick={() => vm.onAddNew()}
                    className="w-[180px] text-white"
                    style={{
                        backgroundColor:
                            "var(--color-primary)",
                    }}
                >
                    {t("address.add")}
                </Button>
            </div>

            {/* ================= TABLE + FOOTER ================= */}
            <div className="flex-1 px-4 pb-4">
                <div className="h-full flex flex-col rounded-lg bg-[var(--color-white-1)] overflow-hidden">
                    <div className="flex-1 overflow-hidden">
                        <StickyTable
                            items={vm.items}
                            columns={columns}
                            searchQuery={vm.search} // 👈 PASS SEARCH
                            emptyState={<EmptyAddressesState />}
                            headerHeight={56}
                            rowPadding="px-3 py-4"
                        />
                    </div>

                    <PaginationFooter
                        page={vm.page}
                        pageSize={vm.pageSize}
                        totalCount={vm.totalCount}
                        onPageChange={(p) => {
                            vm.page = p;
                            vm["applyFilters"]();
                            rebuild();
                        }}
                        onPageSizeChange={(size) => {
                            vm.setPageSize(size);
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
