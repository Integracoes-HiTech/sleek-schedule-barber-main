
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportData {
  date: string;
  formattedDate: string;
  dayOfWeek: string;
  revenue: number;
  appointments: number;
  ticketAverage: number;
}

interface StatsSummaryProps {
  totals: {
    revenue: number;
    appointments: number;
  };
  avgTicket: number;
}

export function StatsSummary({ totals, avgTicket }: StatsSummaryProps) {
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Receita Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            R$ {totals.revenue.toLocaleString('pt-BR')}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            No período selecionado
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total de Atendimentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totals.appointments}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            No período selecionado
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Ticket Médio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            R$ {avgTicket.toLocaleString('pt-BR')}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            No período selecionado
          </p>
        </CardContent>
      </Card>
    </>
  );
}
