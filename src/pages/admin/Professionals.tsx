
import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, RefreshCw, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Input } from "@/components/ui/input";
import { ProfessionalsList } from "@/components/professionals/ProfessionalsList";
import { ProfessionalDialog } from "@/components/professionals/ProfessionalDialog";
import { Professional } from "@/types";
import { ProfessionalsService } from "@/services/ProfessionalsService";

// Dados de especialidades disponíveis
const availableSpecialties = [
  "Corte de Cabelo",
  "Barba",
  "Sobrancelha",
  "Combo Completo",
  "Coloração",
  "Relaxamento",
];

// Dias da semana
const weekdays = [
  { label: "Domingo", value: 0 },
  { label: "Segunda", value: 1 },
  { label: "Terça", value: 2 },
  { label: "Quarta", value: 3 },
  { label: "Quinta", value: 4 },
  { label: "Sexta", value: 5 },
  { label: "Sábado", value: 6 },
];

export default function AdminProfessionals() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProfessional, setEditingProfessional] = useState<Professional | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Carregar profissionais do Supabase
  const loadProfessionals = async () => {
    setIsLoading(true);
    try {
      const data = await ProfessionalsService.getAll();
      setProfessionals(data);
      setFilteredProfessionals(data);
    } catch (error) {
      console.error("Erro ao carregar profissionais:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os profissionais.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfessionals();
  }, []);

  // Filtrar profissionais com base na pesquisa
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProfessionals(professionals);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = professionals.filter(
        p => p.name.toLowerCase().includes(term) || 
        p.email.toLowerCase().includes(term) || 
        p.specialties.some(s => s.toLowerCase().includes(term))
      );
      setFilteredProfessionals(filtered);
    }
  }, [searchTerm, professionals]);

  const handleOpenDialog = (professional?: Professional) => {
    if (professional) {
      setEditingProfessional(professional);
    } else {
      setEditingProfessional(null);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProfessional(null);
  };

  const handleSaveProfessional = async (formData: any) => {
    try {
      if (editingProfessional) {
        // Atualizar profissional existente
        await ProfessionalsService.update(editingProfessional.id, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          specialties: formData.specialties,
          scheduleSettings: {
            workDays: formData.workDays,
            workHours: {
              start: formData.startTime,
              end: formData.endTime,
            }
          }
        });
        
        toast({
          title: "Profissional atualizado",
          description: `${formData.name} foi atualizado com sucesso.`,
        });
      } else {
        // Criar novo profissional
        // Nota: userId é normalmente preenchido pelo backend
        await ProfessionalsService.create({
          userId: `temp-${Date.now()}`, // Isso deve ser substituído pelo ID real do usuário no backend
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          specialties: formData.specialties,
          scheduleSettings: {
            workDays: formData.workDays,
            workHours: {
              start: formData.startTime,
              end: formData.endTime,
            }
          }
        });
        
        toast({
          title: "Profissional adicionado",
          description: `${formData.name} foi adicionado com sucesso.`,
        });
      }
      
      // Recarregar a lista após salvar
      loadProfessionals();
      handleCloseDialog();
    } catch (error) {
      console.error("Erro ao salvar profissional:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar as informações do profissional.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProfessional = async (id: string) => {
    try {
      await ProfessionalsService.delete(id);
      toast({
        title: "Profissional excluído",
        description: "O profissional foi excluído com sucesso."
      });
      loadProfessionals();
    } catch (error) {
      console.error("Erro ao excluir profissional:", error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o profissional.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="admin" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <PageHeader
            title="Profissionais"
            description="Gerencie os profissionais da barbearia"
          >
            <Button 
              onClick={() => handleOpenDialog()}
              className="bg-barber-gold text-barber-900 hover:bg-barber-gold/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Novo Profissional
            </Button>
          </PageHeader>
          
          <div className="flex items-center mb-4 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Buscar profissionais..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={loadProfessionals}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <ProfessionalsList
                professionals={filteredProfessionals}
                weekdays={weekdays}
                onEdit={handleOpenDialog}
                onDelete={handleDeleteProfessional}
              />
            </CardContent>
          </Card>
          
          <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
            <ProfessionalDialog
              professional={editingProfessional}
              availableSpecialties={availableSpecialties}
              weekdays={weekdays}
              onSave={handleSaveProfessional}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
}
