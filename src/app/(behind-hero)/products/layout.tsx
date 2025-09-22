import { DesktopLeftNav } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-left py-2 px-3 min-h-screen md:mt-header-height mt-header-height-mobile md:pl-desktop-left-nav-width md:pr-desktop-right-nav-width">
      <DesktopLeftNav headerName="Shop" isProductPage={true} hasFilter={true} />
      {children}
    </div>
  );
}
