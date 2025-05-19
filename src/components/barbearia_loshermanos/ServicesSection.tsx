
import { Scissors, SprayCan, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    id: 1,
    title: "Corte Clássico",
    description: "Corte tradicional com acabamento perfeito, incluindo lavagem e finalização.",
    price: "R$ 50",
    duration: "45 min",
    icon: <Scissors className="h-6 w-6" />,
  },
  {
    id: 2,
    title: "Barba Completa",
    description: "Modelagem completa da barba com toalha quente, óleos e hidratação.",
    price: "R$ 40",
    duration: "30 min",
    icon: <Scissors className="h-6 w-6" />,
  },
  {
    id: 3,
    title: "Combo Executive",
    description: "Corte clássico + barba completa com tratamento VIP para cabelo e barba.",
    price: "R$ 85",
    duration: "1h 15min",
    icon: <Star className="h-6 w-6" />,
  },
  {
    id: 4,
    title: "Tratamento Capilar",
    description: "Hidratação profunda, tonificação e máscaras especiais para o couro cabeludo.",
    price: "R$ 60",
    duration: "40 min",
    icon: <SprayCan className="h-6 w-6" />,
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 bg-gray-50 hero-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-barber-navy mb-3 font-playfair">
            Nossos Serviços
          </h2>
          <div className="flex justify-center items-center mb-4">
            <div className="w-12 h-1 bg-barber-burgundy rounded-full"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Oferecemos uma ampla gama de serviços premium para cuidar do seu visual com excelência e atenção aos detalhes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="service-card transition-all duration-300 hover:border-barber-gold h-full">
              <CardHeader className="pb-3">
                <div className="h-12 w-12 rounded-full bg-barber-burgundy text-white flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl text-barber-navy font-playfair">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <CardDescription className="text-gray-600">{service.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-2">
                <div className="flex justify-between w-full mb-4">
                  <div className="font-bold text-barber-navy text-lg">{service.price}</div>
                  <div className="text-gray-500 text-sm">{service.duration}</div>
                </div>
                <Link to="/login" className="w-full">
                  <Button variant="outline" className="w-full border-barber-burgundy text-barber-burgundy hover:bg-barber-burgundy hover:text-white">
                    Agendar
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/services">
            <Button className="bg-barber-navy hover:bg-barber-navy/90 text-white">
              Ver Todos os Serviços
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
