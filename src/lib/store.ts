export type StoreSettings = {
  whatsappUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
};

export const defaultStoreSettings: StoreSettings = {
  whatsappUrl: "https://wa.me/5500000000000",
  instagramUrl: "https://instagram.com/vivanelhome",
  tiktokUrl: "https://tiktok.com/@vivanelhome",
};

export const storeConfig = {
  name: "VivanelHOME",
  slogan: "Os melhores achadinhos para facilitar sua rotina",
  niche: "Casa, cozinha e organizacao",
  ...defaultStoreSettings,
  affiliateDisclaimer:
    "Alguns produtos podem direcionar voce para lojas parceiras. Se a compra for realizada por esses links, podemos receber uma comissao, sem custo extra para voce.",
  promoPhrases: [
    "Ofertas elegantes para o dia a dia",
    "Novidades com mais estilo e economia",
    "Praticidade para casa, treino e carro",
  ],
  categories: [
    { name: "Cozinha Pratica", slug: "cozinha-pratica" },
    { name: "Casa Organizada", slug: "casa-organizada" },
    { name: "Banheiro e Limpeza", slug: "banheiro-e-limpeza" },
    { name: "Utilidades do Dia a Dia", slug: "utilidades-do-dia-a-dia" },
    { name: "Academia", slug: "academia" },
    { name: "Ferramentas", slug: "ferramentas" },
    { name: "Automotiva", slug: "automotiva" },
    { name: "Mais Vendidos", slug: "mais-vendidos" },
    { name: "Promocoes do Dia", slug: "promocoes-do-dia" },
  ],
};

export const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
