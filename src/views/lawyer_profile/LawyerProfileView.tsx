import { useState } from "react";
import { LawyerProfileViewModel } from "./LawyerProfileViewModel";

export default function LawyerProfileView() {
    const [vm] = useState(() => new LawyerProfileViewModel());
    const [, forceUpdate] = useState(0);

    return (
        <div
            style={{
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#f9fafb",
            }}
        >
            <h1 style={{ fontSize: 28, fontWeight: 600 }}>
                Welcome to Lawyer Profile
            </h1>

            <p style={{ marginTop: 12, color: "#6b7280" }}>
                Lawyer Profile UI not finalized yet, so didn't made it.
            </p>
        </div>
    );
}
