import { DesktopLeftNav } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DesktopLeftNav headerName="Shop" hasFilter={true} />
      {children}
    </div>
  );
}
