
export interface ServiceData {
  name: string;
  description: string;
  duration: number;
  price: number;
}

export const ServiceData: ServiceData[] = [
  {
    name: "Corte de Cabelo",
    description: "Corte moderno ou clássico de acordo com sua preferência.",
    duration: 30,
    price: 50
  },
  {
    name: "Barba",
    description: "Modelagem e aparamento de barba com toalha quente.",
    duration: 30,
    price: 35
  },
  {
    name: "Combo Completo",
    description: "Corte de cabelo e barba com tratamentos especiais.",
    duration: 60,
    price: 75
  },
  {
    name: "Sobrancelha",
    description: "Design e acabamento perfeito para suas sobrancelhas.",
    duration: 15,
    price: 20
  },
];
