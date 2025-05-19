import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative h-[550px] flex flex-col-reverse md:h-[650px] bg-barber-navy overflow-hidden">
      {/* Imagem de fundo com overlay separado */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
          alt="Ambiente de barbearia premium" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" /> {/* Overlay escuro sem apagar imagem */}
      </div>
      
      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 font-playfair">
            A Arte da Barbearia <span className="text-barber-gold">Premium</span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-8">
            Uma experiência exclusiva de cuidados masculinos com os melhores profissionais e produtos de alta qualidade.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/login">
              <Button size="lg" className="bg-barber-burgundy hover:bg-barber-burgundy/90 text-white px-8 py-6">
                <Calendar className="mr-2 h-5 w-5" /> Agendar Agora
              </Button>
            </Link>
            
            <Link to="/services">
              <Button variant="outline" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6">
                Nossos Serviços
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Gradiente no rodapé da seção */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-barber-navy to-transparent" />
    </section>
  );
};

export default HeroSection;
