
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/layout/Sidebar";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, setHours, setMinutes, isAfter, isSameDay, parseISO, isBefore } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckIcon } from "lucide-react";

// Mock data
const services = [
  {
    id: "1",
    name: "Corte de Cabelo",
    description: "Corte moderno ou clássico de acordo com sua preferência.",
    duration: 30,
    price: 50
  },
  {
    id: "2",
    name: "Barba",
    description: "Modelagem e aparamento de barba com toalha quente.",
    duration: 30,
    price: 35
  },
  {
    id: "3",
    name: "Combo Completo",
    description: "Corte de cabelo e barba com tratamentos especiais.",
    duration: 60,
    price: 75
  },
  {
    id: "4",
    name: "Sobrancelha",
    description: "Design e acabamento perfeito para suas sobrancelhas.",
    duration: 15,
    price: 20
  },
];

const professionals = [
  {
    id: "1",
    name: "Carlos Oliveira",
    specialties: ["Corte de Cabelo", "Barba"],
    rating: 4.8,
    avatar: ""
  },
  {
    id: "2",
    name: "Rafael Santos",
    specialties: ["Corte de Cabelo", "Sobrancelha"],
    rating: 4.7,
    avatar: ""
  },
  {
    id: "3",
    name: "Marcos Pereira",
    specialties: ["Barba", "Combo Completo"],
    rating: 4.9,
    avatar: ""
  }
];

// Generate time slots
const generateTimeSlots = () => {
  const slots = [];
  const now = new Date();
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

enum BookingStep {
  SERVICE = 0,
  PROFESSIONAL = 1,
  DATE_TIME = 2,
  CONFIRMATION = 3,
  SUCCESS = 4
}

export default function ClientBooking() {
  const [currentStep, setCurrentStep] = useState(BookingStep.SERVICE);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleNextStep = () => {
    if (currentStep === BookingStep.CONFIRMATION) {
      // Submit the booking
      toast({
        title: "Agendamento realizado com sucesso!",
        description: "Você receberá um e-mail de confirmação em breve."
      });
      setCurrentStep(BookingStep.SUCCESS);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const selectedServiceDetails = services.find(s => s.id === selectedService);
  const selectedProfessionalDetails = professionals.find(p => p.id === selectedProfessional);
  
  const isNextDisabled = () => {
    switch (currentStep) {
      case BookingStep.SERVICE:
        return !selectedService;
      case BookingStep.PROFESSIONAL:
        return !selectedProfessional;
      case BookingStep.DATE_TIME:
        return !selectedDate || !selectedTime;
      default:
        return false;
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case BookingStep.SERVICE:
        return (
          <div>
            <h2 className="text-xl font-serif font-bold mb-4">Escolha o serviço</h2>
            <RadioGroup value={selectedService || ""} onValueChange={setSelectedService}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div key={service.id} className="relative">
                    <RadioGroupItem
                      value={service.id}
                      id={`service-${service.id}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`service-${service.id}`}
                      className="flex flex-col p-4 border-2 rounded-lg cursor-pointer peer-data-[state=checked]:border-barber-gold hover:bg-gray-50"
                    >
                      <span className="font-medium">{service.name}</span>
                      <span className="text-sm text-gray-500">{service.description}</span>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm">{service.duration} min</span>
                        <span className="font-bold text-barber-gold">R$ {service.price.toFixed(2)}</span>
                      </div>
                      {selectedService === service.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-barber-gold rounded-full flex items-center justify-center">
                          <CheckIcon className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        );
        
      case BookingStep.PROFESSIONAL:
        // Filter professionals by the selected service specialty
        const serviceSpecialty = selectedServiceDetails?.name || "";
        const filteredProfessionals = professionals.filter(
          p => p.specialties.includes(serviceSpecialty)
        );
        
        return (
          <div>
            <h2 className="text-xl font-serif font-bold mb-4">Escolha o profissional</h2>
            
            {filteredProfessionals.length > 0 ? (
              <RadioGroup value={selectedProfessional || ""} onValueChange={setSelectedProfessional}>
                <div className="space-y-4">
                  {filteredProfessionals.map((professional) => (
                    <div key={professional.id} className="relative">
                      <RadioGroupItem
                        value={professional.id}
                        id={`professional-${professional.id}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`professional-${professional.id}`}
                        className="flex items-center p-4 border-2 rounded-lg cursor-pointer peer-data-[state=checked]:border-barber-gold hover:bg-gray-50"
                      >
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarFallback className="bg-barber-gold/20">
                            {professional.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{professional.name}</div>
                          <div className="text-sm text-gray-500">
                            Especialidades: {professional.specialties.join(", ")}
                          </div>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className={`h-4 w-4 ${
                                  i < Math.floor(professional.rating)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ))}
                            <span className="text-sm ml-1">{professional.rating}</span>
                          </div>
                        </div>
                        {selectedProfessional === professional.id && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-barber-gold rounded-full flex items-center justify-center">
                            <CheckIcon className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Nenhum profissional disponível para este serviço.
                </p>
              </div>
            )}
          </div>
        );
        
      case BookingStep.DATE_TIME:
        return (
          <div>
            <h2 className="text-xl font-serif font-bold mb-4">Escolha a data e horário</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Data</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="border rounded-md p-3 pointer-events-auto"
                  locale={ptBR}
                  disabled={(date) => {
                    // Disable past dates and today
                    return isSameDay(date, new Date()) || isBefore(date, new Date());
                  }}
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Horário</h3>
                <div className="grid grid-cols-3 gap-2 max-h-72 overflow-y-auto p-1">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={selectedTime === time ? "bg-barber-gold text-barber-900" : ""}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      case BookingStep.CONFIRMATION:
        return (
          <div>
            <h2 className="text-xl font-serif font-bold mb-4">Confirme seu agendamento</h2>
            
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <h3 className="font-medium mb-2">Resumo do agendamento</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Serviço:</span>
                  <span className="font-medium">{selectedServiceDetails?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duração:</span>
                  <span className="font-medium">{selectedServiceDetails?.duration} minutos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Profissional:</span>
                  <span className="font-medium">{selectedProfessionalDetails?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data:</span>
                  <span className="font-medium">
                    {selectedDate && format(selectedDate, "dd/MM/yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Horário:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between">
                  <span className="text-gray-800 font-medium">Total:</span>
                  <span className="font-bold text-barber-gold">
                    R$ {selectedServiceDetails?.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>
                Ao confirmar o agendamento, você concorda com nossos termos e políticas 
                de cancelamento. O pagamento será realizado apenas no estabelecimento.
              </p>
            </div>
          </div>
        );
        
      case BookingStep.SUCCESS:
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckIcon className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-serif font-bold mb-2">Agendamento Confirmado!</h2>
            <p className="text-gray-500 mb-6">
              Seu agendamento foi realizado com sucesso. Enviamos um e-mail de 
              confirmação com todos os detalhes.
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-6 text-left">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Serviço:</span>
                  <span className="font-medium">{selectedServiceDetails?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Profissional:</span>
                  <span className="font-medium">{selectedProfessionalDetails?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data e hora:</span>
                  <span className="font-medium">
                    {selectedDate && format(selectedDate, "dd/MM/yyyy")} às {selectedTime}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button 
                onClick={() => window.location.href = "/client/appointments"} 
                className="flex-1"
              >
                Ver Minhas Reservas
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setCurrentStep(BookingStep.SERVICE);
                  setSelectedService(null);
                  setSelectedProfessional(null);
                  setSelectedDate(addDays(new Date(), 1));
                  setSelectedTime(null);
                }}
                className="flex-1"
              >
                Fazer Novo Agendamento
              </Button>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="client" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <h1 className="text-3xl font-serif font-bold mb-6">Agendar Serviço</h1>
          
          {currentStep !== BookingStep.SUCCESS && (
            <div className="mb-6">
              <div className="flex items-center justify-between">
                {[
                  { step: 0, label: "Serviço" },
                  { step: 1, label: "Profissional" },
                  { step: 2, label: "Data e Hora" },
                  { step: 3, label: "Confirmação" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep >= item.step
                          ? "bg-barber-gold text-barber-900"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="ml-2 text-sm hidden md:block">{item.label}</span>
                    {index < 3 && (
                      <div className="h-1 w-16 mx-2 hidden md:block bg-gray-200">
                        <div
                          className={`h-full ${
                            currentStep > item.step ? "bg-barber-gold" : ""
                          }`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <Card>
            <CardContent className="pt-6">
              {renderStepContent()}
              
              {currentStep !== BookingStep.SUCCESS && (
                <div className="flex justify-between mt-8">
                  {currentStep > 0 ? (
                    <Button
                      variant="outline"
                      onClick={handlePreviousStep}
                    >
                      Voltar
                    </Button>
                  ) : (
                    <div />
                  )}
                  
                  <Button
                    onClick={handleNextStep}
                    disabled={isNextDisabled()}
                    className="bg-barber-gold text-barber-900 hover:bg-barber-gold/90"
                  >
                    {currentStep === BookingStep.CONFIRMATION ? "Confirmar Agendamento" : "Avançar"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
