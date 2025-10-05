import {
  CartPopup,
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
      <Header />
      <DesktopRightNav />
      <div className="relative z-0">{children}</div>
      <CartPopup />
      <Footer />
      <FollowUsDialog />
    </CookieWrapper>
  );
}
