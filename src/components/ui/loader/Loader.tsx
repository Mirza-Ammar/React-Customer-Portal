import "./loader.css";

type LoaderProps = {
    size?: number;          // px
    color?: string;         // css color
    thickness?: number;     // stroke width
};

export function Loader({
    size = 20,
    color = "var(--color-primary)",
    thickness = 3,
}: LoaderProps) {
    return (
        <span
            className="loader"
            style={{
                width: size,
                height: size,
                borderWidth: thickness,
                borderTopColor: color,
            }}
        />
    );
}
