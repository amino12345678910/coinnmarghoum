import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Coin Margoum.",
};

export default function LegalNoticePage() {
  return (
    <main className="bg-cream text-charcoal min-h-screen px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brass">
          Coin Margoum
        </p>
        <h1 className="font-heading text-4xl md:text-5xl text-deep-blue mb-8">
          Mentions légales
        </h1>

        <div className="space-y-8 text-charcoal/80 leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-3">Éditeur du site</h2>
            <p>
              {siteConfig.name}<br/>
              {siteConfig.address.street}<br/>
              {siteConfig.address.city}, {siteConfig.address.postalCode}, {siteConfig.address.country}
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-3">Hébergement</h2>
            <p>
              Le site est hébergé par Netlify, Inc., 44 Montgomery Street, Suite 300,
              San Francisco, CA 94104, États-Unis.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-3">Propriété intellectuelle</h2>
            <p>
              Les textes, visuels, photographies, éléments graphiques et éléments de marque présents
              sur ce site sont protégés. Toute réutilisation doit faire l&apos;objet d&apos;une autorisation préalable.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
