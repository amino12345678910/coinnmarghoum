import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import SignatureMenu from "@/components/sections/SignatureMenu";
import Gallery from "@/components/sections/Gallery";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Story />
      <SignatureMenu />
      <Gallery />
    </main>
  );
}
