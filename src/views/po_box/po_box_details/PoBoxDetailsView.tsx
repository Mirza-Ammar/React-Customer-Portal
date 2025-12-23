import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PoBoxDetailsModel } from "./PoBoxDetailsViewModel";
import {
    FileText,
    Calendar,
    User,
    Globe,
    Phone,
    MapPin,
    CreditCard,
    Wallet,
} from "lucide-react";
import StatusChip from "@/components/table/StatusChip";
import { mailBox } from "@/lib/assets";

export default function PoBoxDetailsView() {
    const [vm] = useState(() => new PoBoxDetailsModel());
    const { t } = useTranslation();

    return (
        <div className="h-full p-4 space-y-10 bg-[var(--color-white-1)]">
            <div className="bg-[var(--color-white-1)] rounded-xl p-5 shadow-sm border border-[var(--color-white-5)]">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-[32px] font-semibold text-[var(--color-dark-1)]">
                            {vm.name}
                        </h2>

                        <div className="text-[24px] font-semibold flex items-center gap-2 mt-1">
                            <img src={mailBox} alt="Mailbox" className="w-6 h-6" />
                            {vm.poBoxNumber}
                        </div>

                        <div className="flex flex-wrap gap-4 text-xs text-[var(--color-dark-3)] mt-2">
                            <span>{t("poBox.dateApplied")}: {vm.dateApplied}</span>
                            <span>•</span>
                            <span>{t("poBox.issuingDate")}: {vm.issuingDate}</span>
                            <span>•</span>
                            <span>{t("poBox.expiryDate")}: {vm.expiryDate}</span>
                        </div>
                    </div>

                    <StatusChip label={vm.status} variant="warning" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
                <div className="bg-[var(--color-white-1)] rounded-xl p-5 shadow-sm border border-[var(--color-white-5)]">
                    <SectionHeader icon={<User size={16} />} title={t("poBox.info")} />

                    <InfoRow icon={<FileText size={14} />} label={t("poBox.frame")} value={vm.poBoxInfo.frame} />
                    <InfoRow icon={<Globe size={14} />} label={t("poBox.nationality")} value={vm.poBoxInfo.nationality} />
                    <InfoRow icon={<Calendar size={14} />} label={t("poBox.dob")} value={vm.poBoxInfo.dob} />
                    <InfoRow icon={<Phone size={14} />} label={t("poBox.phone")} value={vm.poBoxInfo.phone} />
                    <InfoRow icon={<MapPin size={14} />} label={t("poBox.address")} value={vm.poBoxInfo.address} />
                </div>

                <div className="bg-[var(--color-white-1)] rounded-xl p-5 shadow-sm border border-[var(--color-white-5)]">
                    <SectionHeader icon={<Wallet size={16} />} title={t("poBox.paymentInfo")} />

                    <InfoRow icon={<Globe size={14} />} label={t("poBox.subscription")} value={vm.paymentInfo.subscription} />
                    <InfoRow icon={<CreditCard size={14} />} label={t("poBox.methodStatus")} value={`${vm.paymentInfo.method} (${vm.paymentInfo.status})`} />
                    <InfoRow icon={<Calendar size={14} />} label={t("poBox.transactionDate")} value={vm.paymentInfo.transactionDate} />
                    <InfoRow icon={<FileText size={14} />} label={t("poBox.transactionId")} value={vm.paymentInfo.transactionId} />
                </div>
            </div>
        </div>
    );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
    return (
        <div className="flex items-center gap-2 pb-3 border-b border-[var(--color-white-5)] mb-4">
            {icon}
            <span className="font-semibold text-sm">{title}</span>
        </div>
    );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex gap-3 py-2">
            <div className="text-[var(--color-dark-3)] mt-0.5">{icon}</div>
            <div>
                <div className="text-xs text-[var(--color-dark-3)]">{label}</div>
                <div className="text-sm font-medium">{value}</div>
            </div>
        </div>
    );
}
