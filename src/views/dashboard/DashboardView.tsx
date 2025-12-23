export default function DashboardView() {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#f9fafb",
            }}
        >
            <h1 style={{ fontSize: 28, fontWeight: 600 }}>
                Welcome to Dashboard
            </h1>

            <p style={{ marginTop: 12, color: "#6b7280" }}>
                You have successfully logged in 🎉
            </p>
        </div>
    );
}
