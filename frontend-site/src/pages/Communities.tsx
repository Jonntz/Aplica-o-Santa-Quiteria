import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { communitiesData } from "../data/communities";

export const Communities = () => {
  return (
    <section className="py-12 animate-zoom-in">
      <h2 className="text-3xl md:text-4xl font-cinzel text-paroquia-gold text-center mb-10">
        Nossas Comunidades
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {communitiesData.map((com) => (
          <Link
            to={`/comunidades/${com.id}`}
            key={com.id}
            className="bg-paroquia-card rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.6)] border border-white/5 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] group cursor-pointer block"
          >
            {/* Imagem */}
            <div className="h-48 overflow-hidden relative bg-black">
              <img
                src={com.image}
                alt={com.name}
                className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/img/logo/logo.png";
                  (e.target as HTMLImageElement).className =
                    "w-full h-full object-contain p-4 opacity-50";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-paroquia-card to-transparent" />
            </div>

            {/* Informações */}
            <div className="p-6 flex-1 flex flex-col gap-4 -mt-10 relative z-10">
              <h3 className="text-2xl font-cinzel text-paroquia-gold drop-shadow-md">
                {com.name}
              </h3>

              <div className="space-y-3 text-sm text-gray-300 flex-1">
                <p className="flex items-start gap-2">
                  <MapPin size={18} className="text-white shrink-0 mt-0.5" />
                  <span>{com.address}</span>
                </p>
                <p className="flex items-start gap-2">
                  <Clock size={18} className="text-white shrink-0 mt-0.5" />
                  <span>{com.times}</span>
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-paroquia-gold font-semibold text-sm uppercase tracking-wider group-hover:text-white transition-colors">
                Ver detalhes e horários
                <ArrowRight
                  size={18}
                  className="transform transition-transform group-hover:translate-x-2"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
