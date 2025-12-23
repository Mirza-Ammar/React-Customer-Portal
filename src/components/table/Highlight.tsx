import React from "react";

export function highlightText(
    text: string,
    query: string
): React.ReactNode {
    if (!query || !text) return text;

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedQuery})`, "ig");
    const parts = text.split(regex);

    return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <mark
                key={index}
                className="bg-[var(--color-secondary)] text-[var(--color-dark-1)] font-semibold px-0.5 rounded"
            >
                {part}
            </mark>
        ) : (
            part
        )
    );
}
