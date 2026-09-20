import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRoutes from "./routes/AppRoutes";

const Queryclient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={Queryclient}>
      <Router>
        <TooltipProvider>
          <Toaster position="top-right" />
          <AppRoutes />
        </TooltipProvider>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
