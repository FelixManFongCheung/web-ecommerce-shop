import Link from "next/link";
import { menuConfig } from "./menuConfig";

export default function Menu() {
  return (
    <div className="w-full h-full bg-white grid-col-1 md:grid-cols-4">
      {/* format */}
      <div className="flex flex-col gap-2">
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/* panel */}
      <div className="flex flex-col gap-2">
        <div></div>
      </div>
      {/* info */}
      <div className="flex flex-col gap-2">
        {menuConfig.info.map((item) => (
          <Link key={`menu-${item.label}`} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
