export type MenuCategoryId = "entrees" | "plats" | "vegetal" | "douceurs" | "boissons";

export type MenuItem = {
  name: { fr: string; en: string };
  description: { fr: string; en: string };
  price: number;
  notes: { fr: string[]; en: string[] };
  signature?: boolean;
};

export type MenuCategory = {
  id: MenuCategoryId;
  label: { fr: string; en: string };
  eyebrow: { fr: string; en: string };
  description: { fr: string; en: string };
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "entrees",
    label: { fr: "Entrées", en: "Starters" },
    eyebrow: { fr: "Croustillant & fraîcheur", en: "Crispy & Fresh" },
    description: {
      fr: "Des débuts francs, parfumés, faits pour ouvrir la table et partager.",
      en: "Bold, aromatic beginnings, crafted to open the table and share."
    },
    items: [
      {
        name: { fr: "Brik à l'œuf", en: "Egg Brik" },
        description: {
          fr: "Malsouqa fine, œuf coulant, thon, persil, câpres et citron.",
          en: "Thin malsouqa pastry, runny egg, tuna, parsley, capers, and lemon."
        },
        price: 12,
        notes: {
          fr: ["Croustillant", "Classique"],
          en: ["Crispy", "Classic"]
        },
        signature: true,
      },
      {
        name: { fr: "Mechouia fumée", en: "Smoked Mechouia" },
        description: {
          fr: "Poivrons grillés, tomate, ail, huile d'olive et touche de harissa.",
          en: "Grilled peppers, tomato, garlic, olive oil, and a touch of harissa."
        },
        price: 14,
        notes: {
          fr: ["Fumé", "Végétarien"],
          en: ["Smoky", "Vegetarian"]
        },
      },
      {
        name: { fr: "Slata Tounsia", en: "Tunisian Salad" },
        description: {
          fr: "Tomate, concombre, oignon doux, menthe sèche et olives.",
          en: "Tomato, cucumber, sweet onion, dried mint, and olives."
        },
        price: 11,
        notes: {
          fr: ["Frais", "Léger"],
          en: ["Fresh", "Light"]
        },
      },
      {
        name: { fr: "Assiette Kemia", en: "Kemia Platter" },
        description: {
          fr: "Olives, harissa douce, salade mechouia, fromage et pain maison.",
          en: "Olives, mild harissa, mechouia salad, cheese, and homemade bread."
        },
        price: 18,
        notes: {
          fr: ["À partager", "Maison"],
          en: ["To share", "Homemade"]
        },
      },
      {
        name: { fr: "Doigts de Fatma", en: "Fatima's Fingers" },
        description: {
          fr: "Feuilles croustillantes, farce fine au poulet, fromage et herbes.",
          en: "Crispy pastry rolls filled with minced chicken, cheese, and herbs."
        },
        price: 16,
        notes: {
          fr: ["Doré", "Gourmand"],
          en: ["Golden", "Savory"]
        },
      },
    ],
  },
  {
    id: "plats",
    label: { fr: "Plats", en: "Mains" },
    eyebrow: { fr: "Le cœur de la maison", en: "Heart of the House" },
    description: {
      fr: "Des plats généreux où semoule, vapeur, sauce et épices prennent le temps.",
      en: "Generous plates where hand-rolled semolina, steam, slow sauces, and spices take their time."
    },
    items: [
      {
        name: { fr: "Couscous Royal", en: "Royal Couscous" },
        description: {
          fr: "Semoule roulée fine, légumes fondants, bouillon aux sept épices et viandes braisées.",
          en: "Fine hand-rolled semolina, tender vegetables, seven-spice broth, and braised meats."
        },
        price: 42,
        notes: {
          fr: ["Généreux", "Signature"],
          en: ["Generous", "Signature"]
        },
        signature: true,
      },
      {
        name: { fr: "Ojja Merguez", en: "Merguez Ojja" },
        description: {
          fr: "Sauce tomate à l'ail, harissa maîtrisée, œufs pochés et merguez grillées.",
          en: "Garlic tomato sauce, balanced harissa, poached eggs, and grilled merguez sausages."
        },
        price: 29,
        notes: {
          fr: ["Piquant", "Réconfortant"],
          en: ["Spicy", "Comforting"]
        },
      },
      {
        name: { fr: "Riz Djerbien", en: "Djerbian Rice" },
        description: {
          fr: "Riz vapeur, blettes, pois chiches, viande marinée et herbes du sud.",
          en: "Steamed rice, Swiss chard, chickpeas, marinated meat, and southern herbs."
        },
        price: 34,
        notes: {
          fr: ["Parfumé", "Sud tunisien"],
          en: ["Fragrant", "Southern Specialty"]
        },
      },
      {
        name: { fr: "Mosli d'agneau", en: "Lamb Mosli" },
        description: {
          fr: "Agneau tendre, pommes de terre confites, romarin, ail et jus réduit.",
          en: "Tender lamb, slow-cooked potatoes, rosemary, garlic, and reduced jus."
        },
        price: 46,
        notes: {
          fr: ["Lent", "Fondant"],
          en: ["Slow-cooked", "Melts in Mouth"]
        },
        signature: true,
      },
      {
        name: { fr: "Poisson du jour", en: "Catch of the Day" },
        description: {
          fr: "Poisson grillé, citron, huile d'olive, salade fraîche et légumes du marché.",
          en: "Grilled fresh fish, lemon, olive oil, fresh salad, and seasonal market vegetables."
        },
        price: 39,
        notes: {
          fr: ["Frais", "Grillé"],
          en: ["Fresh", "Grilled"]
        },
      },
      {
        name: { fr: "Mloukhia maison", en: "Homemade Mloukhia" },
        description: {
          fr: "Sauce longue et profonde, viande mijotée, ail, laurier et pain chaud.",
          en: "Deep and rich slow-cooked jute leaf sauce, stewed beef, garlic, bay leaf, and warm bread."
        },
        price: 38,
        notes: {
          fr: ["Tradition", "Lent"],
          en: ["Traditional", "Slow-cooked"]
        },
      },
    ],
  },
  {
    id: "vegetal",
    label: { fr: "Végétal", en: "Vegetarian" },
    eyebrow: { fr: "Épices sans détour", en: "Pure Spices" },
    description: {
      fr: "Des assiettes végétales qui restent profondes, solaires et pleinement tunisiennes.",
      en: "Vegetarian plates that remain deep, sun-drenched, and fully Tunisian."
    },
    items: [
      {
        name: { fr: "Couscous aux légumes", en: "Vegetable Couscous" },
        description: {
          fr: "Semoule fine, courgette, carotte, pois chiches et bouillon doux.",
          en: "Fine semolina, zucchini, carrot, chickpeas, and a mild vegetable broth."
        },
        price: 26,
        notes: {
          fr: ["Végétarien", "Doux"],
          en: ["Vegetarian", "Mild"]
        },
      },
      {
        name: { fr: "Tajine tunisien", en: "Tunisian Tajine" },
        description: {
          fr: "Œufs, pommes de terre, persil, fromage et épices cuites au four.",
          en: "Baked egg cake with potatoes, parsley, cheese, and aromatic spices."
        },
        price: 19,
        notes: {
          fr: ["Moelleux", "À partager"],
          en: ["Moist", "To share"]
        },
      },
      {
        name: { fr: "Kafteji maison", en: "Homemade Kafteji" },
        description: {
          fr: "Légumes dorés, œuf, pommes de terre et assaisonnement à l'ancienne.",
          en: "Finely chopped fried vegetables, egg, potatoes, and traditional seasoning."
        },
        price: 22,
        notes: {
          fr: ["Gourmand", "Populaire"],
          en: ["Hearty", "Local Favorite"]
        },
      },
      {
        name: { fr: "Lablabi soigné", en: "Classic Lablabi" },
        description: {
          fr: "Pois chiches, cumin, citron, huile d'olive, pain croustillant et œuf.",
          en: "Chickpeas, cumin, lemon, olive oil, crusty bread, and a soft-boiled egg."
        },
        price: 18,
        notes: {
          fr: ["Chaud", "Populaire"],
          en: ["Warm", "Popular Street Food"]
        },
      },
    ],
  },
  {
    id: "douceurs",
    label: { fr: "Douceurs", en: "Desserts" },
    eyebrow: { fr: "Finir en douceur", en: "Sweet Endings" },
    description: {
      fr: "Miel, fruits secs, fleur d'oranger et textures fondantes.",
      en: "Honey, nuts, orange blossom, and melt-in-the-mouth textures."
    },
    items: [
      {
        name: { fr: "Assiette de pâtisseries", en: "Pastry Platter" },
        description: {
          fr: "Sélection de douceurs tunisiennes selon la préparation du jour.",
          en: "A selection of traditional Tunisian pastries prepared daily."
        },
        price: 18,
        notes: {
          fr: ["Miel", "Fruits secs"],
          en: ["Honey", "Nuts"]
        },
      },
      {
        name: { fr: "Crème fleur d'oranger", en: "Orange Blossom Cream" },
        description: {
          fr: "Crème légère, parfum floral et éclats d'amandes.",
          en: "Light custard infused with orange blossom water, topped with crushed almonds."
        },
        price: 14,
        notes: {
          fr: ["Frais", "Délicat"],
          en: ["Fresh", "Delicate"]
        },
      },
      {
        name: { fr: "Dattes farcies", en: "Stuffed Dates" },
        description: {
          fr: "Dattes tendres, pâte d'amande et touche de sésame.",
          en: "Tender dates filled with sweet almond paste and a hint of sesame."
        },
        price: 16,
        notes: {
          fr: ["Tradition", "À partager"],
          en: ["Traditional", "To share"]
        },
      },
      {
        name: { fr: "Bambalouni minute", en: "Fresh Bambalouni" },
        description: {
          fr: "Beignet chaud, sucre fin et parfum discret de fleur d'oranger.",
          en: "Warm Tunisian donut sprinkled with sugar and a hint of orange blossom water."
        },
        price: 12,
        notes: {
          fr: ["Chaud", "Gourmand"],
          en: ["Hot", "Sweet Indulgence"]
        },
      },
    ],
  },
  {
    id: "boissons",
    label: { fr: "Boissons", en: "Drinks" },
    eyebrow: { fr: "Menthe, café, fraîcheur", en: "Mint, Coffee, Freshness" },
    description: {
      fr: "Des boissons simples pour accompagner le rythme de la table.",
      en: "Simple beverages to accompany the rhythm of the table."
    },
    items: [
      {
        name: { fr: "Thé à la menthe", en: "Mint Tea" },
        description: {
          fr: "Thé vert, menthe fraîche, pignons selon envie.",
          en: "Green tea with fresh mint leaves, served with pine nuts if desired."
        },
        price: 8,
        notes: {
          fr: ["Chaud", "Classique"],
          en: ["Hot", "Classic"]
        },
        signature: true,
      },
      {
        name: { fr: "Citronnade maison", en: "Homemade Lemonade" },
        description: {
          fr: "Citron pressé, eau fraîche et équilibre doux-acidule.",
          en: "Traditional sweet-and-sour crushed lemon drink served chilled."
        },
        price: 9,
        notes: {
          fr: ["Frais", "Maison"],
          en: ["Fresh", "Homemade"]
        },
      },
      {
        name: { fr: "Café turc", en: "Turkish Coffee" },
        description: {
          fr: "Café dense, parfumé, servi lentement.",
          en: "Dense, aromatic cardamom-infused coffee brewed and served slowly."
        },
        price: 7,
        notes: {
          fr: ["Intense", "Après repas"],
          en: ["Intense", "After Meal"]
        },
      },
      {
        name: { fr: "Boga lim", en: "Boga Lim" },
        description: {
          fr: "Classique tunisien frais, parfait avec les plats épicés.",
          en: "Classic refreshing Tunisian lemon soda, perfect with spicy dishes."
        },
        price: 6,
        notes: {
          fr: ["Frais", "Local"],
          en: ["Chilled", "Local Beverage"]
        },
      },
    ],
  },
];
