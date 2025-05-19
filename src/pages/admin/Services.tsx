
import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { ServicesService } from "@/services/ServicesService";
import { Service } from "@/types";
import { PageHeader } from "@/components/ui/page-header";

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    price: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await ServicesService.getAll();
        setServices(data);
      } catch (error) {
        toast({
          title: "Erro ao carregar serviços",
          description: "Não foi possível carregar a lista de serviços.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        description: service.description,
        duration: service.duration.toString(),
        price: service.price.toString()
      });
    } else {
      setEditingService(null);
      setFormData({
        name: "",
        description: "",
        duration: "",
        price: ""
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const serviceData = {
        name: formData.name,
        description: formData.description,
        duration: parseInt(formData.duration),
        price: parseFloat(formData.price)
      };
      
      if (editingService) {
        // Update existing service
        const updated = await ServicesService.update(editingService.id, serviceData);
        setServices(services.map(s => s.id === editingService.id ? updated : s));
        toast({
          title: "Serviço atualizado",
          description: `${serviceData.name} foi atualizado com sucesso.`
        });
      } else {
        // Add new service
        const created = await ServicesService.create(serviceData);
        setServices([...services, created]);
        toast({
          title: "Serviço criado",
          description: `${serviceData.name} foi adicionado com sucesso.`
        });
      }
      
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o serviço.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      await ServicesService.delete(id);
      setServices(services.filter(s => s.id !== id));
      toast({
        title: "Serviço excluído",
        description: "O serviço foi excluído com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir este serviço.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="admin" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <PageHeader 
            title="Serviços"
            description="Gerencie os serviços oferecidos pela barbearia."
          >
            <Button 
              onClick={() => handleOpenDialog()}
              className="bg-barber-gold text-barber-900 hover:bg-barber-gold/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Novo Serviço
            </Button>
          </PageHeader>
          
          <Card>
            <CardHeader>
              <CardTitle>Lista de Serviços</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-4 border-barber-gold border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : services.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nenhum serviço cadastrado.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => handleOpenDialog()}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Adicionar primeiro serviço
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Duração</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.name}</TableCell>
                        <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                        <TableCell>{service.duration} min</TableCell>
                        <TableCell>R$ {Number(service.price).toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleOpenDialog(service)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-red-500 text-red-500 hover:bg-red-50"
                              onClick={() => handleDeleteService(service.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingService ? 'Editar Serviço' : 'Novo Serviço'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do serviço</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração (min)</Label>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      min="5"
                      step="5"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Salvando...
                      </>
                    ) : editingService ? 'Salvar alterações' : 'Criar serviço'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
