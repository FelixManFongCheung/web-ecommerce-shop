export const dynamic = "force-dynamic";

import { getNavigationGroups } from "@/actions/stripe";
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

export default async function BehindHeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const groups = await getNavigationGroups();
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

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return <div>{children}</div>;
// }
