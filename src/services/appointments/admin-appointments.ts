
import { supabase } from "@/integrations/supabase/client";
import { Appointment } from "@/types";
import { mapAppointmentFromDb } from "./types";

export const AdminAppointmentsService = {
  async getAll(): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        profiles:client_id (id, name),
        professionals:professional_id (name),
        services:service_id (name)
      `)
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Erro ao buscar todos os agendamentos:', error);
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
  },
  
  async getById(id: string): Promise<Appointment | null> {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        profiles:client_id (id, name),
        professionals:professional_id (name),
        services:service_id (name)
      `)
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Erro ao buscar agendamento:', error);
      throw new Error(error.message);
    }
    
    // Create a modified item that includes clients property for compatibility
    const modifiedData = {
      ...data,
      clients: data.profiles || null // Map profile data to clients for compatibility
    };
    
    return mapAppointmentFromDb(modifiedData);
  }
};
