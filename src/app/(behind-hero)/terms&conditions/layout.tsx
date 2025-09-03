import DesktopLeftNav from "@/components/desktopLeftNav";
import {
  HORIZONTAL_LINE_OFFSET_Y_LEFT,
  VERTICAL_LINE_OFFSET_X_LEFT,
} from "@/lib/constants";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DesktopLeftNav headerName="T&C">
        <div
          className="absolute flex flex-col text-2xl"
          style={{
            left: `${VERTICAL_LINE_OFFSET_X_LEFT * 2}rem`,
            top: `${HORIZONTAL_LINE_OFFSET_Y_LEFT * 1.5}rem`,
          }}
        >
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
