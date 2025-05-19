
import { Link } from 'react-router-dom';
import { Calendar, Gift } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-barber-navy text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="barber-pattern" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
              <rect width="100%" height="100%" fill="#000000" />
              <circle cx="20" cy="20" r="2" fill="#FFFFFF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#barber-pattern)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
            Faça Parte da Experiência <span className="text-barber-gold">Imperium</span>
          </h2>
          
          <p className="text-gray-300 text-lg mb-8">
            Reserve seu horário agora e descubra por que somos a escolha preferida para homens que valorizam qualidade e estilo.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="bg-barber-burgundy hover:bg-barber-burgundy/90 text-white px-8">
                <Calendar className="mr-2 h-5 w-5" /> Agendar Agora
              </Button>
            </Link>
            
            <Link to="/subscription">
              <Button variant="outline" size="lg" className="bg-transparent border-2 border-barber-gold text-barber-gold hover:bg-barber-gold/10 px-8">
                <Gift className="mr-2 h-5 w-5" /> Conhecer Planos
              </Button>
            </Link>
          </div>
          
          <p className="text-gray-400 mt-6">
            Primeira visita? Ganhe 10% de desconto em qualquer serviço.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
