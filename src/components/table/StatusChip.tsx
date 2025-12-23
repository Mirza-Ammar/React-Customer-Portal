type StatusVariant = "success" | "error" | "warning";

type Props = {
    label: string;
    variant: StatusVariant;
};

export default function StatusChip({ label, variant }: Props) {
    const bgColor =
        variant === "success"
            ? "var(--color-chip-success)"
            : variant === "warning"
                ? "var(--color-chip-warning)"
                : "var(--color-chip-error)";

    const textColor =
        variant === "success"
            ? "var(--color-success)"
            : variant === "warning"
                ? "var(--color-warning)"
                : "var(--color-error)";

    return (
        <span
            className="
                inline-flex
                items-center
                justify-center
                h-7
                min-w-[90px]     /* 👈 KEY FIX */
                px-3
                rounded-md
                text-xs
                font-semibold
                whitespace-nowrap
            "
            style={{
                backgroundColor: bgColor,
                color: textColor,
            }}
        >
            {label}
        </span>
    );
}
