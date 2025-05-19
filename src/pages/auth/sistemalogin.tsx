import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate(); // ✅ redirecionamento

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (email === "admin@cortify.com" && password === "admin123") {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast({
          title: "Login realizado",
          description: "Bem-vindo de volta, gerente!",
        });

        navigate("/admin/dashboard"); // ✅ redireciona internamente
      } else {
        setError("Credenciais inválidas.");
      }
    } catch {
      setError("Erro no login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-barber-900 tracking-wide">CORTIFY</h1>
            <CardTitle className="text-xl font-serif">Área do Gerente</CardTitle>
            <CardDescription>Acesso restrito ao painel administrativo</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@cortify.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
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
              </div>

              <Button
                type="submit"
                className="w-full bg-barber-900 text-white hover:bg-barber-800"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center">
            <p className="text-xs text-gray-400">© CORTIFY 2025</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
