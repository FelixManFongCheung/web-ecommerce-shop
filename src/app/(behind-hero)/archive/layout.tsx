import DesktopLeftNav from "@/components/desktopLeftNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DesktopLeftNav headerName="Archive" />
      {children}
    </div>
  );
}
