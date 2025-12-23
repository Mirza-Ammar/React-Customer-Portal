import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import LoginView from "@/views/login/LoginView";
import DashboardView from "@/views/dashboard/DashboardView";
import LawyerProfileView from "@/views/lawyer_profile/LawyerProfileView";
import ClientsPoBoxesView from "@/views/lawyer_profile/client_pobox/ClientsPoBoxesView";
import AddressesView from "@/views/addresses/AddressesView";
import EpNumberView from "@/views/ep_number/EpNumberView";
import DeliveryOrdersView from "@/views/orders/delivery_orders/DeliveryOrdersView";
import InternationalOrdersView from "@/views/orders/international_orders/InternationalOrdersView";
// import PoBoxView from "@/views/po_box/PoBoxView";
import ClickShipOrdersView from "@/views/orders/clickship_orders/ClickShipOrdersView";
import ShipmentTrackingView from "@/views/shipment_tracking/ShipmentTrackingView";
import SettingsView from "@/views/support/settings/SettingsView";
import HelpView from "@/views/support/help/HelpView";
import PoBoxDetails from "@/views/po_box/po_box_details/PoBoxDetailsView";
import PoBoxItems from "@/views/po_box/po_box_items/PoBoxItemsView";
import IqamaOrders from "@/views/po_box/iqama_orders/IqamaOrdersView";
import InternationalOrdersDetailView from "@/views/orders/international_orders/detail/InternationalOrdersDetailView";

export const router = createBrowserRouter([
    // 1️⃣ LOGIN
    {
        path: "/login",
        element: <LoginView />,
    },

    // 2️⃣ APP (Layout)
    {
        path: "/app",
        element: <AppLayout />,
        children: [
            // Dashboard
            {
                index: true,
                element: <DashboardView />,
            },

            // Lawyer Profile
            {
                path: "lawyer-profile",
                element: <LawyerProfileView />,
            },
            {
                path: "lawyer-profile/clients-po-boxes",
                element: <ClientsPoBoxesView />,
            },

            // Addresses
            {
                path: "addresses",
                element: <AddressesView />,
            },

            // EP Number 
            { path: "ep-number", element: <EpNumberView />, },

            // PO Box 
            { path: "po-box-details", element: <PoBoxDetails />, },
            { path: "po-box-items", element: <PoBoxItems />, },
            { path: "iqama-orders", element: <IqamaOrders />, },

            // Orders 
            { path: "delivery-orders", element: <DeliveryOrdersView />, },

            { path: "international-orders", element: <InternationalOrdersView />, },
            {
                path: "international-orders/:shipmentCode",
                element: <InternationalOrdersDetailView />,
            },


            { path: "clickship-orders", element: <ClickShipOrdersView />, },

            // Shipment Tracking 
            { path: "shipment-tracking", element: <ShipmentTrackingView />, },

            // Support 
            { path: "settings", element: <SettingsView />, },
            { path: "help", element: <HelpView />, },
        ],
    },

    // 3️⃣ ROOT → LOGIN
    {
        path: "/",
        element: <Navigate to="/login" replace />,
    },
]);
