import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de Coin Margoum.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-cream text-charcoal min-h-screen px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brass">
          Coin Margoum
        </p>
        <h1 className="font-heading text-4xl md:text-5xl text-deep-blue mb-8">
          Politique de confidentialité
        </h1>

        <div className="space-y-8 text-charcoal/80 leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-3">Données de réservation</h2>
            <p>
              Les informations envoyées via le formulaire de réservation sont utilisées uniquement pour
              traiter et confirmer votre demande de table.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-3">Concierge virtuel</h2>
            <p>
              Les messages envoyés au concierge virtuel peuvent être transmis à un prestataire d&apos;IA afin
              de générer une réponse. N&apos;envoyez pas d&apos;informations sensibles dans cette conversation.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-3">Services tiers</h2>
            <p>
              Le site peut charger une carte Google Maps et des services Netlify nécessaires à
              l&apos;hébergement, aux formulaires et aux fonctions serveur.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-charcoal mb-3">Contact</h2>
            <p>
              Pour toute demande concernant vos données, contactez {siteConfig.name} à l&apos;adresse
              du restaurant : {siteConfig.address.street}, {siteConfig.address.city}.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
