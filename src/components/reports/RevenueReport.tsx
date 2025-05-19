
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ReportData {
  date: string;
  formattedDate: string;
  dayOfWeek: string;
  revenue: number;
  appointments: number;
  ticketAverage: number;
}

interface RevenueReportProps {
  data: ReportData[];
}

export function RevenueReport({ data }: RevenueReportProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Evolução da Receita</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="formattedDate" />
                <YAxis 
                  tickFormatter={(value) => `R$${value}`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  formatter={(value) => [`R$ ${value}`, 'Receita']}
                  labelFormatter={(label) => `Data: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#d4af37" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Relatório Diário</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Dia</TableHead>
                <TableHead>Receita</TableHead>
                <TableHead>Atendimentos</TableHead>
                <TableHead>Ticket Médio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((day) => (
                <TableRow key={day.date}>
                  <TableCell>{day.formattedDate}</TableCell>
                  <TableCell>{day.dayOfWeek}</TableCell>
                  <TableCell>R$ {day.revenue.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>{day.appointments}</TableCell>
                  <TableCell>R$ {day.ticketAverage.toLocaleString('pt-BR')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
