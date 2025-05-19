
import { supabase } from "@/integrations/supabase/client";
import { Appointment } from "@/types";
import { AppointmentCreateInput, AppointmentStatus, AppointmentUpdateInput, PaymentMethod, PaymentStatus, mapAppointmentFromDb, mapAppointmentToDb, mapAppointmentUpdateToDb } from "./types";

export const AppointmentOperationsService = {
  async create(appointment: AppointmentCreateInput): Promise<Appointment> {
    const dbData = mapAppointmentToDb(appointment);
    
    const { data, error } = await supabase
      .from('appointments')
      .insert([dbData])
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao criar agendamento:', error);
      throw new Error(error.message);
    }
    
    return mapAppointmentFromDb(data);
  },
  
  async update(id: string, appointment: AppointmentUpdateInput): Promise<Appointment> {
    const updateData = mapAppointmentUpdateToDb(appointment);
    
    const { data, error } = await supabase
      .from('appointments')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao atualizar agendamento:', error);
      throw new Error(error.message);
    }
    
    return mapAppointmentFromDb(data);
  },
  
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Erro ao excluir agendamento:', error);
      throw new Error(error.message);
    }
  },
  
  async updateStatus(id: string, status: AppointmentStatus): Promise<void> {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);
    
    if (error) {
      console.error('Erro ao atualizar status do agendamento:', error);
      throw new Error(error.message);
    }
  },
  
  async updatePayment(id: string, paymentStatus: PaymentStatus, paymentMethod: PaymentMethod): Promise<void> {
    const { error } = await supabase
      .from('appointments')
      .update({ 
        payment_status: paymentStatus, 
        payment_method: paymentMethod 
      })
      .eq('id', id);
    
    if (error) {
      console.error('Erro ao atualizar informações de pagamento:', error);
      throw new Error(error.message);
    }
  }
};
