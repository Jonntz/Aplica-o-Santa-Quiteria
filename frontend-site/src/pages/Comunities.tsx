import { Clock, MapPin, Music } from "lucide-react";

// Dados baseados nos arquivos HTML e áudios que você enviou
const communities = [
  {
    id: "matriz",
    name: "Matriz Santa Quitéria",
    address: "Estrada do Lageado, 1206",
    times: "Domingo às 07h e 18h | Quinta às 20h",
    image: "/img/logo/logo.png", // Fallback
    audio: null,
  },
  {
    id: "aparecida",
    name: "Nossa Senhora Aparecida",
    address: "Rua da Padroeira, S/N",
    times: "Sábado às 18h | Domingo às 08h30",
    image: "/img/comunidades/aparecida/aparecida.png",
    audio: "/music/Hino.aparecida.mp3",
  },
  {
    id: "fatima",
    name: "Nossa Senhora de Fátima",
    address: "Rua dos Pastorinhos, 13",
    times: "Sábado às 19h30",
    image: "/img/comunidades/fatima/fatima 2.0.jpeg",
    audio: "/music/treze-maio.mp3",
  },
  {
    id: "lourdes",
    name: "Nossa Senhora de Lourdes",
    address: "Av. da Gruta, 11",
    times: "Domingo às 10h",
    image: "/img/comunidades/lourdes/ns.lourdes.png.jpeg",
    audio: "/music/lourdes.mp3",
  },
  {
    id: "santa-eulalia",
    name: "Santa Eulália",
    address: "Rua dos Mártires, 25",
    times: "Sábado às 17h",
    image: "/img/comunidades/santa-eulalia/eulalia.png",
    audio: "/music/santaeulalia.mp3",
  },
  {
    id: "santa-luzia",
    name: "Santa Luzia",
    address: "Rua da Visão, 13",
    times: "Domingo às 08h",
    image: "/img/comunidades/santa-luzia/santa.luzia.png",
    audio: "/music/ytmp3free.cc_hino-de-santa-luzia-youtubemp3free.org.mp3",
  },
  {
    id: "santa-rita",
    name: "Santa Rita",
    address: "Rua das Rosas, 22",
    times: "Domingo às 19h30",
    image: "/img/comunidades/santa-rita/santarita.png",
    audio: null, // Adicione o caminho se tiver o áudio
  },
];

export const Communities = () => {
  return (
    <section className="py-12 animate-zoom-in">
      <h2 className="text-3xl md:text-4xl font-cinzel text-paroquia-gold text-center mb-10">
        Nossas Comunidades
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {communities.map((com) => (
          <div
            key={com.id}
            className="bg-paroquia-card rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.6)] border border-white/5 flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            {/* Imagem */}
            <div className="h-48 overflow-hidden relative bg-black">
              <img
                src={com.image}
                alt={com.name}
                className="w-full h-full object-cover opacity-80"
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

              {/* Player de Áudio do Hino */}
              {com.audio && (
                <div className="mt-4 bg-black/50 p-3 rounded-lg border border-white/10">
                  <p className="flex items-center gap-2 text-xs font-bold text-paroquia-gold uppercase tracking-wider mb-2">
                    <Music size={14} /> Hino da Padroeira
                  </p>
                  <audio
                    controls
                    className="w-full h-8 [&::-webkit-media-controls-panel]:bg-gray-200"
                    preload="none"
                  >
                    <source src={com.audio} type="audio/mpeg" />
                    Seu navegador não suporta o áudio.
                  </audio>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
