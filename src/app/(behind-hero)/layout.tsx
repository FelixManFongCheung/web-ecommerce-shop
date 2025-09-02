import { DesktopRightNav, Footer, Header, Nav } from "@/components";

export default async function BehindHeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10">
      <Nav />
      <DesktopRightNav />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
