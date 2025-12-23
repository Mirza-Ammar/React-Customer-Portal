import { colors } from "./colors";

type TextStyleOptions = {
    color?: string;
};

export const textStyles = {
    regular: (size: number, opts?: TextStyleOptions) => ({
        fontSize: `${size}px`,
        fontWeight: 400,
        color: opts?.color ?? colors.dark[1],
    }),

    medium: (size: number, opts?: TextStyleOptions) => ({
        fontSize: `${size}px`,
        fontWeight: 500,
        color: opts?.color ?? colors.dark[1],
    }),

    semiBold: (size: number, opts?: TextStyleOptions) => ({
        fontSize: `${size}px`,
        fontWeight: 600,
        color: opts?.color ?? colors.dark[1],
    }),

    bold: (size: number, opts?: TextStyleOptions) => ({
        fontSize: `${size}px`,
        fontWeight: 700,
        color: opts?.color ?? colors.dark[1],
    }),
};
