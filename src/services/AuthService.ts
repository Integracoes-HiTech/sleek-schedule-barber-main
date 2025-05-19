
import { supabase } from "@/integrations/supabase/client";
import { User, UserRole } from "@/types";

export const AuthService = {
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email, 
      password
    });
    
    if (error) {
      throw error;
    }
    
    return data;
  },
  
  async signUp(email: string, password: string, name: string, role: UserRole = 'client') {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role
        }
      }
    });
    
    if (error) {
      throw error;
    }
    
    return data;
  },
  
  async signOut() {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
  },
  
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      throw error;
    }
    
    if (!user) {
      return null;
    }
    
    // Buscar perfil do usuário para obter o papel
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (profileError) {
      throw profileError;
    }
    
    return {
      id: user.id,
      email: user.email as string,
      name: user.user_metadata?.name || '',
      role: profile?.role as UserRole
    };
  },
  
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    
    if (error) {
      throw error;
    }
  },
  
  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) {
      throw error;
    }
  },
  
  async updateUserProfile(id: string, data: Partial<User>) {
    const { error } = await supabase
      .from('profiles')
      .update({
        name: data.name,
        email: data.email,
        phone: data.phone
      })
      .eq('id', id);
    
    if (error) {
      throw error;
    }
  }
};
