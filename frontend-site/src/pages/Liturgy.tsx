/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookOpen, Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../services/api";

export const Liturgy = () => {
  // Inicializa com a data de hoje no formato YYYY-MM-DD para o input[type="date"]
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const [liturgy, setLiturgy] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLiturgy = async () => {
      setIsLoading(true);
      setError("");
      try {
        // Quebra a data YYYY-MM-DD para o formato da nossa API (DD, MM, YYYY)
        const [ano, mes, dia] = selectedDate.split("-");
        const response = await api.get(
          `/liturgy?dia=${dia}&mes=${mes}&ano=${ano}`,
        );
        setLiturgy(response.data);
      } catch (err) {
        console.error(err);
        setError(
          "Não foi possível carregar a liturgia desta data. Tente novamente mais tarde.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedDate) fetchLiturgy();
  }, [selectedDate]);

  // Função para mapear a cor litúrgica para classes do Tailwind
  const getLiturgicalColorTheme = (colorName: string = "") => {
    const color = colorName.toLowerCase();
    if (color.includes("roxo"))
      return "bg-purple-900 border-purple-500 text-white";
    if (color.includes("verde"))
      return "bg-green-800 border-green-500 text-white";
    if (color.includes("vermelho"))
      return "bg-red-800 border-red-500 text-white";
    if (color.includes("branco"))
      return "bg-gray-100 border-gray-300 text-gray-900";
    if (color.includes("rosa"))
      return "bg-pink-200 border-pink-400 text-pink-900";
    return "bg-paroquia-gold border-yellow-600 text-black"; // Fallback
  };

  return (
    <section className="py-12 animate-zoom-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <h2 className="text-3xl md:text-4xl font-cinzel text-paroquia-gold text-center md:text-left m-0">
          Liturgia Diária
        </h2>

        {/* Filtro por Data */}
        <div className="flex items-center gap-3 bg-black/60 p-2 rounded-lg border border-white/10">
          <CalendarIcon className="text-paroquia-gold" size={24} />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent text-white outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:filter-[invert(1)]"
          />
        </div>
      </div>

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

      {!isLoading && !error && liturgy && (
        <div className="space-y-8">
          {/* Cabeçalho da Liturgia */}
          <div
            className={`card text-center border-t-4 ${getLiturgicalColorTheme(liturgy.cor).split(" ")[1]}`}
          >
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4 ${getLiturgicalColorTheme(liturgy.cor)}`}
            >
              Cor Litúrgica: {liturgy.cor || "Não informada"}
            </span>
            <h3 className="text-2xl font-cinzel text-white mb-2">
              {liturgy.liturgia || liturgy.data}
            </h3>
          </div>

          {/* Primeira Leitura */}
          {liturgy.primeiraLeitura && (
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-paroquia-gold" />
                <h4 className="text-xl font-cinzel text-paroquia-gold">
                  Primeira Leitura
                </h4>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                {liturgy.primeiraLeitura.referencia}
              </p>
              <p className="text-lg text-white mb-4 font-semibold">
                {liturgy.primeiraLeitura.titulo}
              </p>
              <div className="text-gray-300 leading-relaxed text-justify whitespace-pre-line">
                {liturgy.primeiraLeitura.texto}
              </div>
            </div>
          )}

          {/* Salmo Responsorial */}
          {liturgy.salmo && (
            <div className="card bg-black/40 border border-white/5">
              <h4 className="text-xl font-cinzel text-paroquia-gold mb-2">
                Salmo Responsorial
              </h4>
              <p className="text-sm text-gray-400 mb-4">
                {liturgy.salmo.referencia}
              </p>
              <p className="text-lg text-white mb-4 italic text-center font-semibold bg-white/5 p-4 rounded-lg">
                — {liturgy.salmo.refrao}
              </p>
              <div className="text-gray-300 leading-relaxed text-center whitespace-pre-line">
                {liturgy.salmo.texto}
              </div>
            </div>
          )}

          {/* Segunda Leitura (Nem todos os dias têm) */}
          {liturgy.segundaLeitura && liturgy.segundaLeitura.texto && (
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-paroquia-gold" />
                <h4 className="text-xl font-cinzel text-paroquia-gold">
                  Segunda Leitura
                </h4>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                {liturgy.segundaLeitura.referencia}
              </p>
              <p className="text-lg text-white mb-4 font-semibold">
                {liturgy.segundaLeitura.titulo}
              </p>
              <div className="text-gray-300 leading-relaxed text-justify whitespace-pre-line">
                {liturgy.segundaLeitura.texto}
              </div>
            </div>
          )}

          {/* Evangelho */}
          {liturgy.evangelho && (
            <div className="card border border-paroquia-gold/30">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-paroquia-gold" />
                <h4 className="text-xl font-cinzel text-paroquia-gold">
                  Evangelho
                </h4>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                {liturgy.evangelho.referencia}
              </p>
              <p className="text-lg text-white mb-4 font-semibold">
                {liturgy.evangelho.titulo}
              </p>
              <div className="text-gray-300 leading-relaxed text-justify whitespace-pre-line">
                {liturgy.evangelho.texto}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
