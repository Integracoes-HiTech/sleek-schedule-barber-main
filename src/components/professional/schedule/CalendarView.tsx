
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, CheckIcon, XIcon, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AppointmentItem {
  id: string;
  client: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  paymentStatus: string;
  paymentMethod?: string;
}

interface CalendarViewProps {
  appointments: AppointmentItem[];
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  handleApproveAppointment: (id: string) => void;
  handleRejectAppointment: (id: string) => void;
  handlePayment: (id: string) => void;
}

export const CalendarView = ({
  appointments,
  selectedDate,
  setSelectedDate,
  handleApproveAppointment,
  handleRejectAppointment,
  handlePayment
}: CalendarViewProps) => {
  // Filter appointments for selected date and sort by time
  const filteredAppointments = appointments
    .filter(apt => 
      selectedDate && isSameDay(parseISO(apt.date), selectedDate)
    )
    .sort((a, b) => {
      return a.startTime.localeCompare(b.startTime);
    });

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Calendário de Agendamentos</CardTitle>
        <Badge variant="outline" className="text-sm font-normal">
          {selectedDate && format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="border rounded-md p-3 pointer-events-auto"
              locale={ptBR}
            />
          </div>
          
          <div className="space-y-4">
            <Tabs defaultValue="todos" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="confirmados">Confirmados</TabsTrigger>
              </TabsList>
              
              <TabsContent value="todos" className="mt-2">
                {filteredAppointments.length > 0 ? (
                  <div className="space-y-3">
                    {filteredAppointments.map((apt) => (
                      <div 
                        key={apt.id} 
                        className="flex items-center p-3 border rounded-md bg-white hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{apt.client}</span>
                            <Badge variant={apt.status === "confirmed" ? "default" : "outline"}>
                              {apt.status === "confirmed" ? "Confirmado" : "Pendente"}
                            </Badge>
                            {apt.paymentStatus === "paid" ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Pago
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                Não pago
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {apt.service} · {apt.startTime} - {apt.endTime}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {apt.status === "pending" && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-green-500 text-green-500 hover:bg-green-50"
                                onClick={() => handleApproveAppointment(apt.id)}
                              >
                                <CheckIcon className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-red-500 text-red-500 hover:bg-red-50"
                                onClick={() => handleRejectAppointment(apt.id)}
                              >
                                <XIcon className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          
                          {apt.status === "confirmed" && apt.paymentStatus !== "paid" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-500 text-blue-500 hover:bg-blue-50"
                              onClick={() => handlePayment(apt.id)}
                            >
                              <DollarSign className="h-4 w-4 mr-1" />
                              Pagamento
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500 bg-gray-50/50 rounded-lg border border-dashed">
                    <CalendarIcon className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="mt-2">Nenhum agendamento para esta data</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="confirmados" className="mt-2">
                {filteredAppointments.filter(apt => apt.status === "confirmed").length > 0 ? (
                  <div className="space-y-3">
                    {filteredAppointments
                      .filter(apt => apt.status === "confirmed")
                      .map((apt) => (
                        <div 
                          key={apt.id} 
                          className="flex items-center p-3 border rounded-md bg-white hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{apt.client}</span>
                              <Badge>Confirmado</Badge>
                              {apt.paymentStatus === "paid" ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  Pago
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                  Não pago
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {apt.service} · {apt.startTime} - {apt.endTime}
                            </div>
                          </div>
                          
                          {apt.paymentStatus !== "paid" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-500 text-blue-500 hover:bg-blue-50"
                              onClick={() => handlePayment(apt.id)}
                            >
                              <DollarSign className="h-4 w-4 mr-1" />
                              Pagamento
                            </Button>
                          )}
                        </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500 bg-gray-50/50 rounded-lg border border-dashed">
                    <CalendarIcon className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="mt-2">Nenhum agendamento confirmado para esta data</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
