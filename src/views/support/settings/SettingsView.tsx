import { useState } from "react";
import { SettingsViewModel } from "./SettingsViewModel";

export default function SettingsView() {
    const [vm] = useState(() => new SettingsViewModel());
    const [, forceUpdate] = useState(0);

    return <div className="h-full" />;
}
