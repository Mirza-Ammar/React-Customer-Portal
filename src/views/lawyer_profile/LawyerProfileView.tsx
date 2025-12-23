import { useState } from "react";
import { LawyerProfileViewModel } from "./LawyerProfileViewModel";

export default function LawyerProfileView() {
    const [vm] = useState(() => new LawyerProfileViewModel());
    const [, forceUpdate] = useState(0);

    return <div className="h-full" />;
}
