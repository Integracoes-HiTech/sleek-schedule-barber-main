
import { CalendarIcon, Clock, Users } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { parseISO, format, isSameDay } from "date-fns";

interface AppointmentItem {
  id: string;
  client: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

interface StatisticsCardsProps {
  appointments: AppointmentItem[];
  todayAppointments: AppointmentItem[];
  pendingAppointments: AppointmentItem[];
}

export const StatisticsCards = ({
  appointments,
  todayAppointments,
  pendingAppointments
}: StatisticsCardsProps) => {
  const getTotalAppointmentsToday = () => {
    const now = new Date();
    return appointments.filter(apt => 
      isSameDay(parseISO(apt.date), now) && apt.status === "confirmed"
    ).length;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard 
        icon={CalendarIcon} 
        title="Agendamentos Hoje" 
        value={getTotalAppointmentsToday()} 
      />
      <StatCard 
        icon={Clock} 
        title="Próximo Atendimento" 
        value={todayAppointments.length > 0 
          ? format(parseISO(`${todayAppointments[0].date}T${todayAppointments[0].startTime}`), "HH:mm")
          : "Nenhum"} 
      />
      <StatCard 
        icon={Users} 
        title="Pendentes de Aprovação" 
        value={pendingAppointments.length} 
      />
    </div>
  );
};
