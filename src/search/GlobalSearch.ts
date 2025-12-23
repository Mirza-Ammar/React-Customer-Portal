export type GlobalSearchItem = {
    key: string;
    labelKey: string;     // i18n key
    route: string;
};

export const GLOBAL_SEARCH_ITEMS: GlobalSearchItem[] = [
    {
        key: "dashboard",
        labelKey: "menu.dashboard",
        route: "/app",
    },
    {
        key: "epNumber",
        labelKey: "menu.epNumber",
        route: "/app/ep-number",
    },
    {
        key: "poBox",
        labelKey: "menu.poBox",
        route: "/app/po-box-details",
    },
    {
        key: "poBoxItems",
        labelKey: "menu.poBoxItems",
        route: "/app/po-box-items",
    },
    {
        key: "iqamaOrders",
        labelKey: "menu.iqamaOrder",
        route: "/app/iqama-orders",
    },
    {
        key: "addresses",
        labelKey: "menu.address",
        route: "/app/addresses",
    },
    {
        key: "shipmentTracking",
        labelKey: "menu.shipmentTracking",
        route: "/app/shipment-tracking",
    },
    {
        key: "deliveryOrders",
        labelKey: "menu.deliveryOrders",
        route: "/app/delivery-orders",
    },
    {
        key: "internationalOrders",
        labelKey: "menu.internationalOrders",
        route: "/app/international-orders",
    },
    {
        key: "clickShipOrders",
        labelKey: "menu.clickShipOrders",
        route: "/app/clickship-orders",
    },
    {
        key: "settings",
        labelKey: "menu.settings",
        route: "/app/settings",
    },
    {
        key: "help",
        labelKey: "menu.help",
        route: "/app/help",
    },
];
