import { Footer, Header, Nav } from "@/components";

export default function BehindHeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10">
      <Nav />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
