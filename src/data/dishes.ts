export type Dish = {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  alignment: "top" | "center" | "bottom";
};

export const signatureDishes: Dish[] = [
  {
    id: "couscous-royal",
    name: "Couscous Royal",
    description: "La pièce maîtresse. Semoule fine roulée à la main, bouillon parfumé aux sept épices, légumes fondants et viandes tendrement braisées.",
    image: "/images/dish_couscous.png",
    tags: ["Authentique", "Généreux"],
    alignment: "top",
  },
  {
    id: "brik-oeuf",
    name: "Brik à l'Œuf",
    description: "Une feuille de malsouqa croustillante enveloppant un œuf coulant, du thon à l'huile d'olive, du persil et des câpres.",
    image: "/images/dish_brik.png",
    tags: ["Croustillant", "Entrée"],
    alignment: "center",
  },
  {
    id: "riz-djerbien",
    name: "Riz Djerbien",
    description: "Cuit à la vapeur selon la tradition de Djerba, mélangé avec des blettes, des pois chiches et des morceaux de viande marinés.",
    image: "/images/dish_riz_djerbien.png",
    tags: ["Spécialité du sud", "Parfumé"],
    alignment: "bottom",
  },
  {
    id: "ojja-merguez",
    name: "Ojja Merguez",
    description: "Œufs pochés dans une sauce tomate épicée à l'harissa et à l'ail, garnis de merguez piquantes grillées au feu de bois.",
    image: "/images/dish_ojja.png",
    tags: ["Épicé chaud", "Réconfortant"],
    alignment: "center",
  },
];
