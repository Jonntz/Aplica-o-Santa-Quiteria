export interface Community {
  id: string;
  name: string;
  address: string;
  times: string;
  image: string;
  audio: string | null;
  description: string;
}

export const communitiesData: Community[] = [
  {
    id: 'matriz',
    name: 'Matriz Santa Quitéria',
    address: 'Estrada do Lageado, 1206',
    times: 'Domingo às 07h e 18h | Quinta às 20h',
    image: '/img/logo/logo.png',
    audio: null,
    description: 'A Igreja Matriz é o coração da nossa paróquia, dedicada à virgem e mártir Santa Quitéria. Aqui centralizamos as grandes celebrações, a secretaria paroquial e o atendimento com o Padre Cássio Ramon.'
  },
  {
    id: 'aparecida',
    name: 'Nossa Senhora Aparecida',
    address: 'Rua da Padroeira, S/N',
    times: 'Sábado às 18h | Domingo às 08h30',
    image: '/img/comunidades/aparecida/aparecida.png',
    audio: '/music/Hino.aparecida.mp3',
    description: 'Comunidade dedicada à Padroeira do Brasil, Nossa Senhora da Conceição Aparecida. Um espaço de muita fé e devoção mariana em nosso bairro.'
  },
  {
    id: 'fatima',
    name: 'Nossa Senhora de Fátima',
    address: 'Rua dos Pastorinhos, 13',
    times: 'Sábado às 19h30',
    image: '/img/comunidades/fatima/fatima 2.0.jpeg',
    audio: '/music/treze-maio.mp3',
    description: 'Inspirada nas aparições da Virgem Maria aos três pastorinhos na Cova da Iria. Nossa comunidade mantém viva a mensagem de oração e penitência pedida por Nossa Senhora.'
  },
  {
    id: 'lourdes',
    name: 'Nossa Senhora de Lourdes',
    address: 'Av. da Gruta, 11',
    times: 'Domingo às 10h',
    image: '/img/comunidades/lourdes/ns.lourdes.png.jpeg',
    audio: '/music/lourdes.mp3',
    description: 'Dedicada a Nossa Senhora de Lourdes, padroeira dos enfermos. Uma comunidade acolhedora que busca ser sinal de cura e esperança.'
  },
  {
    id: 'santa-eulalia',
    name: 'Santa Eulália',
    address: 'Rua dos Mártires, 25',
    times: 'Sábado às 17h',
    image: '/img/comunidades/santa-eulalia/eulalia.png',
    audio: '/music/santaeulalia.mp3',
    description: 'Comunidade sob a intercessão da jovem mártir Santa Eulália. Exemplo de coragem e fidelidade a Cristo desde a juventude.'
  },
  {
    id: 'santa-luzia',
    name: 'Santa Luzia',
    address: 'Rua da Visão, 13',
    times: 'Domingo às 08h',
    image: '/img/comunidades/santa-luzia/santa.luzia.png',
    audio: '/music/ytmp3free.cc_hino-de-santa-luzia-youtubemp3free.org.mp3',
    description: 'Dedicada à protetora dos olhos, Santa Luzia. Uma comunidade que busca enxergar as necessidades dos irmãos com os olhos da fé.'
  },
  {
    id: 'santa-rita',
    name: 'Santa Rita',
    address: 'Rua das Rosas, 22',
    times: 'Domingo às 19h30',
    image: '/img/comunidades/santa-rita/santarita.png',
    audio: null,
    description: 'Comunidade dedicada à padroeira das causas impossíveis, Santa Rita de Cássia. Um forte pilar de oração e intercessão em nossa paróquia.'
  }
];