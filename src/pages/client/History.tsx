import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/layout/Sidebar";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Clock, UserCircle, Receipt, Scissors, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock history data
const historyData = [
  {
    id: "1",
    date: "2025-05-01",
    professionalName: "Carlos Oliveira",
    services: [
      { name: "Corte de Cabelo", price: 50 }
    ],
    totalAmount: 50,
    paymentMethod: "Cartão de Crédito",
    status: "completed"
  },
  {
    id: "2",
    date: "2025-04-15",
    professionalName: "Marcos Pereira",
    services: [
      { name: "Barba", price: 35 },
      { name: "Corte de Cabelo", price: 50 }
    ],
    totalAmount: 85,
    paymentMethod: "Dinheiro",
    status: "completed"
  },
  {
    id: "3",
    date: "2025-04-01",
    professionalName: "Rafael Santos",
    services: [
      { name: "Combo Completo", price: 75 }
    ],
    totalAmount: 75,
    paymentMethod: "Pix",
    status: "completed"
  },
  {
    id: "4",
    date: "2025-03-20",
    professionalName: "Carlos Oliveira",
    services: [
      { name: "Corte de Cabelo", price: 50 }
    ],
    totalAmount: 50,
    paymentMethod: "Cartão de Débito",
    status: "completed"
  },
  {
    id: "5",
    date: "2025-03-05",
    professionalName: "Carlos Oliveira",
    services: [
      { name: "Corte de Cabelo", price: 50 },
      { name: "Sobrancelha", price: 20 }
    ],
    totalAmount: 70,
    paymentMethod: "Cartão de Crédito",
    status: "completed"
  },
];

export default function ClientHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("todos");
  
  const filteredHistory = historyData
    .filter(item => 
      activeTab === "todos" || 
      (activeTab === "recentes" && new Date(item.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    )
    .filter(item => 
      searchTerm ? (
        item.professionalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.services.some(service => service.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
      ) : true
    );
  
  const handleViewReceipt = (receipt: any) => {
    setSelectedReceipt(receipt);
    setIsReceiptOpen(true);
  };
  
  const getTotalServices = () => {
    return historyData.reduce((acc, curr) => acc + curr.services.length, 0);
  };
  
  const getTotalSpent = () => {
    return historyData.reduce((acc, curr) => acc + curr.totalAmount, 0);
  };
  
  const getMostFrequentService = () => {
    const serviceCount: Record<string, number> = {};
    
    historyData.forEach(item => {
      item.services.forEach(service => {
        serviceCount[service.name] = (serviceCount[service.name] || 0) + 1;
      });
    });
    
    let mostFrequent = { name: '', count: 0 };
    
    Object.entries(serviceCount).forEach(([name, count]) => {
      if (count > mostFrequent.count) {
        mostFrequent = { name, count };
      }
    });
    
    return mostFrequent.name;
  };
  
  const getFavoriteBarber = () => {
    const barberCount: Record<string, number> = {};
    
    historyData.forEach(item => {
      barberCount[item.professionalName] = (barberCount[item.professionalName] || 0) + 1;
    });
    
    let favorite = { name: '', count: 0 };
    
    Object.entries(barberCount).forEach(([name, count]) => {
      if (count > favorite.count) {
        favorite = { name, count };
      }
    });
    
    return favorite.name;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="client" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <PageHeader 
            title="Histórico" 
            description="Acompanhe todos os seus atendimentos anteriores."
          />
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              icon={Scissors}
              title="Total de serviços"
              value={getTotalServices()}
            />
            
            <StatCard 
              icon={Receipt}
              title="Total gasto"
              value={`R$ ${getTotalSpent().toFixed(2)}`}
            />
            
            <StatCard 
              icon={Scissors}
              title="Serviço mais frequente"
              value={getMostFrequentService()}
            />
            
            <StatCard 
              icon={UserCircle}
              title="Barbeiro favorito"
              value={getFavoriteBarber()}
            />
          </div>
          
          {/* Search and History List */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Histórico de Serviços</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {filteredHistory.length} {filteredHistory.length === 1 ? 'atendimento' : 'atendimentos'} encontrados
                </p>
              </div>
              <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Buscar por serviço, barbeiro..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                  <TabsList>
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="recentes">Recentes</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              {filteredHistory.length > 0 ? (
                <div className="space-y-4">
                  {filteredHistory.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="border-l-4 border-barber-gold hover:bg-gray-50 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex flex-col md:flex-row md:items-center gap-2">
                                <div className="text-lg font-medium">
                                  {item.services.map(s => s.name).join(", ")}
                                </div>
                              </div>
                              
                              <div className="flex flex-col gap-1 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                  <CalendarIcon className="h-4 w-4" />
                                  <span>
                                    {format(parseISO(item.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <UserCircle className="h-4 w-4" />
                                  <span>Com {item.professionalName}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end">
                              <div className="font-bold text-lg">R$ {item.totalAmount.toFixed(2)}</div>
                              <div className="text-sm text-gray-500">{item.paymentMethod}</div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="mt-2"
                                onClick={() => handleViewReceipt(item)}
                              >
                                <Receipt className="h-4 w-4 mr-2" />
                                Ver detalhes
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Receipt className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">Nenhum histórico encontrado</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Não encontramos resultados para a sua busca.
                  </p>
                  <Button 
                    className="mt-4" 
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setActiveTab('todos');
                    }}
                  >
                    Limpar filtros
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Receipt Dialog */}
          <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Detalhes do Atendimento</DialogTitle>
              </DialogHeader>
              
              {selectedReceipt && (
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="text-sm text-gray-500">Data</div>
                    <div className="font-medium">{format(parseISO(selectedReceipt.date), "dd/MM/yyyy")}</div>
                  </div>
                  
                  <div className="border-b pb-4">
                    <div className="text-sm text-gray-500">Profissional</div>
                    <div className="font-medium">{selectedReceipt.professionalName}</div>
                  </div>
                  
                  <div className="border-b pb-4">
                    <div className="text-sm text-gray-500 mb-2">Serviços</div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Descrição</TableHead>
                          <TableHead className="text-right">Valor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedReceipt.services.map((service: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{service.name}</TableCell>
                            <TableCell className="text-right">R$ {service.price.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">Total</div>
                    <div className="font-bold text-lg">R$ {selectedReceipt.totalAmount.toFixed(2)}</div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="text-sm text-gray-500">Forma de pagamento</div>
                    <div>{selectedReceipt.paymentMethod}</div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button 
                      className="w-full"
                      onClick={() => window.location.href = "/client/booking"}
                    >
                      Agendar Serviço Semelhante
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-shrink-0"
                      onClick={() => setIsReceiptOpen(false)}
                    >
                      Fechar
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
