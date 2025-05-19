
import { Star, Instagram } from 'lucide-react';

const barbers = [
  {
    id: 1,
    name: "Ricardo Silva",
    role: "Master Barber",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    rating: 4.9,
    reviews: 120,
    specialties: ["Cortes Clássicos", "Barba"],
    instagram: "@ricardo.barber",
  },
  {
    id: 2,
    name: "Carlos Mendes",
    role: "Senior Barber",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    rating: 4.8,
    reviews: 95,
    specialties: ["Degradê", "Tingimento"],
    instagram: "@carlos.barber",
  },
  {
    id: 3,
    name: "André Ferreira",
    role: "Expert Barber",
    image: "https://images.unsplash.com/photo-1534955692753-106c8e350e9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    rating: 4.7,
    reviews: 88,
    specialties: ["Cortes Modernos", "Design de Barba"],
    instagram: "@andre.barber",
  },
  {
    id: 4,
    name: "Paulo Martins",
    role: "Style Specialist",
    image: "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    rating: 4.6,
    reviews: 75,
    specialties: ["Tratamentos Capilares", "Penteados"],
    instagram: "@paulo.barber",
  },
];

const BarbersSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-barber-navy mb-3 font-playfair">
            Conheça Nossa Equipe
          </h2>
          <div className="flex justify-center items-center mb-4">
            <div className="w-12 h-1 bg-barber-burgundy rounded-full"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Profissionais experientes e apaixonados pela arte da barbearia prontos para dar vida ao seu estilo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {barbers.map((barber) => (
            <div key={barber.id} className="barber-card group relative overflow-hidden rounded-lg shadow-md">
              {/* Barber Image */}
              <div className="aspect-square overflow-hidden">
                <img 
                  src={barber.image} 
                  alt={barber.name} 
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              {/* Info Overlay */}
              <div className="p-4 bg-white">
                <h3 className="font-playfair text-xl font-semibold text-barber-navy">{barber.name}</h3>
                <p className="text-barber-burgundy mb-2">{barber.role}</p>
                
                {/* Rating */}
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-barber-gold fill-barber-gold" />
                  <span className="ml-1 text-sm font-medium">{barber.rating}</span>
                  <span className="mx-1 text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{barber.reviews} avaliações</span>
                </div>
                
                {/* Specialties */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {barber.specialties.map((specialty, index) => (
                      <span 
                        key={index}
                        className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Social */}
                <div className="flex items-center text-gray-500">
                  <Instagram className="h-4 w-4 mr-1" />
                  <span className="text-sm">{barber.instagram}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BarbersSection;
