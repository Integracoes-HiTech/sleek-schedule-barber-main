import React from "react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    title: "Como o AppBarber Pode Revolucionar a Experiência do Cliente em Barbearias",
    excerpt:
      "Na corrida competitiva das barbearias modernas, a diferenciação é essencial. Descubra como o AppBarber está ajudando barbearias a criarem experiências únicas...",
    image: "/blog/blog1.jpg",
    link: "/blog/experiencia-cliente"
  },
  {
    title: "Revolucionando o Agendamento em Barbearias: As Vantagens do Agendamento Online com o AppBarber",
    excerpt:
      "Agendar um horário na barbearia nunca foi tão fácil e conveniente. Conheça as vantagens do sistema de agendamento digital do AppBarber...",
    image: "/blog/blog2.jpg",
    link: "/blog/agendamento-online"
  },
  {
    title: "Como o Clube de Assinaturas Pode Revolucionar Sua Barbearia: Dicas para Aumentar a Receita Recorrente",
    excerpt:
      "Se você está procurando um modelo de receita estável, o clube de assinaturas pode ser a solução ideal para sua barbearia...",
    image: "/blog/blog3.jpg",
    link: "/blog/clube-assinaturas"
  },
  {
    title: "Desbravando o Mundo do Marketing para Barbearias: Estratégias Infalíveis",
    excerpt:
      "Explore ações práticas de marketing que estão transformando a forma como barbearias atraem e fidelizam seus clientes...",
    image: "/blog/blog4.jpg",
    link: "/blog/marketing-barbearias"
  },
  {
    title: "Iniciando 2024 com Planejamento e Foco na Gestão Eficiente de Barbearias: Como o AppBarber Pode Facilitar sua Jornada",
    excerpt:
      "Transforme sua gestão com foco, planejamento e as ferramentas certas. Veja como começar o ano com o pé direito...",
    image: "/blog/blog5.jpg",
    link: "/blog/gestao-eficiente"
  },
  {
    title: "Fidelidade à Barba: Como um Plano de Fidelidade Pode Transformar a Experiência na Barbearia",
    excerpt:
      "Descubra como um programa de fidelidade bem estruturado pode ser o diferencial na retenção de clientes em sua barbearia...",
    image: "/blog/blog6.jpg",
    link: "/blog/fidelidade-clientes"
  }
];

export default function BlogPage() {
  return (
    <div className="py-16 px-4 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-center mb-12 text-barber-900">
          Blog da Cortify
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link
              to={post.link}
              key={index}
              className="border rounded-lg overflow-hidden hover:shadow-xl transition group"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-barber-900 group-hover:text-barber-gold">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
