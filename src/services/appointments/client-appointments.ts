
import { supabase } from "@/integrations/supabase/client";
import { Appointment } from "@/types";
import { AppointmentStatus, mapAppointmentFromDb } from "./types";

export const ClientAppointmentsService = {
  async getByClientId(clientId: string): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        professionals:professional_id (name),
        services:service_id (name)
      `)
      .eq('client_id', clientId)
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Erro ao buscar agendamentos do cliente:', error);
      throw new Error(error.message);
    }
    
    return data?.map(item => mapAppointmentFromDb(item)) || [];
  }
};
