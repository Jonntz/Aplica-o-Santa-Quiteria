/* ===============================
   PIX
================================ */
document.addEventListener("DOMContentLoaded", function() {
    const pixBtn = document.getElementById("pixBtn");
    const toast = document.getElementById("toast");

    function mostrarToast(mensagem) {
        toast.innerText = mensagem;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    if (pixBtn) {
        pixBtn.addEventListener("click", function (e) {
            e.preventDefault();
            navigator.clipboard.writeText("61378741/0087-75");
            mostrarToast("✅ Chave Pix Copiada! Paróquia Santa Quitéria Agradece a Ajuda ao Apostolado!");
        });
    }
});


/* ===============================
   MÚSICA AMBIENTE
================================ */
const musica = document.getElementById("musicaFundo");
const video = document.getElementById("videoParoquia");

let tocou = false;

if (musica) {
    musica.volume = 0.08;
}

function iniciarMusica() {
    if (!tocou && musica) {
        musica.play().catch(() => {});
        tocou = true;

        // Para a música após 1 minuto
        setTimeout(() => {
            musica.pause();
            musica.currentTime = 0;
        }, 60000);
    }
}

/* Inicia música após interação */
window.addEventListener("scroll", iniciarMusica);
window.addEventListener("click", iniciarMusica);
window.addEventListener("touchstart", iniciarMusica);

/* 🎬 Quando o vídeo tocar → pausa a música */
if (video && musica) {
    video.addEventListener("play", () => {
        if (!musica.paused) {
            musica.pause();
        }
    });

    video.addEventListener("pause", () => {
        musica.pause();
    });
}

/* ===============================
   MENU HAMBURGUER
================================ */

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Fecha o menu ao clicar em algum link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}