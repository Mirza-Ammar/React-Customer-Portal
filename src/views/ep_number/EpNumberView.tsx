import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EpNumberViewModel } from "./EpNumberViewModel";
import {
    FileText,
    User,
    Phone,
    Globe,
    Calendar,
    CreditCard,
    Mail,
    MapPin,
    Package,
} from "lucide-react";
import StatusChip from "@/components/table/StatusChip";

export default function EpNumberView() {
    const [vm] = useState(() => new EpNumberViewModel());
    const { t } = useTranslation();

    return (
        <div className="h-full p-4 space-y-10 bg-[var(--color-white-1)]">
            {/* TOP SUMMARY */}
            <div className="bg-[var(--color-white-1)] rounded-xl p-5 shadow-sm border border-[var(--color-white-5)]">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-lg font-semibold text-[var(--color-dark-1)]">
                            {vm.name}
                        </h2>

                        <div className="flex items-center gap-2 text-sm text-[var(--color-dark-2)] mt-1">
                            <FileText size={14} />
                            {vm.epNumber}
                        </div>
                    </div>

                    <StatusChip label={vm.status} variant="success" />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                    <InfoBox label={t("epNumber.dateApplied")} value={vm.dateApplied} />
                    <InfoBox label={t("epNumber.issuedDate")} value={vm.issuedDate} />
                    <InfoBox label={t("epNumber.totalDocuments")} value={vm.totalDocuments} />
                </div>
            </div>

            {/* BOTTOM CARDS */}
            <div className="grid grid-cols-2 gap-10">
                <div className="bg-[var(--color-white-1)] rounded-xl p-5 shadow-sm border border-[var(--color-white-5)]">
                    <SectionHeader icon={<User size={16} />} title={t("epNumber.personalInfo")} />

                    <InfoRow icon={<User size={14} />} label={t("epNumber.fullName")} value={vm.personalInfo.fullName} />
                    <InfoRow icon={<Globe size={14} />} label={t("epNumber.nationality")} value={vm.personalInfo.nationality} />
                    <InfoRow icon={<Calendar size={14} />} label={t("epNumber.dob")} value={vm.personalInfo.dob} />
                    <InfoRow icon={<CreditCard size={14} />} label={t("epNumber.idNumber")} value={vm.personalInfo.idNumber} />
                </div>

                <div className="bg-[var(--color-white-1)] rounded-xl p-5 shadow-sm border border-[var(--color-white-5)]">
                    <SectionHeader icon={<Phone size={16} />} title={t("epNumber.contactInfo")} />

                    <InfoRow icon={<Phone size={14} />} label={t("epNumber.phone")} value={vm.contactInfo.phone} />
                    <InfoRow icon={<MapPin size={14} />} label={t("epNumber.address")} value={vm.contactInfo.address} />
                    <InfoRow icon={<Mail size={14} />} label={t("epNumber.email")} value={vm.contactInfo.email} />
                    <InfoRow icon={<Package size={14} />} label={t("epNumber.poBox")} value={vm.contactInfo.poBox} />
                </div>
            </div>
        </div>
    );
}

function InfoBox({ label, value }: { label: string; value: string }) {
    return (
        <div className="border border-[var(--color-white-5)] rounded-lg p-3">
            <div className="text-xs text-[var(--color-dark-3)]">{label}</div>
            <div className="text-sm font-medium mt-1 text-[var(--color-dark-1)]">
                {value}
            </div>
        </div>
    );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
    return (
        <div className="flex items-center gap-2 pb-3 border-b border-[var(--color-white-5)] mb-4 text-[var(--color-dark-1)]">
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
                <div className="text-sm font-medium text-[var(--color-dark-1)]">
                    {value}
                </div>
            </div>
        </div>
    );
}
