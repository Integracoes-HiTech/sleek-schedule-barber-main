import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-barber-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo + descrição */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl font-bold mb-3 text-barber-gold">Cortify</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Tecnologia com estilo e precisão para elevar sua barbearia a um novo patamar de excelência.
            </p>
          </div>

          {/* Espaços reservados pra futuras seções */}
          <div className="hidden md:block" />
          <div className="hidden md:block" />

          {/* Contato */}
          <div>
            <h4 className="font-serif text-lg mb-4 text-barber-gold">Contato</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Telefone: <a href="https://wa.me/556284041559" target="_blank" rel="noopener noreferrer" className="hover:underline">+55 62 8404-1559</a></li>
              <li>Email: <a href="mailto:contato@hitechdesenvolvimento.com.br" className="hover:underline">contato@hitechdesenvolvimento.com.br</a></li>
              <li>
                Endereço: <br />
                Rua Exemplo, 123<br />
                Goiânia - GO
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-barber-800 mt-10 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Cortify. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
