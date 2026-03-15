document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("musicaFundo");

    if (!audio) return;

    // Tenta tocar automaticamente
    const playAudio = () => {
        audio.volume = 0.5; // volume inicial (0 a 1)
        audio.play().catch(() => {
            // Se o navegador bloquear, espera interação do usuário
            document.addEventListener("click", playAudio, { once: true });
            document.addEventListener("touchstart", playAudio, { once: true });
        });
    };

    playAudio();

    // Para a música ao sair da página
    window.addEventListener("beforeunload", () => {
        audio.pause();
        audio.currentTime = 0;
    });

    // Pausa a música se trocar de aba
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            audio.pause();
        } else {
            audio.play().catch(() => {});
        }
    });
});
