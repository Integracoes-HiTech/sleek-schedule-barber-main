
import { supabase } from "@/integrations/supabase/client";
import { Professional } from "@/types";

export const ProfessionalsService = {
  async getAll(): Promise<Professional[]> {
    const { data, error } = await supabase
      .from('professionals')
      .select('*, professional_schedule_settings!professional_id(*)')
      .order('name');
    
    if (error) {
      console.error('Erro ao buscar profissionais:', error);
      throw new Error(error.message);
    }
    
    // Converter o formato do banco para o formato da aplicação
    return data?.map(prof => ({
      id: prof.id,
      userId: prof.user_id,
      name: prof.name,
      email: prof.email,
      phone: prof.phone,
      specialties: prof.specialties,
      scheduleSettings: prof.professional_schedule_settings ? {
        workDays: prof.professional_schedule_settings.work_days,
        workHours: {
          start: prof.professional_schedule_settings.start_time,
          end: prof.professional_schedule_settings.end_time
        }
      } : undefined
    })) || [];
  },
  
  async getById(id: string): Promise<Professional | null> {
    const { data, error } = await supabase
      .from('professionals')
      .select('*, professional_schedule_settings!professional_id(*)')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Erro ao buscar profissional:', error);
      throw new Error(error.message);
    }
    
    if (!data) return null;
    
    return {
      id: data.id,
      userId: data.user_id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      specialties: data.specialties,
      scheduleSettings: data.professional_schedule_settings ? {
        workDays: data.professional_schedule_settings.work_days,
        workHours: {
          start: data.professional_schedule_settings.start_time,
          end: data.professional_schedule_settings.end_time
        }
      } : undefined
    };
  },
  
  async create(professional: Omit<Professional, 'id'>): Promise<Professional> {
    // Primeiro criamos o profissional
    const { data: profData, error: profError } = await supabase
      .from('professionals')
      .insert([{
        user_id: professional.userId,
        name: professional.name,
        email: professional.email,
        phone: professional.phone,
        specialties: professional.specialties
      }])
      .select()
      .single();
    
    if (profError) {
      console.error('Erro ao criar profissional:', profError);
      throw new Error(profError.message);
    }
    
    // Depois criamos as configurações de horário
    if (professional.scheduleSettings) {
      const { error: scheduleError } = await supabase
        .from('professional_schedule_settings')
        .insert([{
          professional_id: profData.id,
          work_days: professional.scheduleSettings.workDays,
          start_time: professional.scheduleSettings.workHours.start,
          end_time: professional.scheduleSettings.workHours.end
        }]);
      
      if (scheduleError) {
        console.error('Erro ao criar configurações de horário:', scheduleError);
        throw new Error(scheduleError.message);
      }
    }
    
    return {
      ...professional,
      id: profData.id
    };
  },
  
  async update(id: string, professional: Partial<Professional>): Promise<Professional> {
    // Atualizamos o profissional
    const updateData: any = {};
    if (professional.name) updateData.name = professional.name;
    if (professional.email) updateData.email = professional.email;
    if (professional.phone) updateData.phone = professional.phone;
    if (professional.specialties) updateData.specialties = professional.specialties;
    
    const { data: profData, error: profError } = await supabase
      .from('professionals')
      .update(updateData)
      .eq('id', id)
      .select('*, professional_schedule_settings!professional_id(*)')
      .single();
    
    if (profError) {
      console.error('Erro ao atualizar profissional:', profError);
      throw new Error(profError.message);
    }
    
    // Se tiver configurações de horário para atualizar
    if (professional.scheduleSettings) {
      const { error: scheduleError } = await supabase
        .from('professional_schedule_settings')
        .upsert({
          professional_id: id,
          work_days: professional.scheduleSettings.workDays,
          start_time: professional.scheduleSettings.workHours.start,
          end_time: professional.scheduleSettings.workHours.end
        });
      
      if (scheduleError) {
        console.error('Erro ao atualizar configurações de horário:', scheduleError);
        throw new Error(scheduleError.message);
      }
    }
    
    return {
      id: profData.id,
      userId: profData.user_id,
      name: profData.name,
      email: profData.email,
      phone: profData.phone,
      specialties: profData.specialties,
      scheduleSettings: profData.professional_schedule_settings ? {
        workDays: profData.professional_schedule_settings.work_days,
        workHours: {
          start: profData.professional_schedule_settings.start_time,
          end: profData.professional_schedule_settings.end_time
        }
      } : undefined
    };
  },
  
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('professionals')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Erro ao excluir profissional:', error);
      throw new Error(error.message);
    }
  }
};
