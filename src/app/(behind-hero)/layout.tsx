import {
  DesktopRightNav,
  FollowUsDialog,
  Footer,
  Header,
  Nav,
} from "@/components";

export default async function BehindHeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Nav />
      <DesktopRightNav />
      <Header />
      {children}
      <FollowUsDialog />
      <Footer />
    </div>
  );
}
