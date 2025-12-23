import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
import RequestIqamaDrawer from "./IqamaDrawer";

export default function IqamaOrders() {
    const [vm] = useState(() => new IqamaOrdersModel());
    const [, forceUpdate] = useState(0);
    const rebuild = () => forceUpdate(v => v + 1);
    const { t } = useTranslation();

    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);

    // 🔹 RTL / LTR detection
    const dir = document.documentElement.dir || "ltr";
    const isRTL = dir === "rtl";

    // 🔹 Lock body scroll
    useEffect(() => {
        document.body.style.overflow = isDrawerOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isDrawerOpen]);

    // 🔹 Handle mount/unmount WITH animation
    useEffect(() => {
        if (isDrawerOpen) {
            setShouldRenderDrawer(true);

            // ⬇️ allow first render at off-screen position
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setDrawerVisible(true);
                });
            });
        } else {
            setDrawerVisible(false);

            const t = setTimeout(() => {
                setShouldRenderDrawer(false);
            }, 300); // must match CSS duration

            return () => clearTimeout(t);
        }
    }, [isDrawerOpen]);

    // 🔹 Separate visible state (THIS IS THE KEY)
    const [isDrawerVisible, setDrawerVisible] = useState(false);

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
        },
        {
            flex: 1,
            header: t("iqama.status"),
            cell: i => i.status,
        },
        {
            flex: 1.8,
            header: t("iqama.name"),
            cell: i => i.customerName,
        },
        {
            flex: 2.2,
            header: t("iqama.receiver"),
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
        },
        {
            flex: 1.2,
            header: t("iqama.price"),
            cell: i => `${i.price} IQD`,
        },
        {
            flex: 1.3,
            header: t("iqama.created"),
            cell: i => i.createdAt,
        },
        {
            flex: 1.3,
            header: t("iqama.updated"),
            cell: i => i.updatedAt,
        },
        {
            flex: 1.2,
            header: t("iqama.paymentType"),
            cell: i => i.paymentType,
        },
        {
            flex: 1.3,
            header: t("iqama.paymentStatus"),
            align: "center",
            cell: i =>
                i.paymentStatus === "PENDING" ? (
                    <StatusChip label={t("status.pending")} variant="warning" />
                ) : (
                    <StatusChip label={t("status.paid")} variant="success" />
                ),
        },
    ];

    return (
        <>
            <div className="h-full flex flex-col bg-[var(--color-white-1)] rounded-xl px-4 pb-4">

                {/* 🔹 Search + Action */}
                <div className="flex items-center gap-3 py-3">
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

                    <Button
                        onClick={() => setDrawerOpen(true)}
                        className="w-[180px] text-white"
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

            {/* 🔹 PORTAL DRAWER */}
            {shouldRenderDrawer &&
                createPortal(
                    <>
                        {/* Overlay */}
                        <div
                            className={`
                                fixed inset-0 bg-black z-[9998]
                                transition-opacity duration-300
                                ${isDrawerVisible ? "opacity-50" : "opacity-0"}
                            `}
                            onClick={() => setDrawerOpen(false)}
                        />

                        {/* Drawer */}
                        <div
                            className={`
                                fixed top-0 h-full bg-white z-[9999]
                                transition-transform duration-300 ease-in-out
                                w-[35%] min-w-[420px]
                                will-change-transform
                                ${isRTL ? "left-0" : "right-0"}
                                ${isDrawerVisible
                                    ? "translate-x-0"
                                    : isRTL
                                        ? "-translate-x-full"
                                        : "translate-x-full"
                                }
                            `}
                        >
                            <RequestIqamaDrawer
                                onClose={() => setDrawerOpen(false)}
                            />
                        </div>
                    </>,
                    document.body
                )}
        </>
    );
}

function renderIdentification(value?: string, search: string = "") {
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
