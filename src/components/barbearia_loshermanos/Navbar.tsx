import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Calendar, User, BarChart2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md w-full z-40 sticky top-0">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Business Name */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-barber-burgundy text-white p-2 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </div>
            <span className="font-playfair font-bold text-xl md:text-2xl text-barber-navy">Los hermanos</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-barber-charcoal hover:text-barber-burgundy font-medium transition-colors">Home</Link>
            <Link to="/" className="text-barber-charcoal hover:text-barber-burgundy font-medium transition-colors">Serviços</Link>
            <Link to="/" className="text-barber-charcoal hover:text-barber-burgundy font-medium transition-colors">Equipe</Link>
            <Link to="/" className="text-barber-charcoal hover:text-barber-burgundy font-medium transition-colors">Sobre</Link>
            <Link to="/sistemalogin" className="text-barber-charcoal hover:text-barber-burgundy font-medium transition-colors">ACESSAR</Link>
            <Link to="/login" className="text-barber-charcoal hover:text-barber-burgundy font-medium transition-colors">SOU CLIENTE</Link>
            <Link to="/login">
              <Button className="bg-barber-burgundy hover:bg-barber-burgundy/90 text-white">
                <Calendar className="mr-2 h-4 w-4" /> Agendar
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-barber-navy focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? 'block animate-fade-in' : 'hidden'} md:hidden mt-4 pb-4`}>
          <div className="flex flex-col space-y-3">
            <Link to="" className="text-barber-charcoal hover:text-barber-burgundy font-medium transition-colors py-2">Equipe</Link>
            <Link to="" className="text-barber-charcoal hover:text-barber-burgundy font-medium transition-colors py-2">Sobre</Link>
            <Link to="/login" className="text-barber-charcoal hover:text-barber-burgundy font-medium transition-colors py-2">ACESSAR</Link>
            <Link to="/login" className="text-barber-charcoal hover:text-barber-burgundy font-medium transition-colors py-2">SOU CLIENTE</Link>
           
            <Link to="/login" className="text-center bg-barber-burgundy text-white py-3 rounded-md hover:bg-barber-burgundy/90 transition-colors mt-2 flex items-center justify-center">
              <Calendar className="mr-2 h-4 w-4" /> Agendar Agora
            </Link>
            <Link to="/login" className="text-center bg-barber-navy text-white py-3 rounded-md hover:bg-barber-navy/90 transition-colors flex items-center justify-center">
              <User className="mr-2 h-4 w-4" /> Área do Cliente
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
