import {
  CookieWrapper,
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
    <CookieWrapper className="relative">
      <Nav />
      <DesktopRightNav />
      <Header />
      {children}
      <FollowUsDialog />
      <Footer />
    </CookieWrapper>
  );
}
