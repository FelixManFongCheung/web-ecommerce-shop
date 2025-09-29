import { DesktopLeftNav } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-left py-2 px-3 min-h-screen w-full md:mt-header-height mt-header-height-mobile md:pl-desktop-left-nav-width md:pr-desktop-right-nav-width md:py-desktop-collections-padding">
      <DesktopLeftNav headerName="Shop" hasFilter={true} />
      {children}
    </div>
  );
}
