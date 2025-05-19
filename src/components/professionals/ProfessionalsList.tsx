
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pencil, Trash2 } from "lucide-react";
import { Professional } from "@/types";

interface ProfessionalsListProps {
  professionals: Professional[];
  weekdays: { label: string; value: number }[];
  onEdit: (professional: Professional) => void;
  onDelete: (id: string) => void;
}

export function ProfessionalsList({ professionals, weekdays, onEdit, onDelete }: ProfessionalsListProps) {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    if (confirmDelete === id) {
      onDelete(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
      // Reset after 3 seconds
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Contato</TableHead>
          <TableHead>Especialidades</TableHead>
          <TableHead>Horário de Trabalho</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {professionals.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
              Nenhum profissional cadastrado
            </TableCell>
          </TableRow>
        ) : (
          professionals.map((professional) => (
            <TableRow key={professional.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>
                      {professional.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{professional.name}</div>
                </div>
              </TableCell>
              <TableCell>
                <div>{professional.email}</div>
                <div className="text-gray-500 text-sm">{professional.phone}</div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {professional.specialties.map((specialty) => (
                    <span 
                      key={specialty}
                      className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {professional.scheduleSettings?.workDays
                    .map(day => weekdays.find(d => d.value === day)?.label.slice(0, 3))
                    .join(', ')}
                </div>
                <div className="text-xs text-gray-500">
                  {professional.scheduleSettings?.workHours.start} - {professional.scheduleSettings?.workHours.end}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onEdit(professional)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className={confirmDelete === professional.id 
                      ? "border-red-500 bg-red-500 text-white hover:bg-red-600"
                      : "border-red-500 text-red-500 hover:bg-red-50"
                    }
                    onClick={() => handleDeleteClick(professional.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    {confirmDelete === professional.id && <span className="ml-2">Confirmar</span>}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
