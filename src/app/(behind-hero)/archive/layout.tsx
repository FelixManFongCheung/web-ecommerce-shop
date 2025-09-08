import DesktopLeftNav from "@/components/desktopLeftNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 md:mt-header-height mt-header-height-mobile md:py-[100px]">
      <DesktopLeftNav headerName="Archive" />
      {children}
    </div>
  );
}
