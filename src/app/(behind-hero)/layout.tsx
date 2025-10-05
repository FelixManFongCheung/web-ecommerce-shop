import {
  CartPopup,
  CookieWrapper,
  DesktopRightNav,
  FollowUsDialog,
  Footer,
  Header,
  Nav,
} from "@/components";
import DynamicDesktopLeftNav from "@/components/desktopLeftNav/DynamicDesktopLeftNav";
import { headers } from "next/headers";

export default async function BehindHeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  return (
    <CookieWrapper className="relative">
      <Nav />
      <Header />
      <DesktopRightNav />
      <DynamicDesktopLeftNav pathname={pathname} />
      <div className="relative z-0">{children}</div>
      <CartPopup />
      <Footer />
      <FollowUsDialog />
    </CookieWrapper>
  );
}
