import React from "react";

export type TableColumn<T> = {
    flex?: number;
    header: React.ReactNode;
    cell: (row: T, rowIndex: number) => React.ReactNode;
    align?: "left" | "center" | "right";
    copyValue?: (row: T, rowIndex: number) => string | null;
};
