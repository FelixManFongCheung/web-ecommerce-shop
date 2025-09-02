import {
  DesktopLeftNav,
  DesktopRightNav,
  Footer,
  Header,
  Nav,
} from "@/components";
import { headers } from "next/headers";

export default async function BehindHeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  return (
    <div className="relative z-10">
      <Nav />
      <DesktopLeftNav pathName={pathname || ""} />
      <DesktopRightNav />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
