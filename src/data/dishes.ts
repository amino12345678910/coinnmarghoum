import { StaticImageData } from "next/image";

import imgCouscous from "../../public/images/dish_couscous.png";
import imgBrik from "../../public/images/dish_brik.png";
import imgRizDjerbien from "../../public/images/dish_riz_djerbien.png";
import imgOjja from "../../public/images/dish_ojja.png";

export type Dish = {
  id: string;
  name: string;
  description: string;
  image: StaticImageData;
  tags: string[];
  alignment: "top" | "center" | "bottom";
};

export const signatureDishes: Dish[] = [
  {
    id: "couscous-royal",
    name: "Couscous Royal",
    description: "La pièce maîtresse. Semoule fine roulée à la main, bouillon parfumé aux sept épices, légumes fondants et viandes tendrement braisées.",
    image: imgCouscous,
    tags: ["Authentique", "Généreux"],
    alignment: "top",
  },
  {
    id: "brik-oeuf",
    name: "Brik à l'Œuf",
    description: "Une feuille de malsouqa croustillante enveloppant un œuf coulant, du thon à l'huile d'olive, du persil et des câpres.",
    image: imgBrik,
    tags: ["Croustillant", "Entrée"],
    alignment: "center",
  },
  {
    id: "riz-djerbien",
    name: "Riz Djerbien",
    description: "Cuit à la vapeur selon la tradition de Djerba, mélangé avec des blettes, des pois chiches et des morceaux de viande marinés.",
    image: imgRizDjerbien,
    tags: ["Spécialité du sud", "Parfumé"],
    alignment: "bottom",
  },
  {
    id: "ojja-merguez",
    name: "Ojja Merguez",
    description: "Œufs pochés dans une sauce tomate épicée à l'harissa et à l'ail, garnis de merguez piquantes grillées au feu de bois.",
    image: imgOjja,
    tags: ["Épicé chaud", "Réconfortant"],
    alignment: "center",
  }
];
