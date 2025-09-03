import DesktopLeftNav from "@/components/desktopLeftNav";
import {
  HORIZONTAL_LINE_OFFSET_Y_LEFT,
  VERTICAL_LINE_OFFSET_X_LEFT,
} from "@/lib/constants";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DesktopLeftNav headerName="About">
        <div
          className="absolute flex flex-col gap-2"
          style={{
            left: `${VERTICAL_LINE_OFFSET_X_LEFT * 2}rem`,
            top: `${HORIZONTAL_LINE_OFFSET_Y_LEFT * 2}rem`,
          }}
        >
          <Link href="/about" className="underline">
            About
          </Link>
          <Link href="/visit-us">Visit Us</Link>
          <Link href="/terms-and-conditions">Terms&Conditions</Link>
        </div>
      </DesktopLeftNav>
      {children}
    </div>
  );
}
