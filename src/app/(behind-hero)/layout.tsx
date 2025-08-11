import {
  DesktopLeftNav,
  DesktopRightNav,
  Footer,
  Header,
  Nav,
} from "@/components";

export default function BehindHeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10">
      <Nav />
      <DesktopLeftNav />
      <DesktopRightNav />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
