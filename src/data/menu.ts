export type MenuCategoryId = "entrees" | "plats" | "vegetal" | "douceurs" | "boissons";

export type MenuItem = {
  name: string;
  description: string;
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
    label: "Entrées",
    eyebrow: "Croustillant & fraîcheur",
    description: "Des débuts francs, parfumés, faits pour ouvrir la table et partager.",
    items: [
      {
        name: "Brik à l'Œuf",
        description: "Malsouqa fine, œuf coulant, thon, persil, câpres et citron.",
        notes: ["Croustillant", "Classique"],
        signature: true,
      },
      {
        name: "Mechouia fumée",
        description: "Poivrons grillés, tomate, ail, huile d'olive et touche de harissa.",
        notes: ["Fumé", "Végétarien"],
      },
      {
        name: "Slata Tounsia",
        description: "Tomate, concombre, oignon doux, menthe sèche et olives.",
        notes: ["Frais", "Léger"],
      },
    ],
  },
  {
    id: "plats",
    label: "Plats",
    eyebrow: "Le cœur de la maison",
    description: "Des plats généreux où semoule, vapeur, sauce et épices prennent le temps.",
    items: [
      {
        name: "Couscous Royal",
        description: "Semoule roulée fine, légumes fondants, bouillon aux sept épices et viandes braisées.",
        notes: ["Généreux", "Signature"],
        signature: true,
      },
      {
        name: "Ojja Merguez",
        description: "Sauce tomate à l'ail, harissa maîtrisée, œufs pochés et merguez grillées.",
        notes: ["Piquant", "Réconfortant"],
      },
      {
        name: "Riz Djerbien",
        description: "Riz vapeur, blettes, pois chiches, viande marinée et herbes du sud.",
        notes: ["Parfumé", "Sud tunisien"],
      },
    ],
  },
  {
    id: "vegetal",
    label: "Végétal",
    eyebrow: "Épices sans détour",
    description: "Des assiettes végétales qui restent profondes, solaires et pleinement tunisiennes.",
    items: [
      {
        name: "Couscous aux légumes",
        description: "Semoule fine, courgette, carotte, pois chiches et bouillon doux.",
        notes: ["Végétarien", "Doux"],
      },
      {
        name: "Tajine tunisien",
        description: "Œufs, pommes de terre, persil, fromage et épices cuites au four.",
        notes: ["Moelleux", "À partager"],
      },
      {
        name: "Kafteji maison",
        description: "Légumes dorés, œuf, pommes de terre et assaisonnement à l'ancienne.",
        notes: ["Gourmand", "Populaire"],
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
        name: "Assiette de pâtisseries",
        description: "Sélection de douceurs tunisiennes selon la préparation du jour.",
        notes: ["Miel", "Fruits secs"],
      },
      {
        name: "Crème à la fleur d'oranger",
        description: "Crème légère, parfum floral et éclats d'amandes.",
        notes: ["Frais", "Délicat"],
      },
      {
        name: "Dattes farcies",
        description: "Dattes tendres, pâte d'amande et touche de sésame.",
        notes: ["Tradition", "À partager"],
      },
    ],
  },
  {
    id: "boissons",
    label: "Boissons",
    eyebrow: "Menthe, café, fraîcheur",
    description: "Des boissons simples pour accompagner le rythme de la table.",
    items: [
      {
        name: "Thé à la menthe",
        description: "Thé vert, menthe fraîche, pignons selon envie.",
        notes: ["Chaud", "Classique"],
        signature: true,
      },
      {
        name: "Citronnade maison",
        description: "Citron pressé, eau fraîche et équilibre doux-acidulé.",
        notes: ["Frais", "Maison"],
      },
      {
        name: "Café turc",
        description: "Café dense, parfumé, servi lentement.",
        notes: ["Intense", "Après repas"],
      },
    ],
  },
];
