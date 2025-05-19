import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Home, Package, CalendarCheck, BarChart3, Scissors } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import DashboardShowcase from "@/components/DashboardShowcase";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      <Header />

      <main className="flex-grow">
        {/* Video Banner Fullscreen */}
        <section className="relative w-full h-screen overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              className="w-full h-full object-cover"
              src="https://ik.imagekit.io/ktkbit0g9/7697040-hd_1920_1080_30fps.mp4?updatedAt=1747675567312"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>

          <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center text-white bg-black/50 px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 animate-fadeInText max-w-4xl mx-auto px-4">
              Bem-vindo à {" "}
              <Link to="/" className="text-barber-gold hover:underline transition">
                Cortify
              </Link>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-6 text-gray-200 font-light animate-fadeInText">
              Tecnologia com estilo e precisão para elevar sua barbearia a um novo patamar de excelência.
            </p>
            <div
              onClick={() =>
                document.getElementById("recursos")?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-8 cursor-pointer flex flex-col items-center group"
            >
              <Scissors className="w-12 h-10 text-barber-gold animate-bounce group-hover:scale-110 transition-transform duration-300" />
              <span className="mt-2 text-barber-gold font-medium group-hover:underline transition-all text-base">
                Ver serviços
              </span>
            </div>
          </div>
          <style>{`
            @keyframes fadeInText {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fadeInText {
              animation: fadeInText 1.5s ease-out forwards;
            }
          `}</style>
        </section>

       {/* Sobre Section */}
<section id="sobre" className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-serif font-bold text-center mb-6">Sobre o Cortify</h2>
    <p className="text-gray-700 text-center max-w-3xl mx-auto mb-4">
      O Cortify é um sistema online completo para barbearias, que organiza agendamentos, otimiza processos e melhora o atendimento.
    </p>
    <p className="text-gray-600 text-center max-w-3xl mx-auto">
      Com módulos específicos para gestão e uso em aplicativo, o sistema permite controlar profissionais, agenda, estoque, comissões e fidelização de clientes de forma personalizada — com a identidade visual da sua barbearia.
    </p>
  </div>
</section>

{/* Objetivos Section */}
<section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-serif font-bold text-center mb-10">Nosso Objetivo</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="border border-blue-500 rounded-lg p-6 text-center hover:shadow-lg transition">
        <div className="text-blue-700 mb-4 text-4xl">📅</div>
        <h3 className="font-semibold text-lg mb-2">Otimizar seu Tempo</h3>
        <p className="text-gray-600 text-sm">
          Organize sua agenda e estimule mais agendamentos através do aplicativo.
        </p>
      </div>

      {/* Card 2 */}
      <div className="border border-blue-500 rounded-lg p-6 text-center hover:shadow-lg transition">
        <div className="text-blue-700 mb-4 text-4xl">😊</div>
        <h3 className="font-semibold text-lg mb-2">Fidelizar seu Cliente</h3>
        <p className="text-gray-600 text-sm">
          Fidelize através do Agendamento On-line, Programa de Fidelidade, Envio de Promoções e Mensagens de Retorno automáticas.
        </p>
      </div>

      {/* Card 3 */}
      <div className="border border-blue-500 rounded-lg p-6 text-center hover:shadow-lg transition">
        <div className="text-blue-700 mb-4 text-4xl">📈</div>
        <h3 className="font-semibold text-lg mb-2">Aumentar seu Faturamento</h3>
        <p className="text-gray-600 text-sm">
          Aumente seu movimento em até 40% e tenha um maior faturamento em sua barbearia.
        </p>
      </div>
    </div>
  </div>
</section>


        {/* Hero Section */}
        <section className="bg-barber-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl lg:text-6xl font-serif mb-4 font-bold md:text-5xl animate-fadeInText text-barber-gold">
                  Potência e Controle para Sua Barbearia
                </h1>
                <p className="mb-8 text-gray-300 text-base font-normal animate-fadeInText">
                  Automatize o que toma tempo e dedique-se ao que traz valor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recursos */}
        <section id="recursos" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center mb-12 animate-fadeInText">
              <p>Por que escolher a Cortify</p>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Home size={28} className="text-barber-gold" />,
                  title: "Gestão de filiais",
                  desc: "Gerencie múltiplas unidades da sua barbearia em um só lugar.",
                },
                {
                  icon: <CalendarCheck size={28} className="text-barber-gold" />,
                  title: "Agendamento Fácil",
                  desc: "Experiência prática com agendamento online rápido e eficiente.",
                },
                {
                  icon: <BarChart3 size={28} className="text-barber-gold" />,
                  title: "Dashboard",
                  desc: "Acompanhe os principais indicadores do seu negócio em tempo real.",
                },
                {
                  icon: <Package size={28} className="text-barber-gold" />,
                  title: "Controle de estoque",
                  desc: "Monitore seus produtos e insumos com precisão.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl shadow-md text-center transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  <div className="w-16 h-16 bg-barber-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
  <div className="container mx-auto px-4 text-center mb-8">
    <h2 className="text-3xl font-serif font-bold text-barber-900">Veja o sistema em ação</h2>
    <p className="text-gray-600 mt-2">Interface clara, moderna e feita pra sua barbearia</p>
  </div>
  <DashboardShowcase />
</section>

        {/* Planos */}
        <section id="servicos" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fadeInText">
              <h2 className="text-3xl font-serif font-bold mb-4">Nossos Planos</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
              💈 Tem uma barbearia? Teste agora sem compromisso e veja como o CORTIFY pode facilitar sua rotina e turbinar seus resultados!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { prof: "1 Profissional", preco: "69,90" },
                { prof: "2 a 5 Profissionais", preco: "99,90" },
                { prof: "6 a 15 Profissionais", preco: "154,50" },
                { prof: "+15 Profissionais", preco: "209,90" },
              ].map((plano, i) => (
                <div
                  key={i}
                  className="relative bg-white rounded-lg shadow-md p-6 text-center animate-fadeInText border-t-4 border-barber-gold"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{plano.prof}</h3>
                  <div className="text-3xl font-bold text-barber-gold mb-1">
                    R$ {plano.preco}
                    <span className="text-base font-medium">/mês</span>
                  </div>
                  <div className="mt-6">
                    <Button
                      onClick={() => navigate("/solicitar-acesso")}
                      className="w-full bg-barber-900 text-white hover:bg-barber-800 text-sm"
                    >
                      Teste Grátis 7 dias
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / Contato */}
        <section id="contato" className="py-16 bg-barber-900 text-white">
          <div className="container mx-auto px-4 text-center animate-fadeInText">
            <h2 className="text-3xl font-serif font-bold mb-4">
              <p>Pronto para o Novo ?</p>
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Deixe a gestão com a nossa tecnologia, e o visual com o seu estilo.
            </p>
            <a
              href="https://wa.me/556284041559?text=Ol%C3%A1!%20Estou%20interessado%20no%20sistema%20para%20barbearia%20da%20Cortify%20e%20gostaria%20de%20saber%20mais."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-barber-gold text-barber-900 hover:bg-barber-gold/90 px-8 py-6 rounded-md font-medium text-lg">
                <FaWhatsapp className="w-5 h-5 mr-2" /> Fale conosco
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
