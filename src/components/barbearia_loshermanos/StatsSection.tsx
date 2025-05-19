
import { Users, Calendar, ScissorsIcon, TrendingUp } from 'lucide-react';

const stats = [
  {
    id: 1,
    title: "Clientes Satisfeitos",
    value: "5,000+",
    icon: <Users className="h-6 w-6" />,
  },
  {
    id: 2,
    title: "Agendamentos Mensais",
    value: "1,200+",
    icon: <Calendar className="h-6 w-6" />,
  },
  {
    id: 3,
    title: "Cortes Realizados",
    value: "15,000+",
    icon: <ScissorsIcon className="h-6 w-6" />,
  },
  {
    id: 4,
    title: "Anos de Experiência",
    value: "12+",
    icon: <TrendingUp className="h-6 w-6" />,
  }
];

const StatsSection = () => {
  return (
    <section className="py-14 bg-barber-burgundy text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.id} className="flex items-center justify-center md:justify-start text-center md:text-left">
              <div className="bg-white/10 p-3 rounded-full mr-4">
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl font-bold font-playfair">{stat.value}</div>
                <div className="text-white/80">{stat.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
