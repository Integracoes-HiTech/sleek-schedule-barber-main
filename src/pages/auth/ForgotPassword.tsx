
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  
  // Mock function for password reset
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "E-mail enviado",
        description: "Se esse e-mail estiver registrado, você receberá instruções para redefinir sua senha.",
      });
      
      setSubmitted(true);
    } catch (err) {
      setError("Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 bg-gray-50">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-serif text-center">Esqueceu a senha?</CardTitle>
              <CardDescription className="text-center">
                {!submitted 
                  ? "Informe seu e-mail para receber instruções de redefinição de senha"
                  : "Verifique seu e-mail para instruções de redefinição de senha"
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {!submitted ? (
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
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-barber-900 hover:bg-barber-800" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Enviando..." : "Enviar link de redefinição"}
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-8 h-8 text-green-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600">
                    Enviamos um e-mail com instruções para redefinir sua senha. 
                    Verifique sua caixa de entrada.
                  </p>
                  <Button 
                    className="w-full mt-4 bg-barber-900 hover:bg-barber-800"
                    onClick={() => {
                      setSubmitted(false);
                      setEmail("");
                    }}
                  >
                    Tentar outro e-mail
                  </Button>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-600">
                Lembrou sua senha?{" "}
                <Link to="/login" className="text-barber-gold hover:underline font-medium">
                  Voltar para o login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
