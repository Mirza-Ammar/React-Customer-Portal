import { Skeleton } from "../ui/loader/skeleton";

type TableSkeletonColumn = {
    /** CSS width / flex (e.g. "60px", "1fr", "160px") */
    width: string;

    /** Skeleton height (default: row height) */
    height?: number;

    /** Rounded style (for chips / avatars) */
    rounded?: "sm" | "md" | "lg" | "full";
};

type TableSkeletonProps = {
    /** Column definitions (order matters) */
    columns: TableSkeletonColumn[];

    /** Number of rows to render */
    rows?: number;

    /** Row height */
    rowHeight?: number;

    /** Padding wrapper */
    padding?: string;

    /** Gap between columns */
    gap?: number;
};

export default function TableSkeleton({
    columns,
    rows = 6,
    rowHeight = 16,
    padding = "px-3 py-4",
    gap = 12,
}: TableSkeletonProps) {
    const gridTemplate = columns
        .map((c) => c.width)
        .join(" ");

    return (
        <div className={`space-y-3 ${padding}`}>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div
                    key={rowIndex}
                    className="grid items-center"
                    style={{
                        gridTemplateColumns: gridTemplate,
                        columnGap: gap,
                    }}
                >
                    {columns.map((col, colIndex) => (
                        <Skeleton
                            key={colIndex}
                            className={`h-${Math.floor(
                                (col.height ?? rowHeight) / 4
                            )}`}
                            rounded={col.rounded ?? "md"}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
