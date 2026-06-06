export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream relative w-full overflow-hidden">
      {/* Top faint Margoum pattern band */}
      <div className="w-full h-12 bg-margoum-pattern opacity-10 mix-blend-overlay border-t border-b border-white/5" />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Logo / Mark */}
          <div className="flex flex-col items-start gap-6">
            <h2 className="font-heading text-3xl text-white tracking-tight">Coin<br/>Margoum.</h2>
            <p className="text-sm text-cream/60 font-light leading-relaxed max-w-xs">
              Où la saveur tunisienne se tisse.<br/>
              Un voyage culinaire authentique au cœur de La Marsa.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-semibold tracking-widest text-brass uppercase">Navigation</h4>
            <ul className="flex flex-col gap-3 text-sm text-cream/70 font-light">
              <li><a href="#menu" className="hover:text-white transition-colors">Notre Carte</a></li>
              <li><a href="#histoire" className="hover:text-white transition-colors">Histoire</a></li>
              <li><a href="#galerie" className="hover:text-white transition-colors">Galerie</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Réservation</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-semibold tracking-widest text-brass uppercase">Réseaux</h4>
            <ul className="flex flex-col gap-3 text-sm text-cream/70 font-light">
              <li><a href="#" className="hover:text-terracotta transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">TripAdvisor</a></li>
            </ul>
          </div>

          {/* Language Switcher */}
          <div className="flex flex-col gap-6 lg:items-end">
            <h4 className="text-xs font-semibold tracking-widest text-brass uppercase">Langues</h4>
            <div className="flex gap-4 text-sm font-medium">
              <button className="text-white border-b border-white pb-1">FR</button>
              <button className="text-cream/50 hover:text-white transition-colors">EN</button>
              <button className="text-cream/50 hover:text-white transition-colors">عربي</button>
            </div>
          </div>

        </div>

        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/40 font-light">
          <p>© {new Date().getFullYear()} Coin Margoum. Tous droits réservés.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-cream">Mentions Légales</a>
            <a href="#" className="hover:text-cream">Politique de Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
