import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import SignatureMenu from "@/components/sections/SignatureMenu";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Story />
      <SignatureMenu />
    </main>
  );
}
