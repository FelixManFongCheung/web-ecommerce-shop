import DesktopLeftNav from "@/components/desktopLeftNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col p-4 gap-4 h-screen md:flex-row md:mt-header-height mt-header-height-mobile md:pl-desktop-info-pages-padding-left md:pr-desktop-info-pages-padding-right md:py-[100px]">
      <DesktopLeftNav headerName="Confirmation"></DesktopLeftNav>
      {children}
    </div>
  );
}
