import DesktopLeftNav from "@/components/desktopLeftNav";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DesktopLeftNav headerName="Visit Us">
        <div className="flex flex-col gap-2">
          <Link href="/about">About</Link>
          <Link href="/visit-us" className="underline">
            Visit Us
          </Link>
          <Link href="/terms-and-conditions">Terms&Conditions</Link>
        </div>
      </DesktopLeftNav>
      {children}
    </div>
  );
}
