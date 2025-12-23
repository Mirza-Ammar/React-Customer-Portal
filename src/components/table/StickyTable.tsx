import { useState } from "react";
import HoverRow from "./HoverRow";
import type { TableColumn } from "./TableColumn";
import { highlightText } from "./Highlight";

type Props<T> = {
    items: T[];
    columns: TableColumn<T>[];

    searchQuery?: string;

    emptyState?: React.ReactNode;
    headerHeight?: number;
    rowPadding?: string;

    onRowClick?: (row: T, index: number) => void;
    rowActions?: (row: T, index: number) => React.ReactNode[];

    enableCellCopy?: boolean;
};

export default function StickyTable<T>({
    items,
    columns,
    searchQuery = "",
    emptyState,
    headerHeight = 56,
    rowPadding = "px-3 py-3",
    onRowClick,
    rowActions,
    enableCellCopy = true,
}: Props<T>) {
    const [copiedCell, setCopiedCell] = useState<string | null>(null);

    const justify = (align?: "left" | "center" | "right") => {
        if (align === "center") return "justify-center text-center";
        if (align === "right") return "justify-end text-right";
        return "justify-start text-left";
    };

    function renderCell(
        col: TableColumn<T>,
        row: T,
        rowIndex: number,
        colIndex: number
    ) {
        const rawContent = col.cell(row, rowIndex);
        const key = `${rowIndex}-${colIndex}`;
        const isCopied = copiedCell === key;

        let content = rawContent;

        // 🔍 Highlight search text
        if (typeof rawContent === "string" && searchQuery) {
            content = highlightText(rawContent, searchQuery);
        }

        // No copy → just render
        if (!enableCellCopy || typeof rawContent !== "string") {
            return (
                <div className={`min-w-0 flex ${justify(col.align)}`}>
                    {content}
                </div>
            );
        }

        return (
            <div className={`relative min-w-0 flex ${justify(col.align)}`}>
                <span
                    className={`
                        block min-w-0 truncate text-sm
                        cursor-copy
                        transition-colors duration-200
                        ${isCopied
                            ? "text-[var(--color-primary)] font-bold"
                            : "text-[var(--color-dark-1)] font-normal"
                        }
                    `}
                    title="Click to copy"
                    onClick={async (e) => {
                        e.stopPropagation(); // 🔥 PREVENT ROW NAVIGATION

                        const text =
                            col.copyValue?.(row, rowIndex) ??
                            e.currentTarget.innerText?.trim();

                        if (!text) return;

                        await navigator.clipboard.writeText(text);

                        setCopiedCell(key);
                        setTimeout(() => {
                            setCopiedCell((current) =>
                                current === key ? null : current
                            );
                        }, 500);
                    }}
                >
                    {content}
                </span>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full text-sm">
            {/* ================= HEADER ================= */}
            <div
                className="sticky top-0 z-10 bg-[var(--color-white-4)] border-b border-[var(--color-white-5)]"
                style={{ height: headerHeight }}
            >
                <div className={`flex h-full items-center ${rowPadding}`}>
                    {columns.map((col, i) => (
                        <div
                            key={i}
                            style={{ flex: col.flex ?? 1 }}
                            className={`min-w-0 font-medium text-[var(--color-dark-1)] flex ${justify(
                                col.align
                            )}`}
                        >
                            {col.header}
                        </div>
                    ))}
                </div>
            </div>

            {/* ================= BODY ================= */}
            <div className="flex-1 overflow-auto">
                {items.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                        {emptyState ?? (
                            <div className="text-sm text-[var(--color-dark-3)]">
                                No data
                            </div>
                        )}
                    </div>
                ) : (
                    items.map((row, rowIndex) => {
                        const actions =
                            rowActions?.(row, rowIndex) ?? [];

                        return (
                            <div key={rowIndex}>
                                <HoverRow
                                    onClick={() =>
                                        onRowClick?.(row, rowIndex)
                                    }
                                >
                                    {(hover) => (
                                        <div className="relative">
                                            <div
                                                className={`flex items-center ${rowPadding}`}
                                            >
                                                {columns.map(
                                                    (col, colIndex) => (
                                                        <div
                                                            key={colIndex}
                                                            style={{
                                                                flex:
                                                                    col.flex ??
                                                                    1,
                                                            }}
                                                            className="min-w-0"
                                                        >
                                                            {renderCell(
                                                                col,
                                                                row,
                                                                rowIndex,
                                                                colIndex
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                            </div>

                                            {actions.length > 0 &&
                                                hover && (
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[var(--color-white-1)] rounded-xl shadow px-2 py-1 flex gap-2">
                                                        {actions}
                                                    </div>
                                                )}
                                        </div>
                                    )}
                                </HoverRow>

                                {rowIndex < items.length - 1 && (
                                    <div
                                        style={{
                                            height: "0.85px",
                                            background:
                                                "var(--color-white-5)",
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
