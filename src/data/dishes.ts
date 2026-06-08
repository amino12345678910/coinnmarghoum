export type Dish = {
  id: string;
  name: { fr: string; en: string };
  description: { fr: string; en: string };
  image: string;
  tags: { fr: string[]; en: string[] };
  alignment: "top" | "center" | "bottom";
};

export const signatureDishes: Dish[] = [
  {
    id: "couscous-royal",
    name: { fr: "Couscous Royal", en: "Royal Couscous" },
    description: {
      fr: "La pièce maîtresse. Semoule fine roulée à la main, bouillon parfumé aux sept épices, légumes fondants et viandes tendrement braisées.",
      en: "The centerpiece. Fine hand-rolled semolina, rich seven-spice broth, melting vegetables, and tender braised meats."
    },
    image: "/images/dish_couscous.png",
    tags: {
      fr: ["Authentique", "Généreux"],
      en: ["Authentic", "Generous"]
    },
    alignment: "top",
  },
  {
    id: "brik-oeuf",
    name: { fr: "Brik à l'Œuf", en: "Egg Brik" },
    description: {
      fr: "Une feuille de malsouqa croustillante enveloppant un œuf coulant, du thon à l'huile d'olive, du persil et des câpres.",
      en: "A crispy sheet of malsouqa pastry wrapping a runny egg, olive oil tuna, fresh parsley, and capers."
    },
    image: "/images/dish_brik.png",
    tags: {
      fr: ["Croustillant", "Entrée"],
      en: ["Crispy", "Starter"]
    },
    alignment: "center",
  },
  {
    id: "riz-djerbien",
    name: { fr: "Riz Djerbien", en: "Djerbian Rice" },
    description: {
      fr: "Cuit à la vapeur selon la tradition de Djerba, mélangé avec des blettes, des pois chiches et des morceaux de viande marinés.",
      en: "Steamed according to the tradition of Djerba, combined with Swiss chard, chickpeas, and pieces of marinated meat."
    },
    image: "/images/dish_riz_djerbien.png",
    tags: {
      fr: ["Spécialité du sud", "Parfumé"],
      en: ["Southern Specialty", "Fragrant"]
    },
    alignment: "bottom",
  },
  {
    id: "ojja-merguez",
    name: { fr: "Ojja Merguez", en: "Merguez Ojja" },
    description: {
      fr: "Œufs pochés dans une sauce tomate épicée à l'harissa et à l'ail, garnis de merguez piquantes grillées au feu de bois.",
      en: "Poached eggs in a spicy tomato sauce with harissa and garlic, topped with grilled spicy merguez sausages."
    },
    image: "/images/dish_ojja.png",
    tags: {
      fr: ["Épicé chaud", "Réconfortant"],
      en: ["Warm & Spicy", "Comforting"]
    },
    alignment: "center",
  },
];
