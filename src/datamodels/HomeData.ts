export type Shortcut = {
    title: string;
    isShow: boolean;
    isEnabled: boolean;
};

export type HomeData = {
    appBanners: string[];
    userType: string;
    epNumberStatus: string;
    epNumber: string;
    isLawyer: boolean;

    epWalletShortcut: Shortcut;
    rateCalulateShortCut: Shortcut;
    localDeliveryShortcut: Shortcut;
    internationalShortcut: Shortcut;
    clickShipShortcut: Shortcut;
    instantShortcut: Shortcut;
    iqamaCard: Shortcut;
};
