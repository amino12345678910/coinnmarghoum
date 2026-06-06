import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      {/* Spacer for scroll testing */}
      <div className="h-[100vh] bg-cream" />
    </main>
  );
}
