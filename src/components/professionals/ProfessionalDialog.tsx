
import { useState, useEffect } from "react";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProfessionalForm } from "./ProfessionalForm";
import { Professional } from "@/types";

interface ProfessionalDialogProps {
  professional: Professional | null;
  availableSpecialties: string[];
  weekdays: { label: string; value: number }[];
  onSave: (professionalData: any) => void;
}

export function ProfessionalDialog({
  professional,
  availableSpecialties,
  weekdays,
  onSave,
}: ProfessionalDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialties: [] as string[],
    workDays: [1, 2, 3, 4, 5],
    startTime: "09:00",
    endTime: "18:00",
  });

  useEffect(() => {
    if (professional) {
      setFormData({
        name: professional.name,
        email: professional.email,
        phone: professional.phone,
        specialties: professional.specialties,
        workDays: professional.scheduleSettings?.workDays || [1, 2, 3, 4, 5],
        startTime: professional.scheduleSettings?.workHours?.start || "09:00",
        endTime: professional.scheduleSettings?.workHours?.end || "18:00",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        specialties: [],
        workDays: [1, 2, 3, 4, 5],
        startTime: "09:00",
        endTime: "18:00",
      });
    }
  }, [professional]);

  const handleFormDataChange = (data: any) => {
    setFormData(data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>
          {professional ? 'Editar Profissional' : 'Novo Profissional'}
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <ProfessionalForm
          professional={professional}
          availableSpecialties={availableSpecialties}
          weekdays={weekdays}
          onFormDataChange={handleFormDataChange}
        />
        <DialogFooter className="mt-6">
          <Button type="submit">
            {professional ? 'Salvar alterações' : 'Adicionar profissional'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
