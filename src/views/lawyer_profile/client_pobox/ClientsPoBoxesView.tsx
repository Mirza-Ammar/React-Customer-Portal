import { useState } from "react";
import { ClientsPoBoxesViewModel } from "./ClientsPoBoxesViewModel";

export default function ClientsPoBoxesView() {
    const [vm] = useState(() => new ClientsPoBoxesViewModel());
    const [, forceUpdate] = useState(0);

    return <div className="h-full" />;
}
