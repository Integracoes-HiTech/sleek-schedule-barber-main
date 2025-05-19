
import { format, addDays, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mock data for reports
export const generateDailyData = (days: number) => {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(today, i);
    const revenue = Math.floor(Math.random() * 1500) + 500; // Random between 500-2000
    const appointments = Math.floor(Math.random() * 20) + 5; // Random between 5-25
    
    data.push({
      date: format(date, "yyyy-MM-dd"),
      formattedDate: format(date, "dd/MM"),
      dayOfWeek: format(date, "EEE", { locale: ptBR }),
      revenue,
      appointments,
      ticketAverage: Math.round(revenue / appointments)
    });
  }
  
  return data;
};

export const dailyData = generateDailyData(30);

export const professionalPerformance = [
  { name: "Carlos Oliveira", clients: 45, revenue: 2340 },
  { name: "Rafael Santos", clients: 38, revenue: 1920 },
  { name: "Marcos Pereira", clients: 52, revenue: 2700 },
  { name: "Roberto Almeida", clients: 29, revenue: 1500 },
  { name: "André Silva", clients: 34, revenue: 1750 },
];

export const servicePopularity = [
  { name: "Corte de Cabelo", count: 120, revenue: 6000 },
  { name: "Barba", count: 85, revenue: 2975 },
  { name: "Combo Completo", count: 60, revenue: 4500 },
  { name: "Sobrancelha", count: 30, revenue: 600 },
  { name: "Coloração", count: 15, revenue: 1200 },
];
