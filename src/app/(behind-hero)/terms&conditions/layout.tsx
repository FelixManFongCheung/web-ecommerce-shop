import DesktopLeftNav from "@/components/desktopLeftNav";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DesktopLeftNav headerName="T&C">
        <div className="flex flex-col gap-2">
          <Link href="/about">About</Link>
          <Link href="/visit-us">Visit Us</Link>
          <Link href="/terms-and-conditions" className="underline">
            Terms&Conditions
          </Link>
        </div>
      </DesktopLeftNav>
      {children}
    </div>
  );
}
