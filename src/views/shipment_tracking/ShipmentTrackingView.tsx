import { useState } from "react";
import { ShipmentTrackingViewModel } from "./ShipmentTrackingViewModel";

export default function ShipmentTrackingView() {
    const [vm] = useState(() => new ShipmentTrackingViewModel());
    const [, forceUpdate] = useState(0);

    return <div className="h-full" />;
}
