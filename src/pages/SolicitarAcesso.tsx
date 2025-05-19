
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = "Nome é obrigatório";
    
    if (!email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "E-mail inválido";
    }
    
    if (!phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(phone)) {
      newErrors.phone = "Formato inválido. Use (99) 99999-9999";
    }
    
    if (!password) {
      newErrors.password = "Senha é obrigatória";
    } else if (password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres";
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }
    
    return newErrors;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Mock registration - would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Conta criada com sucesso!",
        description: "Você será redirecionado para fazer o agendamento.",
      });
      
      // Redirect to booking page
      setTimeout(() => {
        window.location.href = "/client/booking";
      }, 2000);
      
    } catch (err) {
      setErrors({
        form: "Falha ao criar conta. Por favor, tente novamente."
      });
    } finally {
      setIsLoading(false);
    }
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
      
      setPhone(value);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 bg-gray-50">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-serif text-center">Solicitar Acessso</CardTitle>
              <CardDescription className="text-center">
                Preencha os dados abaixo para se cadastrar e receber o teste por 7 dias
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.form && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                    {errors.form}
                  </div>
                )}

                  <div className="space-y-2">
                  <Label htmlFor="barbershop">Nome da Barbearia</Label>
                  <Input
                   id="barbershop"
                   type="text"
                   placeholder="Nome da Barbearia"
                   
                   required
                  />
</div>
           
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(99) 99999-9999"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

              
                <Button 
                  type="submit" 
                  className="w-full bg-barber-gold text-barber-900 hover:bg-barber-gold/90" 
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Enviar Dados"}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link to="/sistemalogin" className="text-barber-gold hover:underline font-medium">
                  Entrar
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      
   
    </div>
  );
}
