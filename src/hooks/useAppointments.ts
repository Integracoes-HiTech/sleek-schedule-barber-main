
import { useState } from "react";
import { format, addHours, parseISO, isAfter, isBefore, isSameDay } from "date-fns";
import { useToast } from "@/hooks/use-toast";

// Mock data - in a real application this would be replaced with API calls
const appointments = [
  {
    id: "1",
    client: "João Silva",
    service: "Corte de Cabelo",
    date: "2025-05-09", // Using current date from the context
    startTime: "09:00",
    endTime: "09:30",
    status: "confirmed",
    paymentStatus: "pending"
  },
  {
    id: "2",
    client: "Carlos Oliveira",
    service: "Barba",
    date: "2025-05-09",
    startTime: "10:00",
    endTime: "10:30",
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "credit-card"
  },
  {
    id: "3",
    client: "André Santos",
    service: "Combo Completo",
    date: "2025-05-09",
    startTime: "11:00",
    endTime: "12:00",
    status: "pending",
    paymentStatus: "pending"
  },
  {
    id: "4",
    client: "Marcos Pereira",
    service: "Corte de Cabelo",
    date: "2025-05-09",
    startTime: "14:00",
    endTime: "14:30",
    status: "pending",
    paymentStatus: "pending"
  },
  {
    id: "5",
    client: "Lucas Ferreira",
    service: "Combo Completo",
    date: "2025-05-10",
    startTime: "10:00",
    endTime: "11:00",
    status: "pending",
    paymentStatus: "pending"
  }
];

export const useAppointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>("");
  const { toast } = useToast();

  // Filter pending appointments
  const pendingAppointments = appointments
    .filter(apt => apt.status === "pending")
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.startTime.localeCompare(b.startTime);
    });
  
  // Get upcoming appointments for today
  const now = new Date();
  const todayAppointments = appointments
    .filter(apt => {
      const aptDate = parseISO(apt.date);
      const aptStartTime = parseISO(`${apt.date}T${apt.startTime}`);
      return isSameDay(aptDate, now) && 
             apt.status === "confirmed" && 
             isAfter(aptStartTime, now);
    })
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
    .slice(0, 3);

  const handleApproveAppointment = (id: string) => {
    toast({
      title: "Agendamento aprovado",
      description: "O cliente foi notificado sobre a confirmação."
    });
  };
  
  const handleRejectAppointment = (id: string) => {
    toast({
      title: "Agendamento recusado",
      description: "O cliente foi notificado sobre a recusa."
    });
  };
  
  const handlePayment = (id: string) => {
    setSelectedAppointmentId(id);
    setShowPaymentDialog(true);
  };
  
  const handlePaymentSuccess = () => {
    // In a real application, this would refresh the appointments list
    toast({
      title: "Pagamento registrado",
      description: "A lista de agendamentos foi atualizada."
    });
  };

  return {
    appointments,
    selectedDate,
    setSelectedDate,
    pendingAppointments,
    todayAppointments,
    showPaymentDialog,
    setShowPaymentDialog,
    selectedAppointmentId,
    handleApproveAppointment,
    handleRejectAppointment,
    handlePayment,
    handlePaymentSuccess
  };
};
