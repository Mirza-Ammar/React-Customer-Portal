import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useKeyboardShortcuts } from "@/accessibility/keyboardShortcuts";

export default function App() {
    return <RouterProvider router={router} />;
}
