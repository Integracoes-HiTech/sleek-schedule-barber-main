
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ServiceData {
  name: string;
  count: number;
  revenue: number;
}

interface ServicesReportProps {
  data: ServiceData[];
}

export function ServicesReport({ data }: ServicesReportProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Popularidade de Serviços</CardTitle>
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
                <Bar yAxisId="left" dataKey="count" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Quantidade" />
                <Bar yAxisId="right" dataKey="revenue" fill="#d4af37" radius={[4, 4, 0, 0]} name="Receita" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento por Serviço</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serviço</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Receita Total</TableHead>
                <TableHead>Preço Médio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((service) => (
                <TableRow key={service.name}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.count}</TableCell>
                  <TableCell>R$ {service.revenue.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>
                    R$ {Math.round(service.revenue / service.count).toLocaleString('pt-BR')}
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
