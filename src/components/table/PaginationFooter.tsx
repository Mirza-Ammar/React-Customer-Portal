import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

type Props = {
    page: number;
    pageSize: number;
    totalCount: number;

    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    onPrev: () => void;
    onNext: () => void;
};

export default function PaginationFooter({
    page,
    pageSize,
    totalCount,
    onPageChange,
    onPageSizeChange,
    onPrev,
    onNext,
}: Props) {
    const { t } = useTranslation();

    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    function getPages(): (number | "...")[] {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages: (number | "...")[] = [];

        pages.push(1);

        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);

        if (start > 2) pages.push("...");
        for (let i = start; i <= end; i++) pages.push(i);
        if (end < totalPages - 1) pages.push("...");

        pages.push(totalPages);
        return pages;
    }

    const pages = getPages();

    return (
        <div
            className="
                h-16 px-4
                grid grid-cols-3 items-center
                bg-[var(--color-white-2)]
                border-t border-[var(--color-white-4)]
                text-sm
            "
        >
            {/* ================= LEFT ================= */}
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-[var(--color-dark-3)]">
                    {t("common.itemsPerPage")}
                </span>

                <div className="flex items-center gap-1 rounded-full bg-gray-100 p-1">
                    {[10, 20, 50].map((v) => (
                        <button
                            key={v}
                            onClick={() => onPageSizeChange(v)}
                            className={`
                    px-3 py-1.5 text-sm rounded-full transition
                    ${pageSize === v
                                    ? "bg-white shadow text-primary-600"
                                    : "text-gray-500 hover:text-gray-800"
                                }
                `}
                        >
                            {v}
                        </button>
                    ))}
                </div>
            </div>


            {/* ================= CENTER ================= */}
            <div className="flex justify-center items-center gap-1">
                {pages.map((p, i) =>
                    p === "..." ? (
                        <span
                            key={`ellipsis-${i}`}
                            className="px-2 text-[var(--color-primary)]"
                        >
                            …
                        </span>
                    ) : (
                        <Button
                            key={`page-${p}`}
                            size="sm"
                            variant={p === page ? "outline" : "ghost"}
                            onClick={() => onPageChange(p)}
                            className={`
                                min-w-[36px]
                                ${p === page
                                    ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                                    : "text-[var(--color-dark-3)] hover:bg-[var(--color-white-4)]"
                                }
                            `}
                        >
                            {p}
                        </Button>
                    )
                )}
            </div>

            {/* ================= RIGHT ================= */}
            <div className="flex justify-end gap-1">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={onPrev}
                    disabled={page <= 1}
                    className={`
                        w-[96px]
                        ${page <= 1
                            ? "border-[var(--color-white-4)] text-[var(--color-dark-3)]"
                            : "border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)/10]"
                        }
                    `}
                >
                    {t("common.previous")}
                </Button>

                <Button
                    size="sm"
                    onClick={onNext}
                    disabled={page >= totalPages}
                    className={`
                        w-[96px]
                        ${page >= totalPages
                            ? "bg-[var(--color-white-4)] text-[var(--color-dark-3)]"
                            : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]"
                        }
                    `}
                >
                    {t("common.next")}
                </Button>
            </div>
        </div>
    );
}
