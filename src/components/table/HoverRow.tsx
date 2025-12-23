import { useState } from "react";

type Props = {
    onClick?: () => void;
    children: (hover: boolean) => React.ReactNode;
};

export default function HoverRow({ onClick, children }: Props) {
    const [hover, setHover] = useState(false);

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={onClick}
            className={`relative ${hover ? "bg-black/5" : ""
                } cursor-pointer`}
        >
            {children(hover)}
        </div>
    );
}
