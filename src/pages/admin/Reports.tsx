
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRange } from "react-day-picker";
import { subDays, startOfMonth } from "date-fns";
import { DateRangeSelector } from "@/components/reports/DateRangeSelector";
import { StatsSummary } from "@/components/reports/StatsSummary";
import { RevenueReport } from "@/components/reports/RevenueReport";
import { AppointmentsReport } from "@/components/reports/AppointmentsReport";
import { ProfessionalsReport } from "@/components/reports/ProfessionalsReport";
import { ServicesReport } from "@/components/reports/ServicesReport";
import { dailyData, professionalPerformance, servicePopularity } from "@/components/reports/mock-data";

export default function AdminReports() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [reportTab, setReportTab] = useState("revenue");
  
  const filteredData = dailyData.filter(
    (item) => {
      const itemDate = new Date(item.date);
      return (
        dateRange.from && 
        itemDate >= dateRange.from && 
        dateRange.to && 
        itemDate <= dateRange.to
      );
    }
  );
  
  const totals = filteredData.reduce(
    (acc, curr) => {
      acc.revenue += curr.revenue;
      acc.appointments += curr.appointments;
      return acc;
    },
    { revenue: 0, appointments: 0 }
  );
  
  const avgTicket = totals.appointments > 0 
    ? Math.round(totals.revenue / totals.appointments) 
    : 0;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="admin" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <PageHeader title="Relatórios" />
          
          {/* Date selector and KPIs */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <DateRangeSelector 
                dateRange={dateRange} 
                onDateRangeChange={setDateRange} 
              />
            </div>
            
            <StatsSummary totals={totals} avgTicket={avgTicket} />
          </div>
          
          {/* Charts */}
          <Tabs defaultValue={reportTab} onValueChange={setReportTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="revenue">Receita</TabsTrigger>
              <TabsTrigger value="appointments">Atendimentos</TabsTrigger>
              <TabsTrigger value="professionals">Profissionais</TabsTrigger>
              <TabsTrigger value="services">Serviços</TabsTrigger>
            </TabsList>
            
            <TabsContent value="revenue" className="space-y-4">
              <RevenueReport data={filteredData} />
            </TabsContent>
            
            <TabsContent value="appointments" className="space-y-4">
              <AppointmentsReport data={filteredData} />
            </TabsContent>
            
            <TabsContent value="professionals" className="space-y-4">
              <ProfessionalsReport data={professionalPerformance} />
            </TabsContent>
            
            <TabsContent value="services" className="space-y-4">
              <ServicesReport data={servicePopularity} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
