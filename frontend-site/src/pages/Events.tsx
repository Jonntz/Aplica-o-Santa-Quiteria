import { CalendarDays, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../services/api";

// Tipagem baseada no que o backend retorna
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string | null;
  category: string | null;
}

export const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Busca apenas eventos publicados (o backend já força isso para rotas públicas, mas é bom ser explícito)
        const response = await api.get("/events?published=true&limit=20");
        setEvents(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os eventos no momento.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="py-12 animate-zoom-in">
      <h2 className="text-3xl md:text-4xl font-cinzel text-paroquia-gold text-center mb-10">
        Eventos e Avisos
      </h2>

      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-paroquia-gold"></div>
        </div>
      )}

      {error && (
        <p className="text-center text-red-400 bg-red-950/50 p-4 rounded-lg border border-red-900">
          {error}
        </p>
      )}

      {!isLoading && !error && events.length === 0 && (
        <p className="text-center text-gray-300 bg-black/50 p-8 rounded-lg">
          Nenhum evento ou aviso publicado no momento.
        </p>
      )}

      {/* Grid de Eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-paroquia-card rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.6)] flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] border border-white/5"
          >
            {/* Imagem do Evento (se existir) */}
            {event.imageUrl ? (
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover border-b border-paroquia-gold/20"
              />
            ) : (
              <div className="w-full h-32 bg-gradient-to-tr from-paroquia-dark to-paroquia-primary flex items-center justify-center border-b border-paroquia-gold/20">
                <CalendarDays size={40} className="text-paroquia-gold/50" />
              </div>
            )}

            {/* Conteúdo do Card */}
            <div className="p-6 flex flex-col flex-1">
              {/* Categoria */}
              {event.category && (
                <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-paroquia-gold mb-3">
                  <Tag size={12} />
                  {event.category}
                </div>
              )}

              {/* Título */}
              <h3 className="text-xl font-cinzel text-white mb-3 leading-snug">
                {event.title}
              </h3>

              {/* Data formatada */}
              <div className="flex items-center gap-2 text-sm text-gray-300 mb-4 bg-white/5 w-fit px-3 py-1.5 rounded-md">
                <CalendarDays size={16} className="text-paroquia-gold" />
                {new Date(event.date).toLocaleDateString("pt-BR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              {/* Descrição */}
              <p className="text-gray-400 text-sm leading-relaxed flex-1 whitespace-pre-line">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
