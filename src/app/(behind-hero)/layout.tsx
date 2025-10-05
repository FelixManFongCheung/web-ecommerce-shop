import { getProductsAll } from "@/actions/stripe";
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
import { getRecursiveFolder } from "@/components/desktopLeftNav/hooks";

export default async function BehindHeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const productsAll = await getProductsAll();
  const groups = getRecursiveFolder(productsAll);
  return (
    <CookieWrapper className="relative">
      <Nav />
      <Header />
      <DesktopRightNav />
      <DynamicDesktopLeftNav groups={groups} />
      <div>{children}</div>
      <Footer />
      <CartPopup />
      <FollowUsDialog />
    </CookieWrapper>
  );
}
