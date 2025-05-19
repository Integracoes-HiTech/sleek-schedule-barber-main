
import { supabase } from "@/integrations/supabase/client";
import { Appointment } from "@/types";
import { mapAppointmentFromDb } from "./types";

export const ProfessionalAppointmentsService = {
  async getByProfessionalId(professionalId: string): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        profiles:client_id (id, name),
        services:service_id (name)
      `)
      .eq('professional_id', professionalId)
      .order('date', { ascending: true });
    
    if (error) {
      console.error('Erro ao buscar agendamentos do profissional:', error);
      throw new Error(error.message);
    }
    
    return data?.map(item => {
      // Create a modified item that includes clients property for compatibility
      const modifiedItem = {
        ...item,
        clients: item.profiles || null // Map profile data to clients for compatibility
      };
      return mapAppointmentFromDb(modifiedItem);
    }) || [];
  }
};
