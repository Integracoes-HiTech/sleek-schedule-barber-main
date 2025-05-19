import { motion } from "framer-motion";

export default function DashboardShowcase() {
  return (
    <div className="relative w-full max-w-6xl mx-auto mt-16 px-4">
      {/* Imagem principal com hover e sombra */}
      <div className="overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group">
        <img
          src="https://ik.imagekit.io/ktkbit0g9/mockup-featuring-two-iphones-x-floating-against-a-solid-color-background-28764%20(1).png?updatedAt=1747675641013"
          alt="Dashboard principal"
          className="w-full h-auto rounded-2xl group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  );
}
