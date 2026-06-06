import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="min-h-screen pt-32 px-8 flex flex-col items-center justify-center relative">
      <SectionHeading 
        eyebrow="Fondation Prête" 
        title="Coin Margoum" 
      />
      <p className="mt-6 max-w-lg text-center text-charcoal/80 mb-8">
        La structure de base du projet est en place avec Next.js 14, Tailwind, GSAP, et Lenis.
      </p>
      <div className="flex gap-4 relative z-10">
        <Button variant="primary">Primary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="brass">Brass</Button>
      </div>
    </main>
  );
}
