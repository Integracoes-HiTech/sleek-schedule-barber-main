
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types";

export const ServicesService = {
  async getAll(): Promise<Service[]> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Erro ao buscar serviços:', error);
      throw new Error(error.message);
    }
    
    return data || [];
  },
  
  async getById(id: string): Promise<Service | null> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Erro ao buscar serviço:', error);
      throw new Error(error.message);
    }
    
    return data;
  },
  
  async create(service: Omit<Service, 'id'>): Promise<Service> {
    const { data, error } = await supabase
      .from('services')
      .insert([service])
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao criar serviço:', error);
      throw new Error(error.message);
    }
    
    return data;
  },
  
  async update(id: string, service: Partial<Service>): Promise<Service> {
    const { data, error } = await supabase
      .from('services')
      .update(service)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao atualizar serviço:', error);
      throw new Error(error.message);
    }
    
    return data;
  },
  
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Erro ao excluir serviço:', error);
      throw new Error(error.message);
    }
  }
};
