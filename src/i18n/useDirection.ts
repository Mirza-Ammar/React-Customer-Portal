import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "./languages";

export function useDirection() {
    const { i18n } = useTranslation();

    useEffect(() => {
        const lang = LANGUAGES.find(l => l.i18n === i18n.language);
        document.documentElement.dir = lang?.rtl ? "rtl" : "ltr";
        localStorage.setItem("lang", i18n.language);
    }, [i18n.language]);
}
