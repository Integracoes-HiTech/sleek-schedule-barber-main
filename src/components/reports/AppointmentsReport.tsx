
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ReportData {
  date: string;
  formattedDate: string;
  dayOfWeek: string;
  revenue: number;
  appointments: number;
  ticketAverage: number;
}

interface AppointmentsReportProps {
  data: ReportData[];
}

export function AppointmentsReport({ data }: AppointmentsReportProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atendimentos por Dia</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="formattedDate" />
              <YAxis 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip />
              <Bar dataKey="appointments" fill="#d4af37" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
