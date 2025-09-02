import DesktopLeftNav from "@/components/desktopLeftNav";
import Filter from "@/components/desktopLeftNav/components/filter";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DesktopLeftNav headerName="Shop">
        <Filter />
      </DesktopLeftNav>
      {children}
    </div>
  );
}
