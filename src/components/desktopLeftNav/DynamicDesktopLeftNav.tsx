import { cn } from "@/lib/cn/utils";
import {
  HORIZONTAL_LINE_OFFSET_Y_LEFT,
  VERTICAL_LINE_OFFSET_X_LEFT,
} from "@/lib/constants";
import Link from "next/link";
import DesktopLeftNav from ".";

export default async function DynamicDesktopLeftNav({
  pathname,
}: {
  pathname: string;
}) {
  const headerName = pathname.split("/")[1];

  if (headerName === "collections") {
    return <DesktopLeftNav headerName="Shop" hasFilter={true} />;
  }

  if (headerName === "products") {
    return (
      <DesktopLeftNav headerName="Shop" isProductPage={true} hasFilter={true} />
    );
  }

  if (
    headerName === "about" ||
    headerName === "visit-us" ||
    headerName === "terms-and-conditions"
  ) {
    const links = {
      "/about": "About",
      "/visit-us": "Visit Us",
      "/terms-and-conditions": "Terms&Conditions",
    };
    return (
      <DesktopLeftNav headerName={headerName}>
        <div
          className="absolute flex flex-col text-2xl"
          style={{
            left: `${VERTICAL_LINE_OFFSET_X_LEFT * 2}rem`,
            top: `${HORIZONTAL_LINE_OFFSET_Y_LEFT * 1.5}rem`,
          }}
        >
          {Object.entries(links).map(([href, label]) => (
            <Link
              href={href}
              key={href}
              className={cn(href === pathname ? "underline" : "")}
            >
              {label}
            </Link>
          ))}
        </div>
      </DesktopLeftNav>
    );
  }

  if (headerName === "new-arrivals") {
    return <DesktopLeftNav headerName="New Arrivals" />;
  }

  if (headerName === "archive") {
    return <DesktopLeftNav headerName="Archive" />;
  }

  if (headerName === "return") {
    return <DesktopLeftNav headerName="Confirmation" />;
  }

  return <DesktopLeftNav headerName={headerName} />;
}
