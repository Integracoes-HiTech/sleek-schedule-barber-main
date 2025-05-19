import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Instagram } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const scrollToTopSmooth = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTopSmooth);
      window.scrollTo(0, c - c / 8);
    }
  };

  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            0% {
              opacity: 0;
              transform: translateX(-80px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-slideIn {
            animation: slideIn 0.6s ease-out forwards;
          }
        `}
      </style>

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 py-4 px-4 md:px-6 ${
          scrolled ? "bg-barber-900" : "bg-barber-0"
        } text-white`}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <span
              onClick={() => {
                if (window.location.pathname === "/") {
                  scrollToTopSmooth();
                } else {
                  navigate("/");
                }
              }}
              className="cursor-pointer text-barber-gold font-serif font-bold text-4xl animate-slideIn"
            >
              Cortify
            </span>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollTo("sobre")}
              className="text-sm hover:text-barber-gold transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollTo("servicos")}
              className="text-sm hover:text-barber-gold transition-colors"
            >
              Planos
            </button>
            <button
              onClick={() => scrollTo("contato")}
              className="text-sm hover:text-barber-gold transition-colors"
            >
              Contato
            </button>
            <button
              onClick={() => navigate("/solicitar-acesso")}
              className="text-sm hover:text-barber-gold transition-colors"
            >
              Teste Grátis
            </button>
            <button
              onClick={() => navigate("/blog")}
              className="text-sm hover:text-barber-gold transition-colors"
            >
              Blog
            </button>
            <a
              href="https://www.instagram.com/hi.tech.oficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-barber-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>

          {/* Botão menu mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-barber-gold"
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-barber-800">
            <div className="flex flex-col space-y-3 px-4">
              <button
                onClick={() => scrollTo("sobre")}
                className="hover:text-barber-gold text-left"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollTo("servicos")}
                className="hover:text-barber-gold text-left"
              >
                Planos
              </button>
              <button
                onClick={() => scrollTo("contato")}
                className="hover:text-barber-gold text-left"
              >
                Contato
              </button>
              <button
                onClick={() => {
                  navigate("/solicitar-acesso");
                  setMobileMenuOpen(false);
                }}
                className="hover:text-barber-gold text-left"
              >
                Teste Grátis
              </button>
              <button
                onClick={() => {
                  navigate("/blog");
                  setMobileMenuOpen(false);
                }}
                className="hover:text-barber-gold text-left"
              >
                Blog
              </button>
              <a
                href="https://www.instagram.com/hi.tech.oficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-barber-gold text-left flex items-center gap-2"
              >
                <Instagram size={18} />
                Instagram
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
