import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface Props {
    onClose: () => void;
}

export default function RequestIqamaDrawer({ onClose }: Props) {
    const { t } = useTranslation();

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header */}
            <div className="px-6 py-4 text-lg font-semibold">
                {t("iqama.drawer.title")}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-3 space-y-6">
                {/* Customer Details */}
                <div className="space-y-4">
                    <div className="font-medium">
                        {t("iqama.drawer.customerDetails")}
                    </div>

                    <div className="border rounded-xl">
                        <InfoRow
                            icon="👤"
                            label={t("iqama.drawer.fields.fullName")}
                            value="Mohammad Iqama"
                        />
                        <InfoRow
                            icon="📞"
                            label={t("iqama.drawer.fields.contactNumber")}
                            value="+964 7509785948"
                        />
                        <InfoRow
                            icon="✉️"
                            label={t("iqama.drawer.fields.email")}
                            value="Mohd.Iqma34@gmail.com"
                        />
                        <InfoRow
                            icon="📍"
                            label={t("iqama.drawer.fields.address")}
                            value="123 Sheikh Zayed Road, Dubai, UAE"
                        />
                    </div>
                </div>

                {/* Checkbox */}
                <div className="space-y-1">
                    <label className="flex items-start gap-2 text-sm cursor-pointer">
                        <input
                            type="checkbox"
                            className="mt-1 accent-[var(--color-primary)]"
                        />
                        <span>
                            {t("iqama.drawer.deliverToLawyer")}
                        </span>
                    </label>
                    <div className="text-xs text-[var(--color-dark-3)] pl-6">
                        {t("iqama.drawer.deliverHint")}
                    </div>
                </div>

                {/* More Information */}
                <div className="space-y-2">
                    <div className="font-medium">
                        {t("iqama.drawer.moreInfo")}
                        <span className="text-[var(--color-dark-3)]">
                            {" "}
                            ({t("iqama.drawer.optional")})
                        </span>
                    </div>
                    <textarea
                        className="
                            w-full
                            border
                            rounded-xl
                            p-3
                            min-h-[120px]
                            resize-none
                            text-sm
                            focus:outline-none
                            focus:ring-1
                            focus:ring-[var(--color-primary)]
                        "
                        placeholder={t("iqama.drawer.writeHere")}
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 flex justify-end gap-3">
                <Button
                    className="w-[180px]"
                    variant={"outline"}
                    onClick={onClose}
                >
                    {t("iqama.drawer.cancel")}
                </Button>
                <Button
                    className="w-[180px] text-white"
                    style={{ backgroundColor: "var(--color-primary)" }}
                >
                    {t("iqama.drawer.createOrder")}
                </Button>
            </div>
        </div>
    );
}

/* ================= Components ================= */

function InfoRow({
    icon,
    label,
    value,
}: {
    icon: string;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-3 px-4 py-3">
            <div className="text-lg leading-none text-[var(--color-dark-3)]">
                {icon}
            </div>
            <div className="space-y-0.5">
                <div className="text-xs text-[var(--color-dark-3)]">
                    {label}
                </div>
                <div className="text-sm font-medium">
                    {value}
                </div>
            </div>
        </div>
    );
}
