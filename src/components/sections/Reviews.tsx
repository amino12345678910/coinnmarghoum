"use client";

import { Star } from "lucide-react";

import Reveal from "@/components/ui/Reveal";

const reviews = [
  {
    name: "Caleb",
    meta: "Local Guide · 69 avis · 22 photos",
    date: "il y a 7 mois",
    text: "Wonderful traditional Tunisian food. Beautiful restaurant, the owner is great and everyone is very kind!",
  },
  {
    name: "Arroudj Melissa",
    meta: "Local Guide · 11 avis · 7 photos",
    date: "il y a 6 mois",
    text: "Me and my husband went to this restaurant to have some traditional tunisian food and we were amazed with the taste of the food. Everything was spiced perfectly and the ambiance was great. The waiter was very friendly and we overall strongly recommend this restaurant.",
  },
  {
    name: "James Kyle",
    meta: "Local Guide · 14 avis · 3 photos",
    date: "il y a 3 mois",
    text: "What can you say other than 'perfection'. The type of food you really do travel the world to taste. Flavors unique to Tunisia there is no doubt!",
  },
  {
    name: "Gaia Vendartik",
    meta: "Local Guide · 33 avis · 38 photos",
    date: "il y a 8 mois",
    text: "Une adresse unique a La Marsa. Cuisine traditionnelle, a la fois genereuse et copieuse, mais aussi raffinee et elegante. Bravo Naser, un chef accueillant et souriant, soucieux des plus petits des details.",
  },
  {
    name: "Clemence Mabire",
    meta: "5 avis · 8 photos",
    date: "il y a 8 mois",
    text: "La nourriture est delicieuse, tres typique et authentique. Les proprietaires proposent des solutions pour le sans gluten. La decoration est tres jolie, la playlist est top et les proprietaires sont adorables.",
  },
  {
    name: "Esprit d'embruns",
    meta: "Gites du bord de mer · 4 avis · 4 photos",
    date: "il y a 4 mois",
    text: "Joli petit coin ! Cuisine abondante et variee, typiquement tunisienne. Poissons frais, saveurs subtilement epicees. Ambiance locale, frequentee par des locaux. Belle experience !",
  },
  {
    name: "star",
    meta: "Local Guide · 25 avis · 31 photos",
    date: "il y a 2 mois",
    text: "We had dinner in the Ramadan season and it was fabulous. In addition a friendly service, great atmosphere and cats!",
  },
];

const marqueeItems = [...reviews, ...reviews];

export default function Reviews() {
  return (
    <section className="relative w-full overflow-hidden border-t border-brass/10 bg-cream py-24 md:py-32">
      <div className="container relative z-20 mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        <Reveal>
          <div className="mb-14 flex flex-col items-center text-center">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              Avis Google
            </span>
            <h2 className="mb-5 font-heading text-4xl leading-tight text-deep-blue md:text-5xl lg:text-6xl">
              Des clients qui reviennent pour le gout
            </h2>
            <div className="flex items-center gap-3 rounded-full border border-brass/25 bg-white/70 px-5 py-3 shadow-sm shadow-charcoal/5">
              <span className="font-heading text-2xl leading-none text-deep-blue">5.0</span>
              <span className="flex gap-0.5" aria-hidden="true">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} size={16} className="fill-brass text-brass" />
                ))}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/55">
                vrais avis
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="group relative flex w-full overflow-hidden py-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent md:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent md:w-48" />

        <div className="flex w-max animate-marquee gap-6 px-4 transition-all duration-300 ease-out hover:[animation-play-state:paused] md:gap-8">
          {marqueeItems.map((item, i) => (
            <article
              key={`${item.name}-${i}`}
              className="flex h-full w-[330px] flex-shrink-0 flex-col justify-between rounded-sm border border-charcoal/5 bg-white p-7 shadow-xl shadow-charcoal/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl md:w-[500px] md:p-9"
            >
              <div>
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-terracotta font-semibold text-cream">
                    {item.name.slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl leading-tight text-deep-blue md:text-2xl">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs text-charcoal/55">{item.meta}</p>
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-2">
                  <span className="flex gap-0.5" aria-label="5 etoiles">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} size={15} className="fill-brass text-brass" />
                    ))}
                  </span>
                  <span className="text-sm text-charcoal/55">{item.date}</span>
                </div>

                <p className="text-sm leading-relaxed text-charcoal/75 md:text-base">
                  {item.text}
                </p>
              </div>

              <span className="mt-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal/40">
                Google review
              </span>
            </article>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-margoum-pattern opacity-5 mix-blend-overlay blur-[100px]" />
    </section>
  );
}
