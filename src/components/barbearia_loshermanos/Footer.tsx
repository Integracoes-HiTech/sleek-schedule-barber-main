
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-barber-navy text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-barber-burgundy p-2 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </div>
              <span className="font-playfair font-bold text-xl text-white">Imperium Barber</span>
            </div>
            <p className="text-gray-300">
              Oferecendo excelência em cortes de cabelo e serviços de barbearia desde 2010.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-barber-gold">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-barber-gold">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-barber-gold">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4 text-barber-gold">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">Serviços</Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-white transition-colors">Agendamento</Link>
              </li>
              <li>
                <Link to="/barbers" className="text-gray-300 hover:text-white transition-colors">Nossa Equipe</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">Produtos</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">Sobre Nós</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4 text-barber-gold">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-barber-gold" />
                <span className="text-gray-300">(11) 99999-8888</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-barber-gold" />
                <span className="text-gray-300">contato@imperiumbarber.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 text-barber-gold" />
                <span className="text-gray-300">Av. Paulista, 1000<br />São Paulo, SP</span>
              </li>
            </ul>
          </div>
          
          {/* Hours */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4 text-barber-gold">Horário de Funcionamento</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-300">Segunda - Sexta:</span>
                <span className="text-gray-300">9:00 - 20:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Sábado:</span>
                <span className="text-gray-300">9:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Domingo:</span>
                <span className="text-gray-300">10:00 - 16:00</span>
              </li>
              <li className="mt-4 flex items-center">
                <Clock size={16} className="mr-2 text-barber-gold" />
                <span className="text-white font-medium">Atendemos com hora marcada</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Imperium Barber. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
