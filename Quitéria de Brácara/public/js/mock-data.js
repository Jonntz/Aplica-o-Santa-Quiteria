// ⚠️ ARQUIVO TEMPORÁRIO - Será substituído por chamadas à API do backend
// TODO: Remover este arquivo quando o backend estiver implementado

const noticiasParoquiais = [];
const eventosComunidades = [];

/* ================= FUNÇÕES ================= */

function montarCards(sliderId, lista, tipo) {
    const slider = document.getElementById(sliderId);
    
    if (!slider) return;
    
    slider.innerHTML = "";

    if (lista.length === 0) {
        slider.innerHTML = "<p>Carregando eventos...</p>";
        return;
    }

    lista.forEach((item, index) => {
        slider.innerHTML += `
            <div class="card" onclick="abrirMateria('${tipo}', ${index})">
                <img src="${item.imagem}" alt="${item.titulo}">
                <div class="conteudo">
                    <h3>${item.titulo}</h3>
                    <p>${item.resumo}</p>
                </div>
            </div>
        `;
    });
}

function abrirMateria(tipo, index) {
    const lista = tipo === "paroquial" ? noticiasParoquiais : eventosComunidades;
    const materia = lista[index];

    if (!materia) return;

    document.getElementById("secao-paroquial").style.display = "none";
    document.getElementById("secao-eventos").style.display = "none";
    document.getElementById("materia").style.display = "block";

    document.getElementById("materia-img").src = materia.imagem;
    document.getElementById("materia-titulo").innerText = materia.titulo;
    document.getElementById("materia-texto").innerText = materia.texto;
}

function voltarInicio() {
    document.getElementById("materia").style.display = "none";
    document.getElementById("secao-paroquial").style.display = "block";
    document.getElementById("secao-eventos").style.display = "block";
}

function scrollSlider(id, direcao) {
    const slider = document.getElementById(id);
    if (slider) {
        slider.scrollLeft += direcao * 240;
    }
}

function carregarDadosDoBackend() {
    // TODO: Implementar chamadas à API quando backend estiver pronto
    // fetch('/api/noticias').then(res => res.json()).then(data => {
    //     noticiasParoquiais.push(...data);
    //     montarCards("sliderParoquial", noticiasParoquiais, "paroquial");
    // });
    
    // fetch('/api/eventos').then(res => res.json()).then(data => {
    //     eventosComunidades.push(...data);
    //     montarCards("sliderEventos", eventosComunidades, "eventos");
    // });
}

function voltarAoPrincipio() {
    window.location.href = "/public/index.html";
}

/* ================= INICIALIZAÇÃO ================= */

document.addEventListener("DOMContentLoaded", () => {
    // Temporário: carrega dados vazios até o backend estar pronto
    montarCards("sliderParoquial", noticiasParoquiais, "paroquial");
    montarCards("sliderEventos", eventosComunidades, "eventos");
    
    // Descomentar quando o backend estiver pronto
    // carregarDadosDoBackend();
});