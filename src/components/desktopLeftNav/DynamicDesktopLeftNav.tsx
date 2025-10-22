"use client";

import { cn } from "@/lib/cn/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DesktopLeftNav from ".";
import { Group } from "../desktopLeftNav/components/filter";

export default function DynamicDesktopLeftNav({ groups }: { groups: Group }) {
  const pathname = usePathname();
  const headerName = pathname.split("/")[1];

  if (headerName === "collections") {
    return (
      <DesktopLeftNav headerName="Shop" hasFilter={true} groups={groups} />
    );
  }

  if (headerName === "products") {
    return (
      <DesktopLeftNav
        headerName="Shop"
        isProductPage={true}
        hasFilter={true}
        groups={groups}
      />
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

    let titleName = "";
    switch (headerName) {
      case "about":
        titleName = "About";
        break;
      case "visit-us":
        titleName = "Visit Us";
        break;
      case "terms-and-conditions":
        titleName = "Terms&Conditions";
        break;
      default:
        titleName = headerName;
        break;
    }
    return (
      <DesktopLeftNav headerName={titleName} groups={groups}>
        <div
          className="absolute flex flex-col text-2xl"
          style={{
            left: "var(--desktop-left-nav-info-left)",
            top: "var(--desktop-left-nav-info-top)",
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
    return <DesktopLeftNav headerName="New Arrivals" groups={groups} />;
  }

  if (headerName === "archive") {
    return <DesktopLeftNav headerName="Archive" groups={groups} />;
  }

  if (headerName === "return") {
    return <DesktopLeftNav headerName="Confirmation" groups={groups} />;
  }

  return <DesktopLeftNav headerName={headerName} groups={groups} />;
}
