import { useState } from "react";
import { HelpViewModel } from "./HelpViewModel";

export default function HelpView() {
    const [vm] = useState(() => new HelpViewModel());
    const [, forceUpdate] = useState(0);

    return <div className="h-full" />;
}
