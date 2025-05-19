
import { CheckCircle2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  {
    id: 1,
    name: "Plano Básico",
    price: "R$ 99",
    period: "por mês",
    description: "Ideal para quem deseja manter o visual sempre em dia",
    features: [
      { text: "1 Corte de cabelo por mês", included: true },
      { text: "10% de desconto em produtos", included: true },
      { text: "Agendamento prioritário", included: true },
      { text: "Barba inclusa", included: false },
      { text: "Tratamentos capilares", included: false },
    ],
    popular: false,
    buttonText: "Assinar Plano",
    buttonVariant: "outline" as const,
  },
  {
    id: 2,
    name: "Plano Premium",
    price: "R$ 159",
    period: "por mês",
    description: "Nossa opção mais popular para um cuidado completo",
    features: [
      { text: "2 Cortes de cabelo por mês", included: true },
      { text: "1 Barba completa por mês", included: true },
      { text: "15% de desconto em produtos", included: true },
      { text: "Agendamento prioritário", included: true },
      { text: "1 Tratamento capilar por trimestre", included: true },
    ],
    popular: true,
    buttonText: "Escolher Premium",
    buttonVariant: "default" as const,
  },
  {
    id: 3,
    name: "Plano Gold",
    price: "R$ 249",
    period: "por mês",
    description: "Experiência exclusiva com todos os serviços inclusos",
    features: [
      { text: "Cortes ilimitados", included: true },
      { text: "2 Barbas completas por mês", included: true },
      { text: "25% de desconto em produtos", included: true },
      { text: "Agendamento VIP", included: true },
      { text: "Tratamentos capilares mensais", included: true },
    ],
    popular: false,
    buttonText: "Escolher Gold",
    buttonVariant: "outline" as const,
  }
];

const SubscriptionSection = () => {
  return (
    <section className="py-16 bg-barber-navy text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-playfair">
            Planos de <span className="text-barber-gold">Assinatura</span>
          </h2>
          <div className="flex justify-center items-center mb-4">
            <div className="w-12 h-1 bg-barber-gold rounded-full"></div>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Economize tempo e dinheiro com nossos planos de assinatura exclusivos. Escolha o plano ideal para o seu estilo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`bg-white text-barber-navy border-2 ${
                plan.popular ? 'border-barber-gold' : 'border-transparent'
              } relative flex flex-col h-full`}
            >
              {plan.popular && (
                <div className="absolute -top-4 right-0 left-0 mx-auto w-36 bg-barber-gold text-white text-sm font-medium py-1 px-2 rounded-full text-center">
                  Mais Popular
                </div>
              )}
              <CardHeader className={`text-center pb-3 ${plan.popular ? 'pt-6' : ''}`}>
                <CardTitle className="text-2xl font-playfair">{plan.name}</CardTitle>
                <div className="flex justify-center items-end space-x-1 pt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-gray-500 pb-1">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-center mb-6 text-gray-600">{plan.description}</CardDescription>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mr-3 shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/subscription" className="w-full">
                  <Button 
                    variant={plan.buttonVariant}
                    className={`w-full ${
                      plan.buttonVariant === 'default' 
                        ? 'bg-barber-burgundy hover:bg-barber-burgundy/90 text-white' 
                        : 'border-barber-burgundy text-barber-burgundy hover:bg-barber-burgundy hover:text-white'
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
