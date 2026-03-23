import {
    AlertCircle,
    Clock,
    Droplets,
    FileText,
    HeartHandshake,
} from "lucide-react";
import { useState } from "react";

export const Sacraments = () => {
  const [activeTab, setActiveTab] = useState<"batismo" | "casamento">(
    "batismo",
  );

  return (
    <section className="py-12 animate-zoom-in">
      <h2 className="text-3xl md:text-4xl font-cinzel text-paroquia-gold text-center mb-10">
        Sacramentos
      </h2>

      {/* Navegação por Abas */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("batismo")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${
            activeTab === "batismo"
              ? "bg-paroquia-gold text-black shadow-[0_0_15px_#d4af37] scale-105"
              : "bg-black/50 text-paroquia-gold hover:bg-black/70 border border-paroquia-gold/30"
          }`}
        >
          <Droplets size={20} />
          Batismo
        </button>
        <button
          onClick={() => setActiveTab("casamento")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${
            activeTab === "casamento"
              ? "bg-paroquia-gold text-black shadow-[0_0_15px_#d4af37] scale-105"
              : "bg-black/50 text-paroquia-gold hover:bg-black/70 border border-paroquia-gold/30"
          }`}
        >
          <HeartHandshake size={20} />
          Matrimônio
        </button>
      </div>

      {/* Conteúdo: BATISMO */}
      {activeTab === "batismo" && (
        <div className="card space-y-6 animate-[menuFade_0.4s_ease_forwards]">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src="/img/sacramentos/batismo.png"
              alt="Batismo"
              className="w-full md:w-1/3 rounded-xl border-2 border-paroquia-gold shadow-lg object-cover"
            />
            <div className="flex-1 space-y-4 text-gray-300 text-justify leading-relaxed">
              <h3 className="text-2xl font-cinzel text-white mb-2">
                O Sacramento do Batismo
              </h3>
              <p>
                O Batismo é o fundamento de toda a vida cristã, a porta da vida
                no Espírito e a porta que dá acesso aos demais sacramentos. Pelo
                Batismo somos libertados do pecado e regenerados como filhos de
                Deus, tornamo-nos membros de Cristo.
              </p>

              <div className="bg-black/40 p-4 rounded-lg border border-white/10 mt-6">
                <h4 className="flex items-center gap-2 text-paroquia-gold font-bold mb-3">
                  <FileText size={18} /> Documentos Necessários
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Cópia da Certidão de Nascimento da criança</li>
                  <li>Cópia do RG dos Pais e Padrinhos</li>
                  <li>Comprovante de residência dos pais</li>
                  <li>
                    Certificado do curso de preparação para Pais e Padrinhos
                  </li>
                </ul>
              </div>

              <div className="bg-paroquia-dark/30 p-4 rounded-lg border border-paroquia-primary mt-4 text-sm">
                <h4 className="flex items-center gap-2 text-white font-bold mb-2">
                  <AlertCircle size={18} className="text-paroquia-gold" />{" "}
                  Observações
                </h4>
                <p>
                  As inscrições devem ser feitas presencialmente na secretaria
                  paroquial com pelo menos 15 dias de antecedência. Os padrinhos
                  devem ser católicos maiores de 16 anos.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo: CASAMENTO */}
      {activeTab === "casamento" && (
        <div className="card space-y-6 animate-[menuFade_0.4s_ease_forwards]">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src="/img/sacramentos/casamento.png"
              alt="Matrimônio"
              className="w-full md:w-1/3 rounded-xl border-2 border-paroquia-gold shadow-lg object-cover"
            />
            <div className="flex-1 space-y-4 text-gray-300 text-justify leading-relaxed">
              <h3 className="text-2xl font-cinzel text-white mb-2">
                O Sacramento do Matrimônio
              </h3>
              <p>
                A aliança matrimonial, pela qual o homem e a mulher constituem
                entre si uma comunhão da vida toda, é ordenada por sua índole
                natural ao bem dos cônjuges e à geração e educação da prole.
              </p>

              <div className="bg-black/40 p-4 rounded-lg border border-white/10 mt-6">
                <h4 className="flex items-center gap-2 text-paroquia-gold font-bold mb-3">
                  <Clock size={18} /> Processo e Prazos
                </h4>
                <p className="text-sm mb-3">
                  O processo matrimonial deve ser iniciado com{" "}
                  <strong>no mínimo 3 meses de antecedência</strong> da data
                  prevista.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Agendar entrevista com o Pároco</li>
                  <li>
                    Apresentar a 2ª via da Certidão de Batismo (atualizada)
                  </li>
                  <li>Certificado do Encontro de Noivos</li>
                  <li>Cópia do RG, CPF e Comprovante de Residência</li>
                </ul>
              </div>

              <div className="bg-paroquia-dark/30 p-4 rounded-lg border border-paroquia-primary mt-4 text-sm">
                <p className="flex items-center gap-2">
                  Para informações sobre datas disponíveis, taxas e decoração,
                  por favor, entre em contato diretamente com a nossa secretaria
                  paroquial.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
