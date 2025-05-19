
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/layout/Sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarIcon } from "lucide-react";

// Mock professional data
const professionalData = {
  id: "1",
  userId: "user1",
  name: "Carlos Oliveira",
  email: "carlos@example.com",
  phone: "(11) 99999-1111",
  specialties: ["Corte de Cabelo", "Barba"],
  bio: "Especialista em cortes modernos e barbas estilizadas com mais de 5 anos de experiência.",
  scheduleSettings: {
    workDays: [1, 2, 3, 4, 5],
    workHours: {
      start: "09:00",
      end: "18:00",
    },
  },
};

// Mock blocked time slots
const blockedTimeSlots = [
  {
    id: "1",
    date: "2025-05-12",
    startTime: "12:00",
    endTime: "14:00",
    reason: "Almoço"
  },
  {
    id: "2",
    date: "2025-05-15",
    startTime: "09:00",
    endTime: "11:00",
    reason: "Compromisso pessoal"
  },
];

const availableSpecialties = [
  "Corte de Cabelo",
  "Barba",
  "Sobrancelha",
  "Combo Completo",
  "Coloração",
  "Relaxamento",
];

const weekdays = [
  { label: "Domingo", value: 0 },
  { label: "Segunda", value: 1 },
  { label: "Terça", value: 2 },
  { label: "Quarta", value: 3 },
  { label: "Quinta", value: 4 },
  { label: "Sexta", value: 5 },
  { label: "Sábado", value: 6 },
];

export default function ProfessionalProfile() {
  const [profileData, setProfileData] = useState(professionalData);
  const [blocked, setBlocked] = useState(blockedTimeSlots);
  const [newBlock, setNewBlock] = useState({
    date: "",
    startTime: "",
    endTime: "",
    reason: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSpecialtyChange = (specialty: string) => {
    setProfileData(prev => {
      const specialties = prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty];
      return { ...prev, specialties };
    });
  };

  const handleWorkDayChange = (day: number) => {
    setProfileData(prev => {
      const workDays = prev.scheduleSettings.workDays.includes(day)
        ? prev.scheduleSettings.workDays.filter(d => d !== day)
        : [...prev.scheduleSettings.workDays, day];
      return { 
        ...prev, 
        scheduleSettings: {
          ...prev.scheduleSettings,
          workDays
        }
      };
    });
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      scheduleSettings: {
        ...prev.scheduleSettings,
        workHours: {
          ...prev.scheduleSettings.workHours,
          [name]: value
        }
      }
    }));
  };

  const handleNewBlockChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBlock({ ...newBlock, [name]: value });
  };

  const handleSaveProfile = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso."
    });
    setIsEditing(false);
  };

  const handleAddBlock = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBlockData = {
      id: Date.now().toString(),
      ...newBlock
    };
    
    setBlocked([...blocked, newBlockData]);
    setNewBlock({
      date: "",
      startTime: "",
      endTime: "",
      reason: ""
    });
    
    toast({
      title: "Horário bloqueado",
      description: "O horário foi bloqueado com sucesso."
    });
  };

  const handleRemoveBlock = (id: string) => {
    setBlocked(blocked.filter(block => block.id !== id));
    toast({
      title: "Bloqueio removido",
      description: "O horário bloqueado foi removido com sucesso."
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      if (value.length > 2) {
        value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
      }
      
      if (value.length > 10) {
        value = `${value.substring(0, 10)}-${value.substring(10)}`;
      }
      
      setProfileData({ ...profileData, phone: value });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="professional" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-serif font-bold">Meu Perfil</h1>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
              <TabsTrigger value="profile">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="schedule">Agenda</TabsTrigger>
              <TabsTrigger value="blocks">Bloqueios</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Informações Pessoais</CardTitle>
                  <Button 
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline"
                  >
                    {isEditing ? "Cancelar" : "Editar"}
                  </Button>
                </CardHeader>
                <CardContent>
                  {!isEditing ? (
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <Avatar className="h-20 w-20 mr-6">
                          <AvatarFallback className="text-xl">
                            {profileData.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-2xl font-medium">{profileData.name}</h2>
                          <p className="text-gray-500">{profileData.email}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Telefone</h3>
                          <p>{profileData.phone}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Especialidades</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {profileData.specialties.map(specialty => (
                              <span
                                key={specialty}
                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Biografia</h3>
                        <p className="mt-1">{profileData.bio}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Dias de Trabalho</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {weekdays.map(day => (
                            <span
                              key={day.value}
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                                profileData.scheduleSettings.workDays.includes(day.value)
                                  ? 'bg-barber-gold text-barber-900'
                                  : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {day.label}
                            </span>
                          ))}
                        </div>
                        <p className="mt-2 text-sm">
                          Horário: {profileData.scheduleSettings.workHours.start} - {profileData.scheduleSettings.workHours.end}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome completo</Label>
                        <Input
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handlePhoneChange}
                          placeholder="(00) 00000-0000"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Biografia</Label>
                        <Input
                          id="bio"
                          name="bio"
                          value={profileData.bio}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Especialidades</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {availableSpecialties.map((specialty) => (
                            <div key={specialty} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`specialty-${specialty}`}
                                checked={profileData.specialties.includes(specialty)}
                                onCheckedChange={() => handleSpecialtyChange(specialty)}
                              />
                              <label
                                htmlFor={`specialty-${specialty}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {specialty}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <Label>Disponibilidade</Label>
                        
                        <div className="space-y-2">
                          <Label className="text-sm">Dias de trabalho</Label>
                          <div className="grid grid-cols-7 gap-1">
                            {weekdays.map((day) => (
                              <div key={day.value} className="flex flex-col items-center">
                                <Checkbox 
                                  id={`day-${day.value}`}
                                  checked={profileData.scheduleSettings.workDays.includes(day.value)}
                                  onCheckedChange={() => handleWorkDayChange(day.value)}
                                />
                                <label
                                  htmlFor={`day-${day.value}`}
                                  className="text-xs font-medium mt-1"
                                >
                                  {day.label.slice(0, 3)}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="start" className="text-sm">Horário inicial</Label>
                            <Input
                              id="start"
                              name="start"
                              type="time"
                              value={profileData.scheduleSettings.workHours.start}
                              onChange={handleTimeChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="end" className="text-sm">Horário final</Label>
                            <Input
                              id="end"
                              name="end"
                              type="time"
                              value={profileData.scheduleSettings.workHours.end}
                              onChange={handleTimeChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleSaveProfile}>
                          Salvar alterações
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Meus Horários</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-md border">
                      <h3 className="font-medium mb-2">Horário de Trabalho</h3>
                      <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
                        {weekdays.map(day => (
                          <div 
                            key={day.value}
                            className={`p-2 rounded-md text-center ${
                              profileData.scheduleSettings.workDays.includes(day.value)
                                ? 'bg-barber-gold/10 border border-barber-gold/30'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            <div className="text-sm font-medium">{day.label.slice(0, 3)}</div>
                            {profileData.scheduleSettings.workDays.includes(day.value) ? (
                              <div className="text-xs">
                                {profileData.scheduleSettings.workHours.start} - {profileData.scheduleSettings.workHours.end}
                              </div>
                            ) : (
                              <div className="text-xs">Indisponível</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Editar Horário
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="blocks">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Bloquear Horários</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddBlock} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Data</Label>
                          <div className="relative">
                            <Input
                              id="date"
                              name="date"
                              type="date"
                              value={newBlock.date}
                              onChange={handleNewBlockChange}
                              required
                            />
                            <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label htmlFor="startTime">Início</Label>
                            <Input
                              id="startTime"
                              name="startTime"
                              type="time"
                              value={newBlock.startTime}
                              onChange={handleNewBlockChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="endTime">Fim</Label>
                            <Input
                              id="endTime"
                              name="endTime"
                              type="time"
                              value={newBlock.endTime}
                              onChange={handleNewBlockChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="reason">Motivo (opcional)</Label>
                        <Input
                          id="reason"
                          name="reason"
                          placeholder="Ex: Consulta médica, curso, etc."
                          value={newBlock.reason}
                          onChange={handleNewBlockChange}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full">Adicionar Bloqueio</Button>
                    </form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Horários Bloqueados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {blocked.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Data</TableHead>
                            <TableHead>Horário</TableHead>
                            <TableHead>Motivo</TableHead>
                            <TableHead className="w-[100px]">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {blocked.map((block) => (
                            <TableRow key={block.id}>
                              <TableCell>
                                {new Date(block.date).toLocaleDateString('pt-BR')}
                              </TableCell>
                              <TableCell>{block.startTime} - {block.endTime}</TableCell>
                              <TableCell>{block.reason || "Não especificado"}</TableCell>
                              <TableCell>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="h-8 w-8 p-0 text-red-500"
                                  onClick={() => handleRemoveBlock(block.id)}
                                >
                                  <span className="sr-only">Remover</span>
                                  ×
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        Não há horários bloqueados no momento
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
