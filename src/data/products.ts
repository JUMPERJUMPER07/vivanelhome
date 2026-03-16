export type Product = {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  oldPrice: number;
  price: number;
  discountLabel: string;
  category: string;
  categorySlug: string;
  affiliateUrl: string;
  cta: string;
  badge: string;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  iconKey:
    | "chef-hat"
    | "sparkles"
    | "package"
    | "droplets"
    | "utensils"
    | "shield"
    | "bubbles";
  accentFrom: string;
  accentTo: string;
  benefits: string[];
  isBestSeller?: boolean;
  isFlashDeal?: boolean;
  isNew?: boolean;
  isFavorite?: boolean;
  isCustom?: boolean;
};

// Os produtos ja ficam prontos para receber links reais de afiliado depois.
export const products: Product[] = [
  {
    id: 1,
    slug: "organizador-giratorio-temperos",
    name: "Organizador Giratorio de Temperos",
    shortDescription: "Bancada organizada e potes sempre ao alcance.",
    description:
      "Ideal para deixar temperos, molhos e pequenos potes organizados sem ocupar muito espaco na bancada ou armario.",
    oldPrice: 79.9,
    price: 49.9,
    discountLabel: "-38%",
    category: "Cozinha Pratica",
    categorySlug: "cozinha-pratica",
    affiliateUrl: "https://example.com/afiliado/organizador-giratorio-temperos",
    cta: "Ver Oferta",
    badge: "Mais vendido",
    rating: 4.9,
    reviewCount: 241,
    iconKey: "chef-hat",
    accentFrom: "#FF8A00",
    accentTo: "#E63946",
    benefits: [
      "Base giratoria para acesso rapido",
      "Visual limpo e elegante na cozinha",
      "Perfeito para armarios e bancadas pequenas",
    ],
    isBestSeller: true,
    isFavorite: true,
  },
  {
    id: 2,
    slug: "cesto-organizador-dobravel",
    name: "Cesto Organizador Dobravel",
    shortDescription: "Guarde roupas, mantas e brinquedos com praticidade.",
    description:
      "Cesto versatil para closets, quartos e lavanderias, com estrutura leve e dobravel para facilitar o uso diario.",
    oldPrice: 59.9,
    price: 29.9,
    discountLabel: "-50%",
    category: "Casa Organizada",
    categorySlug: "casa-organizada",
    affiliateUrl: "https://example.com/afiliado/cesto-organizador-dobravel",
    cta: "Aproveitar",
    badge: "Ate R$29,90",
    rating: 4.7,
    reviewCount: 173,
    iconKey: "package",
    accentFrom: "#FDBA74",
    accentTo: "#FB7185",
    benefits: [
      "Dobra completamente quando nao estiver em uso",
      "Acabamento neutro que combina com varios ambientes",
      "Ajuda a manter tudo no lugar com baixo custo",
    ],
    isFlashDeal: true,
  },
  {
    id: 3,
    slug: "escorredor-retratil-loucas",
    name: "Escorredor Retratil de Loucas",
    shortDescription: "Se adapta a pias compactas e otimiza espaco.",
    description:
      "Escorredor com estrutura extensivel para pratos, copos e talheres, ideal para cozinhas pequenas e rotina corrida.",
    oldPrice: 99.9,
    price: 67.9,
    discountLabel: "-32%",
    category: "Cozinha Pratica",
    categorySlug: "cozinha-pratica",
    affiliateUrl: "https://example.com/afiliado/escorredor-retratil-loucas",
    cta: "Comprar Agora",
    badge: "Oferta relampago",
    rating: 4.8,
    reviewCount: 126,
    iconKey: "utensils",
    accentFrom: "#F97316",
    accentTo: "#FDBA74",
    benefits: [
      "Formato retratil para economizar espaco",
      "Secagem pratica e visual moderno",
      "Boa opcao para cozinhas funcionais",
    ],
    isBestSeller: true,
    isFlashDeal: true,
  },
  {
    id: 4,
    slug: "suporte-dispenser-detergente",
    name: "Suporte com Dispenser para Pia",
    shortDescription: "Esponja, detergente e pano em um so lugar.",
    description:
      "Uma solucao compacta para manter a pia bonita e organizada, com dispenser integrado para o dia a dia.",
    oldPrice: 44.9,
    price: 27.9,
    discountLabel: "-37%",
    category: "Utilidades do Dia a Dia",
    categorySlug: "utilidades-do-dia-a-dia",
    affiliateUrl: "https://example.com/afiliado/suporte-dispenser-detergente",
    cta: "Ver Oferta",
    badge: "Ate R$29,90",
    rating: 4.6,
    reviewCount: 85,
    iconKey: "droplets",
    accentFrom: "#F59E0B",
    accentTo: "#F97316",
    benefits: [
      "Ajuda a reduzir bagunca na pia",
      "Facil de limpar e reabastecer",
      "Combina com cozinhas modernas",
    ],
    isFavorite: true,
  },
  {
    id: 5,
    slug: "kit-potes-hermeticos-5pcs",
    name: "Kit Potes Hermeticos 5 Pecas",
    shortDescription: "Mais praticidade para alimentos, snacks e mantimentos.",
    description:
      "Conjunto com vedacao segura para conservar melhor os alimentos e deixar a despensa mais organizada.",
    oldPrice: 89.9,
    price: 54.9,
    discountLabel: "-39%",
    category: "Casa Organizada",
    categorySlug: "casa-organizada",
    affiliateUrl: "https://example.com/afiliado/kit-potes-hermeticos-5pcs",
    cta: "Aproveitar desconto",
    badge: "Queridinho",
    rating: 4.9,
    reviewCount: 214,
    iconKey: "shield",
    accentFrom: "#FB923C",
    accentTo: "#F87171",
    benefits: [
      "Veda bem e ajuda a conservar alimentos",
      "Empilha com facilidade no armario",
      "Transparente para identificar o conteudo rapidamente",
    ],
    isBestSeller: true,
    isFavorite: true,
  },
  {
    id: 6,
    slug: "escova-silicone-limpeza-multiuso",
    name: "Escova de Silicone Multiuso",
    shortDescription: "Limpeza delicada para cozinha, banheiro e lavanderia.",
    description:
      "Escova com cerdas em silicone para limpeza pratica, sem riscar superficies e com secagem mais rapida.",
    oldPrice: 34.9,
    price: 19.9,
    discountLabel: "-43%",
    category: "Banheiro e Limpeza",
    categorySlug: "banheiro-e-limpeza",
    affiliateUrl: "https://example.com/afiliado/escova-silicone-limpeza-multiuso",
    cta: "Ver Oferta",
    badge: "Ate R$29,90",
    rating: 4.5,
    reviewCount: 68,
    iconKey: "bubbles",
    accentFrom: "#FDBA74",
    accentTo: "#F97316",
    benefits: [
      "Seca mais rapido que escovas tradicionais",
      "Facil de higienizar",
      "Boa para azulejos, pias e utensilios",
    ],
    isFlashDeal: true,
  },
  {
    id: 7,
    slug: "prateleira-adesiva-banheiro",
    name: "Prateleira Adesiva para Banheiro",
    shortDescription: "Organize shampoos e cremes sem furar a parede.",
    description:
      "Prateleira resistente a umidade para manter itens de higiene sempre acessiveis e com visual clean.",
    oldPrice: 52.9,
    price: 31.9,
    discountLabel: "-40%",
    category: "Banheiro e Limpeza",
    categorySlug: "banheiro-e-limpeza",
    affiliateUrl: "https://example.com/afiliado/prateleira-adesiva-banheiro",
    cta: "Comprar Agora",
    badge: "Novidade",
    rating: 4.8,
    reviewCount: 102,
    iconKey: "sparkles",
    accentFrom: "#FF7A18",
    accentTo: "#FFB347",
    benefits: [
      "Instalacao simples sem sujeira",
      "Aproveita melhor as paredes",
      "Visual minimalista para o banheiro",
    ],
    isNew: true,
  },
  {
    id: 8,
    slug: "mini-seladora-embalagens",
    name: "Mini Seladora para Embalagens",
    shortDescription: "Feche pacotes abertos e conserve por mais tempo.",
    description:
      "Compacta e facil de usar, essa seladora ajuda a manter snacks, cafe e mantimentos protegidos no dia a dia.",
    oldPrice: 39.9,
    price: 24.9,
    discountLabel: "-38%",
    category: "Utilidades do Dia a Dia",
    categorySlug: "utilidades-do-dia-a-dia",
    affiliateUrl: "https://example.com/afiliado/mini-seladora-embalagens",
    cta: "Aproveitar",
    badge: "Ate R$29,90",
    rating: 4.4,
    reviewCount: 59,
    iconKey: "package",
    accentFrom: "#F97316",
    accentTo: "#E63946",
    benefits: [
      "Ajuda a evitar desperdicio",
      "Compacta para guardar em qualquer gaveta",
      "Boa para rotina corrida e despensa organizada",
    ],
    isNew: true,
  },
  {
    id: 9,
    slug: "tapete-absorvente-cozinha",
    name: "Tapete Absorvente para Cozinha",
    shortDescription: "Mais conforto e protecao perto da pia.",
    description:
      "Tapete com secagem rapida e base aderente para reduzir respingos e deixar o espaco mais bonito.",
    oldPrice: 69.9,
    price: 42.9,
    discountLabel: "-39%",
    category: "Cozinha Pratica",
    categorySlug: "cozinha-pratica",
    affiliateUrl: "https://example.com/afiliado/tapete-absorvente-cozinha",
    cta: "Ver Oferta",
    badge: "Queridinho",
    rating: 4.7,
    reviewCount: 141,
    iconKey: "droplets",
    accentFrom: "#FDBA74",
    accentTo: "#FB7185",
    benefits: [
      "Ajuda a manter o piso mais seco",
      "Confortavel para uso diario",
      "Acabamento elegante para a cozinha",
    ],
    isFavorite: true,
  },
  {
    id: 10,
    slug: "organizador-cabos-e-gavetas",
    name: "Organizador de Cabos e Gavetas",
    shortDescription: "Menos bagunca em escritorios, cozinhas e mesas.",
    description:
      "Kit pratico para separar fios, pequenos acessorios e itens do dia a dia em casa ou no trabalho.",
    oldPrice: 32.9,
    price: 18.9,
    discountLabel: "-42%",
    category: "Casa Organizada",
    categorySlug: "casa-organizada",
    affiliateUrl: "https://example.com/afiliado/organizador-cabos-e-gavetas",
    cta: "Aproveitar",
    badge: "Promocao do dia",
    rating: 4.6,
    reviewCount: 77,
    iconKey: "sparkles",
    accentFrom: "#F97316",
    accentTo: "#EA580C",
    benefits: [
      "Evita bagunca visual em bancadas",
      "Facil de aplicar e remover",
      "Versatil para casa e escritorio",
    ],
    isFlashDeal: true,
    isNew: true,
  },
  {
    id: 11,
    slug: "kit-faixas-elasticas-treino",
    name: "Kit Faixas Elasticas de Treino",
    shortDescription: "Treino em casa com praticidade e pouco espaco.",
    description:
      "Conjunto com faixas de resistencia para fortalecer membros superiores e inferiores em treinos de academia ou home gym.",
    oldPrice: 89.9,
    price: 54.9,
    discountLabel: "-39%",
    category: "Academia",
    categorySlug: "academia",
    affiliateUrl: "https://example.com/afiliado/kit-faixas-elasticas-treino",
    cta: "Comprar Agora",
    badge: "Treino em casa",
    rating: 4.8,
    reviewCount: 133,
    iconKey: "sparkles",
    accentFrom: "#7c3aed",
    accentTo: "#111111",
    benefits: [
      "Ocupa pouco espaco",
      "Boa para treino funcional e mobilidade",
      "Excelente para rotina em casa",
    ],
    isBestSeller: true,
    isNew: true,
  },
  {
    id: 12,
    slug: "parafusadeira-portatil-48v",
    name: "Parafusadeira Portatil 48V",
    shortDescription: "Mais praticidade para pequenos reparos no dia a dia.",
    description:
      "Ferramenta compacta com boa autonomia para montar moveis, apertar parafusos e agilizar manutencoes em casa.",
    oldPrice: 219.9,
    price: 159.9,
    discountLabel: "-27%",
    category: "Ferramentas",
    categorySlug: "ferramentas",
    affiliateUrl: "https://example.com/afiliado/parafusadeira-portatil-48v",
    cta: "Ver Oferta",
    badge: "Ferramenta util",
    rating: 4.7,
    reviewCount: 88,
    iconKey: "package",
    accentFrom: "#111111",
    accentTo: "#8b5cf6",
    benefits: [
      "Compacta e facil de guardar",
      "Ajuda em montagens e pequenos ajustes",
      "Boa opcao para uso domestico",
    ],
    isFavorite: true,
  },
  {
    id: 13,
    slug: "aspirador-portatil-automotivo",
    name: "Aspirador Portatil Automotivo",
    shortDescription: "Mais limpeza no carro com visual compacto e moderno.",
    description:
      "Aspirador leve para manter carro, porta-luvas e cantos internos sempre limpos sem ocupar muito espaco.",
    oldPrice: 119.9,
    price: 79.9,
    discountLabel: "-33%",
    category: "Automotiva",
    categorySlug: "automotiva",
    affiliateUrl: "https://example.com/afiliado/aspirador-portatil-automotivo",
    cta: "Aproveitar",
    badge: "Auto cuidado",
    rating: 4.6,
    reviewCount: 91,
    iconKey: "droplets",
    accentFrom: "#1f1438",
    accentTo: "#8b5cf6",
    benefits: [
      "Ajuda na limpeza rapida do interior",
      "Leve para carregar no carro",
      "Bom para rotina automotiva pratica",
    ],
    isFlashDeal: true,
  },
];

export const findProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);
