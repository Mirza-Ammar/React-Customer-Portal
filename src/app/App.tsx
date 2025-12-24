import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useKeyboardShortcuts } from "@/hooks/keyboardShortcuts";

export default function App() {
    return <RouterProvider router={router} />;
}
