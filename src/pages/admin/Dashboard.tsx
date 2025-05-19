
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { BarChart2, Plus, Users, Scissors } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data
const revenueData = [
  { name: "Seg", value: 560 },
  { name: "Ter", value: 740 },
  { name: "Qua", value: 920 },
  { name: "Qui", value: 850 },
  { name: "Sex", value: 1200 },
  { name: "Sáb", value: 1500 },
  { name: "Dom", value: 0 },
];

export default function AdminDashboard() {
  const [period, setPeriod] = useState("week");
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="admin" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-serif font-bold">Dashboard</h1>
            <Button className="bg-barber-gold text-barber-900 hover:bg-barber-gold/90">
              <Plus className="mr-2 h-4 w-4" /> Nova Barbearia
            </Button>
          </div>
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Receita Diária</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 1.250,00</div>
                <p className="text-xs text-green-600 mt-1">
                  +12% em relação a ontem
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Agendamentos Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-green-600 mt-1">
                  +5 em relação a ontem
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Ticket Médio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 65,00</div>
                <p className="text-xs text-gray-500 mt-1">
                  Últimos 7 dias
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Profissionais Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-gray-500 mt-1">
                  De 8 cadastrados
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Revenue Chart */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Receita</CardTitle>
                <Tabs defaultValue={period} onValueChange={setPeriod}>
                  <TabsList>
                    <TabsTrigger value="week">7 dias</TabsTrigger>
                    <TabsTrigger value="month">30 dias</TabsTrigger>
                    <TabsTrigger value="year">Anual</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis
                      tickFormatter={(value) => `R$${value}`}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip formatter={(value) => [`R$ ${value}`, 'Receita']} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#d4af37"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Access */}
          <div>
            <h2 className="text-xl font-serif font-bold mb-4">Acesso Rápido</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 flex items-center">
                  <div className="w-12 h-12 bg-barber-gold/10 rounded-full flex items-center justify-center mr-4">
                    <Scissors className="text-barber-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold">Meus Serviços</h3>
                    <p className="text-sm text-gray-500">Gerencie os serviços oferecidos</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 flex items-center">
                  <div className="w-12 h-12 bg-barber-gold/10 rounded-full flex items-center justify-center mr-4">
                    <Users className="text-barber-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold">Meus Profissionais</h3>
                    <p className="text-sm text-gray-500">Gerencie a equipe de barbeiros</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 flex items-center">
                  <div className="w-12 h-12 bg-barber-gold/10 rounded-full flex items-center justify-center mr-4">
                    <BarChart2 className="text-barber-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold">Relatórios</h3>
                    <p className="text-sm text-gray-500">Visualize estatísticas e desempenho</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
