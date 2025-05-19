import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const validEmails = [
        "admin@example.com",
        "professional@example.com",
        "client@example.com"
      ];

      if (validEmails.includes(email) && password === "password") {
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast({
          title: "Login bem-sucedido",
          description: "Redirecionando para o painel...",
        });

        if (email.includes("admin")) {
          window.location.href = "/admin/dashboard";
        } else if (email.includes("professional")) {
          window.location.href = "/professional/schedule";
        } else {
          window.location.href = "/client/booking";
        }
      } else {
        setError("Email ou senha incorretos.");
      }
    } catch {
      setError("Falha no login. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 bg-gray-50">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-serif text-center">Entrar</CardTitle>
              <CardDescription className="text-center">
                Digite seu e-mail e senha para acessar sua conta
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                    {error}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-barber-gold hover:underline"
                    >
                      Esqueci minha senha
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-barber-900 hover:bg-barber-800" 
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <Link to="/register" className="text-barber-gold hover:underline font-medium">
                  Cadastre-se
                </Link>
              </p>
            </CardFooter>
          </Card>
          
          {/* Demo accounts for testing */}
          <div className="mt-8 bg-white p-4 rounded-md shadow border border-gray-100">
            <h3 className="font-medium text-sm text-gray-700 mb-2"></h3>
            <div className="space-y-1 text-xs text-gray-600">
        
            </div>
          </div>
        </div>
      </main>
     
    </div>
  );
}
