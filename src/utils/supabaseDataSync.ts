
import { supabase } from "@/integrations/supabase/client";
import { ServiceData } from "./initialData";

export const syncInitialData = async () => {
  try {
    // Verifica se já existem serviços
    const { count: serviceCount } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true });
    
    // Se não existirem serviços, sincroniza os dados iniciais
    if (serviceCount === 0) {
      await syncInitialServices();
      console.log("✅ Dados iniciais de serviços sincronizados com sucesso!");
    }
  } catch (error) {
    console.error("Erro ao sincronizar dados iniciais:", error);
  }
};

export const syncInitialServices = async () => {
  try {
    const services = ServiceData.map(service => ({
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price
    }));

    const { error } = await supabase
      .from('services')
      .insert(services);

    if (error) throw error;
  } catch (error) {
    console.error("Erro ao sincronizar serviços iniciais:", error);
    throw error;
  }
};

// Dados que precisam ser inseridos inicialmente para a aplicação funcionar
export const syncInitialBarbershop = async () => {
  try {
    const { count } = await supabase
      .from('barbershops')
      .select('*', { count: 'exact', head: true });
    
    if (count === 0) {
      const { error } = await supabase
        .from('barbershops')
        .insert([{
          name: "BarberShop Elite",
          cnpj: "12.345.678/0001-90",
          street: "Rua da Barbearia, 123",
          city: "São Paulo",
          state: "SP",
          zip_code: "01234-567",
          phone: "(11) 99999-9999",
          email: "contato@barbershopelit.com.br"
        }]);
      
      if (error) throw error;
      
      console.log("✅ Dados da barbearia sincronizados com sucesso!");
    }
  } catch (error) {
    console.error("Erro ao sincronizar dados da barbearia:", error);
  }
};
