
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { Users, CheckIcon, XIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AppointmentItem {
  id: string;
  client: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

interface PendingRequestsProps {
  pendingAppointments: AppointmentItem[];
  handleApproveAppointment: (id: string) => void;
  handleRejectAppointment: (id: string) => void;
}

export const PendingRequests = ({
  pendingAppointments,
  handleApproveAppointment,
  handleRejectAppointment
}: PendingRequestsProps) => {
  const [activeTab, setActiveTab] = useState<string>("pendentes");

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2" /> Pedidos de Agendamento
          </div>
          {pendingAppointments.length > 0 && (
            <Badge variant="outline" className="rounded-full p-1 h-6 min-w-6 flex items-center justify-center">
              {pendingAppointments.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-2">
            <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
            <TabsTrigger value="todos">Todos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pendentes">
            {pendingAppointments.length > 0 ? (
              <div className="space-y-3">
                {pendingAppointments.map((apt) => (
                  <div key={apt.id} className="p-3 border rounded-md bg-white hover:bg-gray-50 transition-colors">
                    <div className="mb-2">
                      <span className="font-medium">{apt.client}</span>
                      <div className="text-sm text-gray-500">
                        {apt.service}
                      </div>
                      <div className="text-sm font-medium">
                        {format(parseISO(apt.date), "dd/MM/yyyy")} · {apt.startTime} - {apt.endTime}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleApproveAppointment(apt.id)}
                      >
                        <CheckIcon className="h-4 w-4 mr-1" /> Aprovar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full border-red-500 text-red-500 hover:bg-red-50"
                        onClick={() => handleRejectAppointment(apt.id)}
                      >
                        <XIcon className="h-4 w-4 mr-1" /> Recusar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500 bg-gray-50/50 rounded-lg border border-dashed">
                <Users className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-2">Nenhum pedido pendente</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="todos">
            {pendingAppointments.length > 0 ? (
              <div className="space-y-3">
                {pendingAppointments.map((apt) => (
                  <div key={apt.id} className="p-3 border rounded-md bg-white hover:bg-gray-50 transition-colors">
                    <div className="mb-2">
                      <span className="font-medium">{apt.client}</span>
                      <div className="text-sm text-gray-500">
                        {apt.service}
                      </div>
                      <div className="text-sm font-medium">
                        {format(parseISO(apt.date), "dd/MM/yyyy")} · {apt.startTime} - {apt.endTime}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleApproveAppointment(apt.id)}
                      >
                        <CheckIcon className="h-4 w-4 mr-1" /> Aprovar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full border-red-500 text-red-500 hover:bg-red-50"
                        onClick={() => handleRejectAppointment(apt.id)}
                      >
                        <XIcon className="h-4 w-4 mr-1" /> Recusar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500 bg-gray-50/50 rounded-lg border border-dashed">
                <Users className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-2">Nenhum pedido pendente</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
