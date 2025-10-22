"use client";

import { cn } from "@/lib/cn/utils";
import { useAppActions, useIsOpen } from "@/stores/appStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { menuConfig } from "../menu/menuConfig";

export default function Nav() {
  const isOpen = useIsOpen();
  const { toggleOpen } = useAppActions();
  const pathname = usePathname();

  const handlNavOpen = () => {
    toggleOpen();
    document.body.classList.add("nav-open");
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("nav-open");
    };
  }, []);

  return (
    <>
      <div
        className={cn(
          "block opacity-0 fixed mt-header-height-mobile inset-0 w-full h-screen overflow-hidden transition-opacity duration-500 ease-in-out z-20 pointer-events-none",
          isOpen && "opacity-100 pointer-events-auto",
          "md:hidden",
          "nav-open:z-20"
        )}
      >
        <div
          className={cn(
            "fixed inset-0 w-full h-screen transition-colors duration-500 ease-in-out"
          )}
          onClick={handlNavOpen}
        ></div>
        <div
          className={cn(
            "fixed bg-primary left-[50%] translate-x-[-50%] py-5 px-6 w-full h-96 flex flex-col gap-5 transition-all duration-500 ease-in-out overflow-y-auto",
            isOpen ? "block" : "hidden pointer-events-none"
          )}
        >
          {/* <Icon
            className={cn(
              "md:h-header-height h-header-height-mobile mx-auto justify-center text-secondary"
            )}
          /> */}
          <div className="flex flex-col gap-5 justify-center">
            <div className="flex flex-col gap-2 mb-8">
              {menuConfig.shops.map((item) => (
                <Link
                  onClick={handlNavOpen}
                  key={`menu-${item.label}`}
                  href={item.href}
                  className={cn(
                    pathname === item.href &&
                      "underline decoration-secondary decoration-[2px] underline-offset-2"
                  )}
                >
                  <h3 className="text-[2rem] text-secondary truncate">
                    {item.label}
                  </h3>
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {menuConfig.info.map((item) => (
                <Link
                  onClick={handlNavOpen}
                  key={`menu-${item.label}`}
                  href={item.href}
                  className={cn(
                    pathname === item.href &&
                      "underline decoration-secondary decoration-[2px] underline-offset-2"
                  )}
                >
                  <h3 className="text-[2rem] text-secondary truncate">
                    {item.label}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[10vh] w-full hidden"></div>
    </>
  );
}
