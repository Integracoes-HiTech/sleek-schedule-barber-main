
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Professional } from "@/types";

interface ProfessionalFormProps {
  professional: Partial<Professional> | null;
  availableSpecialties: string[];
  weekdays: { label: string; value: number }[];
  onFormDataChange: (formData: any) => void;
}

export function ProfessionalForm({
  professional,
  availableSpecialties,
  weekdays,
  onFormDataChange,
}: ProfessionalFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialties: [] as string[],
    workDays: [] as number[],
    startTime: "09:00",
    endTime: "18:00",
  });

  useEffect(() => {
    if (professional) {
      setFormData({
        name: professional.name || "",
        email: professional.email || "",
        phone: professional.phone || "",
        specialties: professional.specialties || [],
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      onFormDataChange(updated);
      return updated;
    });
  };

  const handleSpecialtyChange = (specialty: string) => {
    setFormData((prev) => {
      const specialties = prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty];
      const updated = { ...prev, specialties };
      onFormDataChange(updated);
      return updated;
    });
  };

  const handleWorkDayChange = (day: number) => {
    setFormData((prev) => {
      const workDays = prev.workDays.includes(day)
        ? prev.workDays.filter((d) => d !== day)
        : [...prev.workDays, day];
      const updated = { ...prev, workDays };
      onFormDataChange(updated);
      return updated;
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
      
      setFormData((prev) => {
        const updated = { ...prev, phone: value };
        onFormDataChange(updated);
        return updated;
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
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
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefone</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handlePhoneChange}
          placeholder="(00) 00000-0000"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label>Especialidades</Label>
        <div className="grid grid-cols-2 gap-2">
          {availableSpecialties.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <Checkbox 
                id={`specialty-${specialty}`}
                checked={formData.specialties.includes(specialty)}
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
      
      <div className="space-y-2">
        <Label>Dias de trabalho</Label>
        <div className="grid grid-cols-7 gap-1">
          {weekdays.map((day) => (
            <div key={day.value} className="flex flex-col items-center">
              <Checkbox 
                id={`day-${day.value}`}
                checked={formData.workDays.includes(day.value)}
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
          <Label htmlFor="startTime">Horário inicial</Label>
          <Input
            id="startTime"
            name="startTime"
            type="time"
            value={formData.startTime}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">Horário final</Label>
          <Input
            id="endTime"
            name="endTime"
            type="time"
            value={formData.endTime}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
    </div>
  );
}
