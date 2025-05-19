
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProfessionalData {
  name: string;
  clients: number;
  revenue: number;
}

interface ProfessionalsReportProps {
  data: ProfessionalData[];
}

export function ProfessionalsReport({ data }: ProfessionalsReportProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Desempenho por Profissional</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis 
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `R$${value}`}
                />
                <Tooltip />
                <Bar yAxisId="left" dataKey="clients" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Clientes" />
                <Bar yAxisId="right" dataKey="revenue" fill="#d4af37" radius={[4, 4, 0, 0]} name="Receita" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Comparativo de Profissionais</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profissional</TableHead>
                <TableHead>Clientes Atendidos</TableHead>
                <TableHead>Receita Gerada</TableHead>
                <TableHead>Ticket Médio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((professional) => (
                <TableRow key={professional.name}>
                  <TableCell className="font-medium">{professional.name}</TableCell>
                  <TableCell>{professional.clients}</TableCell>
                  <TableCell>R$ {professional.revenue.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>
                    R$ {Math.round(professional.revenue / professional.clients).toLocaleString('pt-BR')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
