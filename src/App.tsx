import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <Router>
      <TooltipProvider>
        <Toaster position="top-right" />
        <AppRoutes />
      </TooltipProvider>
    </Router>
  );
}
