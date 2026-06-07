export type MenuCategoryId = "entrees" | "plats" | "vegetal" | "douceurs" | "boissons";

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  notes: string[];
  signature?: boolean;
};

export type MenuCategory = {
  id: MenuCategoryId;
  label: string;
  eyebrow: string;
  description: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "entrees",
    label: "Entrees",
    eyebrow: "Croustillant & fraicheur",
    description: "Des debuts francs, parfumes, faits pour ouvrir la table et partager.",
    items: [
      {
        name: "Brik a l'oeuf",
        description: "Malsouqa fine, oeuf coulant, thon, persil, capres et citron.",
        price: 12,
        notes: ["Croustillant", "Classique"],
        signature: true,
      },
      {
        name: "Mechouia fumee",
        description: "Poivrons grilles, tomate, ail, huile d'olive et touche de harissa.",
        price: 14,
        notes: ["Fume", "Vegetarien"],
      },
      {
        name: "Slata Tounsia",
        description: "Tomate, concombre, oignon doux, menthe seche et olives.",
        price: 11,
        notes: ["Frais", "Leger"],
      },
      {
        name: "Assiette Kemia",
        description: "Olives, harissa douce, salade mechouia, fromage et pain maison.",
        price: 18,
        notes: ["A partager", "Maison"],
      },
      {
        name: "Doigts de Fatma",
        description: "Feuilles croustillantes, farce fine au poulet, fromage et herbes.",
        price: 16,
        notes: ["Dore", "Gourmand"],
      },
    ],
  },
  {
    id: "plats",
    label: "Plats",
    eyebrow: "Le coeur de la maison",
    description: "Des plats genereux ou semoule, vapeur, sauce et epices prennent le temps.",
    items: [
      {
        name: "Couscous Royal",
        description: "Semoule roulee fine, legumes fondants, bouillon aux sept epices et viandes braisees.",
        price: 42,
        notes: ["Genereux", "Signature"],
        signature: true,
      },
      {
        name: "Ojja Merguez",
        description: "Sauce tomate a l'ail, harissa maitrisee, oeufs poches et merguez grillees.",
        price: 29,
        notes: ["Piquant", "Reconfortant"],
      },
      {
        name: "Riz Djerbien",
        description: "Riz vapeur, blettes, pois chiches, viande marinee et herbes du sud.",
        price: 34,
        notes: ["Parfume", "Sud tunisien"],
      },
      {
        name: "Mosli d'agneau",
        description: "Agneau tendre, pommes de terre confites, romarin, ail et jus reduit.",
        price: 46,
        notes: ["Lent", "Fondant"],
        signature: true,
      },
      {
        name: "Poisson du jour",
        description: "Poisson grille, citron, huile d'olive, salade fraiche et legumes du marche.",
        price: 39,
        notes: ["Frais", "Grille"],
      },
      {
        name: "Mloukhia maison",
        description: "Sauce longue et profonde, viande mijotee, ail, laurier et pain chaud.",
        price: 38,
        notes: ["Tradition", "Lent"],
      },
    ],
  },
  {
    id: "vegetal",
    label: "Vegetal",
    eyebrow: "Epices sans detour",
    description: "Des assiettes vegetales qui restent profondes, solaires et pleinement tunisiennes.",
    items: [
      {
        name: "Couscous aux legumes",
        description: "Semoule fine, courgette, carotte, pois chiches et bouillon doux.",
        price: 26,
        notes: ["Vegetarien", "Doux"],
      },
      {
        name: "Tajine tunisien",
        description: "Oeufs, pommes de terre, persil, fromage et epices cuites au four.",
        price: 19,
        notes: ["Moelleux", "A partager"],
      },
      {
        name: "Kafteji maison",
        description: "Legumes dores, oeuf, pommes de terre et assaisonnement a l'ancienne.",
        price: 22,
        notes: ["Gourmand", "Populaire"],
      },
      {
        name: "Lablabi soigne",
        description: "Pois chiches, cumin, citron, huile d'olive, pain croustillant et oeuf.",
        price: 18,
        notes: ["Chaud", "Populaire"],
      },
    ],
  },
  {
    id: "douceurs",
    label: "Douceurs",
    eyebrow: "Finir en douceur",
    description: "Miel, fruits secs, fleur d'oranger et textures fondantes.",
    items: [
      {
        name: "Assiette de patisseries",
        description: "Selection de douceurs tunisiennes selon la preparation du jour.",
        price: 18,
        notes: ["Miel", "Fruits secs"],
      },
      {
        name: "Creme fleur d'oranger",
        description: "Creme legere, parfum floral et eclats d'amandes.",
        price: 14,
        notes: ["Frais", "Delicat"],
      },
      {
        name: "Dattes farcies",
        description: "Dattes tendres, pate d'amande et touche de sesame.",
        price: 16,
        notes: ["Tradition", "A partager"],
      },
      {
        name: "Bambalouni minute",
        description: "Beignet chaud, sucre fin et parfum discret de fleur d'oranger.",
        price: 12,
        notes: ["Chaud", "Gourmand"],
      },
    ],
  },
  {
    id: "boissons",
    label: "Boissons",
    eyebrow: "Menthe, cafe, fraicheur",
    description: "Des boissons simples pour accompagner le rythme de la table.",
    items: [
      {
        name: "The a la menthe",
        description: "The vert, menthe fraiche, pignons selon envie.",
        price: 8,
        notes: ["Chaud", "Classique"],
        signature: true,
      },
      {
        name: "Citronnade maison",
        description: "Citron presse, eau fraiche et equilibre doux-acidule.",
        price: 9,
        notes: ["Frais", "Maison"],
      },
      {
        name: "Cafe turc",
        description: "Cafe dense, parfume, servi lentement.",
        price: 7,
        notes: ["Intense", "Apres repas"],
      },
      {
        name: "Boga lim",
        description: "Classique tunisien frais, parfait avec les plats epices.",
        price: 6,
        notes: ["Frais", "Local"],
      },
    ],
  },
];
