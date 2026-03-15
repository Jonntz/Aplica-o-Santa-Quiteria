const noticiasParoquiais = [
    {
        titulo: "Missa Solene de Abertura da Novena",
        imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65",
        resumo: "Comunidade reunida em fé e devoção.",
        texto: "A Paróquia Santa Quitéria iniciou com grande fé a Novena em honra à sua padroeira. Fiéis das comunidades participaram com devoção, oração e espírito de unidade."
    },
    {
        titulo: "Reforma da Igreja Matriz",
        imagem: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        resumo: "Melhorias no espaço litúrgico.",
        texto: "Estão em andamento as obras de melhoria da Igreja Matriz, visando mais conforto, segurança e acolhimento aos fiéis."
    }
];

const eventosComunidades = [
    {
        titulo: "Festa de São José",
        imagem: "https://images.unsplash.com/photo-1520975922284-8b456906c813",
        resumo: "Celebração tradicional da comunidade.",
        texto: "A Comunidade São José celebrou sua tradicional festa com missas, quermesse e momentos de confraternização."
    },
    {
        titulo: "Arraiá da Comunidade Lourdes",
        imagem: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
        resumo: "Noite festiva e familiar.",
        texto: "A Comunidade Nossa Senhora de Lourdes promoveu um arraiá animado com comidas típicas, música e muita alegria."
    }
];

/* ================= FUNÇÕES ================= */

function montarCards(sliderId, lista, tipo) {
    const slider = document.getElementById(sliderId);
    slider.innerHTML = "";

    lista.forEach((item, index) => {
        slider.innerHTML += `
            <div class="card" onclick="abrirMateria('${tipo}', ${index})">
                <img src="${item.imagem}">
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
    document.getElementById(id).scrollLeft += direcao * 240;
}

/* ================= INICIALIZAÇÃO ================= */

montarCards("sliderParoquial", noticiasParoquiais, "paroquial");
montarCards("sliderEventos", eventosComunidades, "eventos");

