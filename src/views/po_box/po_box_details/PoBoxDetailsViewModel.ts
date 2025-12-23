export class PoBoxDetailsModel {
    /* ================= TOP ================= */
    name = "Mohammad Iqma";
    poBoxNumber = "ERB-167";
    status = "REQUESTED";

    dateApplied = "12 Dec, 2025 · 2:30 PM";
    issuingDate = "13 Dec, 2025 · 2:30 PM";
    expiryDate = "15 Dec, 2026 · 2:30 PM";

    /* ================= PO BOX INFO ================= */
    poBoxInfo = {
        frame: "Frame 59974",
        nationality: "United Arab Emirates",
        dob: "May 15, 1990",
        phone: "98765456787",
        address: "123 Sheikh Zayed Road, Dubai, UAE",
    };

    /* ================= PAYMENT INFO ================= */
    paymentInfo = {
        subscription: "United Arab Emirates",
        method: "Cash",
        status: "PAID",
        transactionDate: "12 Dec, 2025",
        transactionId: "12E45R7788",
    };
}
