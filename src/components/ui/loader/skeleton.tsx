import clsx from "clsx";

type SkeletonProps = {
    className?: string;
    rounded?: "sm" | "md" | "lg" | "full";
};

export function Skeleton({
    className,
    rounded = "md",
}: SkeletonProps) {
    return (
        <div
            className={clsx(
                "relative overflow-hidden bg-gray-200",
                "before:absolute before:inset-0",
                "before:-translate-x-full before:animate-[shimmer_1.6s_infinite]",
                "before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent",
                rounded === "sm" && "rounded-sm",
                rounded === "md" && "rounded-md",
                rounded === "lg" && "rounded-xl",
                rounded === "full" && "rounded-full",
                className
            )}
        />
    );
}
