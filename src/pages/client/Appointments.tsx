import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/layout/Sidebar";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { AlertCircle, CalendarIcon, CheckCircle2, Clock, MapPin, Scissors, UserCircle, XCircle } from "lucide-react";


// Mock appointment data
const appointments = [
  {
    id: "1",
    serviceId: "1",
    serviceName: "Corte de Cabelo",
    professionalId: "1",
    professionalName: "Carlos Oliveira",
    date: "2025-05-15",
    startTime: "14:00",
    endTime: "14:30",
    status: "confirmed"
  },
  {
    id: "2",
    serviceId: "3",
    serviceName: "Combo Completo",
    professionalId: "3",
    professionalName: "Marcos Pereira",
    date: "2025-05-20",
    startTime: "10:00",
    endTime: "11:00",
    status: "pending"
  },
  {
    id: "3",
    serviceId: "2",
    serviceName: "Barba",
    professionalId: "2",
    professionalName: "Rafael Santos",
    date: "2025-05-08", // Past appointment
    startTime: "15:00",
    endTime: "15:30",
    status: "completed"
  },
  {
    id: "4",
    serviceId: "1",
    serviceName: "Corte de Cabelo",
    professionalId: "1",
    professionalName: "Carlos Oliveira",
    date: "2025-05-05", // Past appointment
    startTime: "11:00",
    endTime: "11:30",
    status: "cancelled"
  }
];

// Generate available time slots
const generateTimeSlots = () => {
  const slots = [];
  const startHour = 9; // 9 AM
  const endHour = 19; // 7 PM
  const intervalMinutes = 30;
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(time);
    }
  }
  
  return slots;
};

const timeSlots = generateTimeSlots();

export default function ClientAppointments() {
  const [appointmentsData, setAppointmentsData] = useState(appointments);
  const [reschedulingAppointment, setReschedulingAppointment] = useState<any>(null);
  const [cancellationAppointment, setCancellationAppointment] = useState<any>(null);
  const [isReschedulingOpen, setIsReschedulingOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [newDate, setNewDate] = useState<Date | undefined>(undefined);
  const [newTime, setNewTime] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleReschedule = (appointment: any) => {
    setReschedulingAppointment(appointment);
    setNewDate(new Date(appointment.date));
    setNewTime(appointment.startTime);
    setIsReschedulingOpen(true);
  };
  
  const handleCancel = (appointment: any) => {
    setCancellationAppointment(appointment);
    setCancelReason("");
    setIsCancelOpen(true);
  };
  
  const confirmReschedule = () => {
    if (!newDate || !newTime) {
      toast({
        title: "Erro no reagendamento",
        description: "Por favor, selecione uma data e horário válidos.",
        variant: "destructive"
      });
      return;
    }
    
    // Update the appointment with new date and time
    setAppointmentsData(prev => 
      prev.map(apt => 
        apt.id === reschedulingAppointment.id 
          ? { 
              ...apt, 
              date: format(newDate, "yyyy-MM-dd"),
              startTime: newTime,
              // Assuming the duration remains the same
              endTime: calculateEndTime(newTime, apt.startTime, apt.endTime),
              status: "pending" // Reset to pending as it needs re-approval
            } 
          : apt
      )
    );
    
    toast({
      title: "Agendamento reagendado",
      description: `Seu agendamento foi reagendado para ${format(newDate, "dd/MM/yyyy")} às ${newTime}.`,
    });
    
    setIsReschedulingOpen(false);
    setReschedulingAppointment(null);
  };
  
  const confirmCancel = () => {
    // Update the appointment status to cancelled
    setAppointmentsData(prev => 
      prev.map(apt => 
        apt.id === cancellationAppointment.id 
          ? { ...apt, status: "cancelled" } 
          : apt
      )
    );
    
    toast({
      title: "Agendamento cancelado",
      description: "Seu agendamento foi cancelado com sucesso.",
    });
    
    setIsCancelOpen(false);
    setCancellationAppointment(null);
  };
  
  // Helper function to calculate new end time based on original duration
  const calculateEndTime = (newStart: string, originalStart: string, originalEnd: string) => {
    const [startHour, startMinute] = originalStart.split(":").map(Number);
    const [endHour, endMinute] = originalEnd.split(":").map(Number);
    
    // Calculate duration in minutes
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    const durationMinutes = endTotalMinutes - startTotalMinutes;
    
    // Calculate new end time
    const [newStartHour, newStartMinute] = newStart.split(":").map(Number);
    const newEndTotalMinutes = newStartHour * 60 + newStartMinute + durationMinutes;
    
    const newEndHour = Math.floor(newEndTotalMinutes / 60);
    const newEndMinute = newEndTotalMinutes % 60;
    
    return `${newEndHour.toString().padStart(2, "0")}:${newEndMinute.toString().padStart(2, "0")}`;
  };

  // Filter appointments by status
  const upcomingAppointments = appointmentsData.filter(
    apt => apt.status === "confirmed" || apt.status === "pending"
  );
  
  const pastAppointments = appointmentsData.filter(
    apt => apt.status === "completed" || apt.status === "cancelled" || apt.status === "no-show"
  );

  // Helper function to get the status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmado</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pendente</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Concluído</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="text-gray-500 border-gray-500">Cancelado</Badge>;
      case "no-show":
        return <Badge className="bg-red-500">Não compareceu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="client" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-serif font-bold">Meus Agendamentos</h1>
            <div className="hidden md:block">
  <Button 
    onClick={() => window.location.href = "/client/booking"}
    className="bg-barber-gold text-barber-900 hover:bg-barber-gold/90"
  >
    Novo Agendamento
  </Button>
</div>

<div className="fixed bottom-20 right-6 z-50 md:hidden">
  <Button 
    onClick={() => window.location.href = "/client/booking"}
    className="bg-barber-gold text-barber-900 hover:bg-barber-gold/90 rounded-full w-14 h-14 p-0 text-2xl shadow-lg"
  >
    +
  </Button>
</div>
          </div>
          
          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Próximos</TabsTrigger>
              <TabsTrigger value="past">Histórico</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {upcomingAppointments.map((appointment) => (
                    <Card key={appointment.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">
                                {appointment.serviceName}
                              </h3>
                              {getStatusBadge(appointment.status)}
                            </div>
                            
                            <div className="flex flex-col gap-1 text-sm text-gray-500">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4" />
                                <span>
                                  {format(new Date(appointment.date), "EEEE, dd 'de' MMMM", { locale: ptBR })}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{appointment.startTime} - {appointment.endTime}</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <UserCircle className="h-4 w-4" />
                                <span>Com {appointment.professionalName}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-2 md:mt-0">
                            {appointment.status !== "cancelled" && (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="flex-1 md:flex-none"
                                  onClick={() => handleReschedule(appointment)}
                                >
                                  Reagendar
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="flex-1 md:flex-none border-red-500 text-red-500 hover:bg-red-50"
                                  onClick={() => handleCancel(appointment)}
                                >
                                  Cancelar
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">Nenhum agendamento próximo</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Você não tem nenhum agendamento próximo. Que tal fazer um novo agendamento?
                  </p>
                  <Button 
                    className="mt-4 bg-barber-gold text-barber-900 hover:bg-barber-gold/90"
                    onClick={() => window.location.href = "/client/booking"}
                  >
                    Agendar Serviço
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="space-y-4">
              {pastAppointments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {pastAppointments.map((appointment) => (
                    <Card key={appointment.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">
                                {appointment.serviceName}
                              </h3>
                              {getStatusBadge(appointment.status)}
                            </div>
                            
                            <div className="flex flex-col gap-1 text-sm text-gray-500">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4" />
                                <span>
                                  {format(new Date(appointment.date), "EEEE, dd 'de' MMMM", { locale: ptBR })}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{appointment.startTime} - {appointment.endTime}</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <UserCircle className="h-4 w-4" />
                                <span>Com {appointment.professionalName}</span>
                              </div>
                            </div>
                          </div>
                          
                          {appointment.status === "completed" && (
                            <div>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex-1 md:flex-none"
                                onClick={() => window.location.href = "/client/booking"}
                              >
                                Remarcar Igual
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Scissors className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">Nenhum agendamento anterior</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Você ainda não fez nenhum agendamento conosco.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Reschedule Dialog */}
          <Dialog open={isReschedulingOpen} onOpenChange={setIsReschedulingOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Reagendar Agendamento</DialogTitle>
              </DialogHeader>
              
              <div className="grid gap-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Serviço</Label>
                    <p className="text-sm">
                      {reschedulingAppointment?.serviceName} com {reschedulingAppointment?.professionalName}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Selecione uma nova data</Label>
                    <div className="border rounded-md p-1">
                      <Calendar
                        mode="single"
                        selected={newDate}
                        onSelect={setNewDate}
                        className="rounded-md"
                        locale={ptBR}
                        disabled={(date) => {
                          // Disable dates before today
                          return date < new Date();
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Selecione um novo horário</Label>
                    <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={newTime === time ? "default" : "outline"}
                          className={newTime === time ? "bg-barber-gold text-barber-900" : ""}
                          onClick={() => setNewTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsReschedulingOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  className="bg-barber-gold text-barber-900 hover:bg-barber-gold/90"
                  onClick={confirmReschedule}
                >
                  Confirmar reagendamento
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Cancel Dialog */}
          <Dialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Cancelar Agendamento</DialogTitle>
              </DialogHeader>
              
              <div className="grid gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-red-100 p-2 rounded-full">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Você tem certeza que deseja cancelar este agendamento?
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Esta ação não pode ser desfeita.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Detalhes do agendamento</Label>
                  <div className="bg-gray-50 p-3 rounded-md text-sm">
                    <div><span className="font-medium">Serviço:</span> {cancellationAppointment?.serviceName}</div>
                    <div><span className="font-medium">Profissional:</span> {cancellationAppointment?.professionalName}</div>
                    <div><span className="font-medium">Data:</span> {cancellationAppointment && format(new Date(cancellationAppointment.date), "dd/MM/yyyy")}</div>
                    <div><span className="font-medium">Horário:</span> {cancellationAppointment?.startTime}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cancel-reason">Motivo do cancelamento (opcional)</Label>
                  <Input
                    id="cancel-reason"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Informe o motivo do cancelamento"
                  />
                </div>
              </div>
              
              <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCancelOpen(false)}
                >
                  Voltar
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={confirmCancel}
                >
                  Confirmar cancelamento
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
