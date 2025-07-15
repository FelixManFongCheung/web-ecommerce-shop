import { Footer, Header, MobileNav } from "@/components";

export default function BehindHeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10">
      <MobileNav />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
