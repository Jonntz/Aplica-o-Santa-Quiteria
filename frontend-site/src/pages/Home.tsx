import { useState } from "react";

export const Home = () => {
  const [showIntro, setShowIntro] = useState(true);

  // Remove a div de intro do DOM após a animação terminar (4.5s total)
  // para não atrapalhar cliques na página
  if (showIntro) {
    setTimeout(() => setShowIntro(false), 4500);
  }

  const handleCopyPix = () => {
    // Substitua pela chave PIX real da paróquia
    navigator.clipboard.writeText("paroquiasantaquiteria@email.com");
    alert("Chave PIX copiada para a área de transferência!");
  };

  return (
    <>
      {/* INTRO ANIMADA */}
      {showIntro && (
        <div className="fixed inset-0 bg-gradient-to-b from-paroquia-primary to-paroquia-dark flex justify-center items-center z-[9999] animate-fade-out pointer-events-none">
          <h1 className="text-4xl md:text-5xl text-paroquia-gold font-cinzel animate-zoom-in text-center px-4">
            Paróquia Santa Quitéria
          </h1>
        </div>
      )}

      {/* SEÇÃO: SOBRE */}
      <section id="sobre" className="py-12 scroll-mt-32">
        <h2 className="text-3xl font-cinzel text-paroquia-gold text-center mb-6">
          Sobre a Paróquia
        </h2>
        <div className="card">
          {/* Altere o src para o caminho correto do seu vídeo na pasta public */}
          <video
            className="w-full max-w-[480px] block mx-auto my-5 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.7)] outline outline-2 outline-[rgba(212,175,55,0.35)] bg-black"
            controls
            playsInline
          >
            <source src="/video/videoplayback (9).mp4" type="video/mp4" />
            Seu navegador não suporta vídeo.
          </video>

          <div className="text-paroquia-light leading-relaxed space-y-4 text-justify">
            <p>
              <strong>Pároco:</strong> Padre Cássio Ramon
            </p>
            <p>
              Santa Quitéria, uma das figuras mais veneradas do cristianismo
              primitivo, é lembrada com grande devoção em várias regiões da
              Europa, especialmente em Portugal, Espanha e França. Sua história
              remonta ao século II, durante as intensas perseguições romanas
              contra os cristãos.
            </p>
            <p>
              Quitéria nasceu em uma família de alta nobreza na Galícia,
              Espanha. Desde cedo, sentiu um profundo chamado para abraçar a fé
              cristã, renunciando às riquezas e privilégios de sua posição para
              seguir Cristo. Criada em segredo na fé cristã por sua mãe,
              Quitéria era uma das nove irmãs que também adotaram o
              cristianismo. Quando seu pai, um defensor ferrenho do paganismo,
              descobriu sua fé, ordenou que todas se casassem com nobres pagãos
              para garantir a continuidade de suas crenças. Quitéria, porém,
              rejeitou o casamento forçado, optando por consagrar sua vida a
              Cristo, o que provocou a ira de seu pai.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO: HORÁRIOS */}
      <section id="horarios" className="py-12 scroll-mt-32">
        <h2 className="text-3xl font-cinzel text-paroquia-gold text-center mb-6">
          Horários de Atendimentos | Matriz
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <strong className="text-xl text-paroquia-gold mb-2 block font-cinzel">
              Matriz:
            </strong>
            <p className="mb-4">
              Terça-feira a Sábado:
              <br />
              Das 09:00h às 12:30h
              <br />
              Das 14:00h às 16:45h
            </p>

            <strong className="text-lg text-paroquia-gold mb-1 block">
              Endereço:
            </strong>
            <p className="mb-4">
              Estrada do Lageado, 1206 • Lageado • <br />
              08451-000 • São Paulo – SP
            </p>

            <strong className="text-lg text-paroquia-gold mb-1 block">
              Telefone Fixo:
            </strong>
            <p className="mb-4">(11) 2961-4754</p>

            <p className="text-yellow-400 text-sm mt-4 font-semibold">
              Não atendemos aos domingos, segundas e feriados. ⚠️
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="card">
              <h2 className="text-xl font-cinzel text-paroquia-gold mb-3 text-left">
                Confissões
              </h2>
              <p className="mb-3">
                <strong className="text-paroquia-gold">Confissão:</strong>
                <br />
                Todas as Quintas-feiras, confissão antes da Santa Missa.
              </p>
              <p>
                <strong className="text-paroquia-gold">
                  Direção Espiritual:
                </strong>
                <br />
                Padre Cássio, agendar horário pelo WhatsApp Paroquial.
              </p>
            </div>

            <div className="card">
              <h2 className="text-xl font-cinzel text-paroquia-gold mb-3 text-left">
                Missas
              </h2>
              <p>
                <strong className="text-paroquia-gold">
                  Horário das Missas | Matriz:
                </strong>
                <br />
                Domingo - 07:00h | 18:00h
                <br />
                Quinta-feira - Adoração ao Santíssimo Sacramento - 19:00h |
                20:00h Santa Missa
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: CALENDÁRIO */}
      <section id="calendario" className="py-12 scroll-mt-32">
        <h2 className="text-3xl font-cinzel text-paroquia-gold text-center mb-6">
          Calendário Paroquial
        </h2>
        <div className="card p-2 md:p-6">
          <iframe
            src="https://calendar.google.com/calendar/u/0/embed?height=652&wkst=1&ctz=America/Sao_Paulo&bgcolor=%23B39DDB&mode=AGENDA&hl=pt_BR&src=cGFyb3F1aWFzYW50YXF1aXRlcmlhMUBnbWFpbC5jb20&src=cGFyb2NvZGVzYW50YXF1aXRlcmlhQGdtYWlsLmNvbQ&src=cHQtcHQuYnJhemlsaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%237986CB&color=%230B8043"
            style={{ border: 0 }}
            width="100%"
            height="500"
            className="rounded-lg bg-white"
            title="Calendário de Eventos"
          />
        </div>
      </section>

      {/* SEÇÃO: DOAÇÃO */}
      <section id="doacao" className="py-12 scroll-mt-32">
        <h2 className="text-3xl font-cinzel text-paroquia-gold text-center mb-6">
          Ajude a Manter Nosso Apostolado e Missão
        </h2>
        <div className="text-center">
          <p className="text-lg mb-4">Chave Pix:</p>
          {/* Garanta que a imagem do QR Code está em /public/img/qr-pix.png */}
          <img
            src="/img/qr-pix.png"
            alt="QR Code PIX"
            className="w-48 mx-auto rounded-xl border-4 border-paroquia-gold mb-6"
          />
          <button onClick={handleCopyPix} className="btn-gold cursor-pointer">
            Copiar chave PIX
          </button>
        </div>
      </section>

      {/* SEÇÃO: CONTATO */}
      <section id="contato" className="py-12 scroll-mt-32">
        <h2 className="text-3xl font-cinzel text-paroquia-gold text-center mb-8">
          Contato | Redes Sociais
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <a
            href="https://wa.me/+551129614754"
            className="btn-gold text-center w-full sm:w-auto"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp Paroquial
          </a>
          <a
            href="https://www.instagram.com/santaquiteria.guaianases/?hl=pt"
            className="btn-gold text-center w-full sm:w-auto"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/santaquiteria.guaianases/"
            className="btn-gold text-center w-full sm:w-auto"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </div>
      </section>
    </>
  );
};
