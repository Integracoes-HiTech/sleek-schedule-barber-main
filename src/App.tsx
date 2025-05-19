import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { syncInitialData, syncInitialBarbershop } from "@/utils/supabaseDataSync";

// Importa páginas
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminServices from "./pages/admin/Services";
import AdminProfessionals from "./pages/admin/Professionals";
import AdminReports from "./pages/admin/Reports";
import ProfessionalSchedule from "./pages/professional/Schedule";
import ProfessionalProfile from "./pages/professional/Profile";
import ClientBooking from "./pages/client/Booking";
import ClientAppointments from "./pages/client/Appointments";
import ClientHistory from "./pages/client/History";
import NotFound from "./pages/NotFound";
import BarbeariaLoshermanos from "./pages/barbearia_loshermanos";
import SolicitarAcesso from "./pages/SolicitarAcesso";
import BlogPage from "./pages/BlogPage";
import AdminLogin from "./pages/auth/sistemalogin";






// Importa o componente ScrollToTop
import ScrollToTop from "@/components/layout/ScrollToTop";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const initializeData = async () => {
      await syncInitialData();
      await syncInitialBarbershop();
    };
    initializeData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop /> {/* 🆕 Isso aqui resolve o scroll automático */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/barbearia_loshermanos" element={<BarbeariaLoshermanos />} />
            <Route path="/solicitar-acesso" element={<SolicitarAcesso />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/professionals" element={<AdminProfessionals />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/professional/schedule" element={<ProfessionalSchedule />} />
            <Route path="/professional/profile" element={<ProfessionalProfile />} />
            <Route path="/client/booking" element={<ClientBooking />} />
            <Route path="/client/appointments" element={<ClientAppointments />} />
            <Route path="/client/history" element={<ClientHistory />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/sistemalogin" element={<AdminLogin />} />

            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
