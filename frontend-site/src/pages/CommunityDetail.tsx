import { ArrowLeft, Clock, MapPin, Music } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { communitiesData } from "../data/communities";

export const CommunityDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Encontra a comunidade baseada no ID da URL
  const community = communitiesData.find((c) => c.id === id);

  // Se o usuário digitar um ID inválido na URL, joga de volta pra lista
  if (!community) {
    return <Navigate to="/comunidades" replace />;
  }

  return (
    <section className="py-12 animate-zoom-in">
      <Link
        to="/comunidades"
        className="inline-flex items-center gap-2 text-paroquia-gold hover:text-white mb-6 transition-colors font-semibold"
      >
        <ArrowLeft size={20} />
        Voltar para Comunidades
      </Link>

      <div className="card overflow-hidden !p-0 border border-white/10">
        {/* Banner/Hero */}
        <div className="h-[600px] w-full relative bg-black">
          <img
            src={community.image}
            alt={community.name}
            className="w-full h-full object-cover object-top opacity-60"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/img/logo/logo.png";
              (e.target as HTMLImageElement).className =
                "w-full h-full object-contain object-center p-8 opacity-30";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-paroquia-card via-paroquia-card/50 to-transparent" />

          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h1 className="text-3xl md:text-5xl font-cinzel text-paroquia-gold drop-shadow-lg mb-2">
              {community.name}
            </h1>
          </div>
        </div>

        {/* Conteúdo Detalhado */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-xl font-cinzel text-white mb-3">
                Sobre a Comunidade
              </h2>
              <p className="text-gray-300 leading-relaxed text-justify">
                {community.description}
              </p>
            </div>

            {/* Player de Áudio do Hino */}
            {community.audio && (
              <div className="bg-black/40 p-5 rounded-xl border border-white/10 mt-6">
                <p className="flex items-center gap-2 text-sm font-bold text-paroquia-gold uppercase tracking-wider mb-3">
                  <Music size={18} /> Hino da Padroeira
                </p>
                <audio
                  controls
                  className="w-full rounded-md [&::-webkit-media-controls-panel]:bg-gray-200"
                >
                  <source src={community.audio} type="audio/mpeg" />
                  Seu navegador não suporta o áudio.
                </audio>
              </div>
            )}
          </div>

          {/* Sidebar com Infos Práticas */}
          <div className="w-full md:w-80 space-y-4">
            <div className="bg-paroquia-dark/30 p-5 rounded-xl border border-paroquia-primary/50">
              <h3 className="flex items-center gap-2 text-paroquia-gold font-bold mb-4 font-cinzel">
                <Clock size={20} /> Horários de Missa
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {community.times.split(" | ").map((time, i) => (
                  <span key={i} className="block mb-2">
                    • {time}
                  </span>
                ))}
              </p>
            </div>

            <div className="bg-paroquia-dark/30 p-5 rounded-xl border border-paroquia-primary/50">
              <h3 className="flex items-center gap-2 text-paroquia-gold font-bold mb-4 font-cinzel">
                <MapPin size={20} /> Localização
              </h3>
              <p className="text-gray-300 text-sm">{community.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
