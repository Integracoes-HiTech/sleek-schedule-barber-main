
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: "Roberto Carlos",
    role: "Cliente há 3 anos",
    avatar: "https://i.pravatar.cc/150?img=1",
    comment: "Sem dúvidas, a melhor barbearia da cidade! Atendimento impecável e os barbeiros são verdadeiros artistas. Recomendo a todos.",
    rating: 5,
  },
  {
    id: 2,
    name: "Lucas Mendes",
    role: "Cliente há 1 ano",
    avatar: "https://i.pravatar.cc/150?img=2",
    comment: "O ambiente é sofisticado e confortável. O serviço é de primeira qualidade e os produtos são excelentes. Valeu cada centavo!",
    rating: 5,
  },
  {
    id: 3,
    name: "Felipe Oliveira",
    role: "Cliente há 2 anos",
    avatar: "https://i.pravatar.cc/150?img=3",
    comment: "Desde que comecei a frequentar a Imperium, nunca mais mudei de barbearia. Profissionais dedicados e resultado sempre perfeito.",
    rating: 5,
  },
  {
    id: 4,
    name: "André Souza",
    role: "Cliente há 6 meses",
    avatar: "https://i.pravatar.cc/150?img=4",
    comment: "Assinei o plano mensal e foi a melhor decisão. Economizo dinheiro e sempre estou com o visual impecável. Recomendo!",
    rating: 4,
  },
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-barber-navy mb-3 font-playfair">
            O Que Nossos Clientes Dizem
          </h2>
          <div className="flex justify-center items-center mb-4">
            <div className="w-12 h-1 bg-barber-burgundy rounded-full"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experiências reais de clientes que confiam em nossos serviços e recomendam a Imperium Barber.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="flex overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <div className="bg-white rounded-lg shadow-md p-6 md:p-8 text-center">
                    <div className="flex justify-center mb-6">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-barber-gold"
                      />
                    </div>
                    
                    <div className="flex justify-center items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? 'text-barber-gold fill-barber-gold' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-gray-700 text-lg italic mb-6">
                      "{testimonial.comment}"
                    </blockquote>
                    
                    <div>
                      <h4 className="font-bold text-barber-navy text-lg">{testimonial.name}</h4>
                      <p className="text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation arrows */}
          <div className="flex justify-between absolute top-1/2 left-0 right-0 -mt-4">
            <Button 
              onClick={prevTestimonial}
              variant="outline" 
              size="icon"
              className="rounded-full bg-white border border-gray-200 shadow-md hover:bg-barber-burgundy hover:text-white transform -translate-x-1/2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <Button 
              onClick={nextTestimonial}
              variant="outline" 
              size="icon"
              className="rounded-full bg-white border border-gray-200 shadow-md hover:bg-barber-burgundy hover:text-white transform translate-x-1/2"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Dots navigation */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-barber-burgundy' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
