"use client";

import { Icon } from "@/components";
import { cn } from "@/lib/cn/utils";
import Link from "next/link";
import { PiInstagramLogoLight } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";

export default function Footer() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const response = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
  };
  return (
    // footer z-13
    <div
      className={cn(
        "relative z-11",
        "w-full px-7 flex justify-between items-end h-footer-height pb-2 pt-2"
      )}
    >
      <div className="flex flex-col w-[200px] text-[0.75rem]">
        <Icon className={cn("w-auto mb-4")} fontSize={18} />
        <Link className="flex flex-row items-center gap-2" href="/">
          <TfiEmail className="w-3 h-3" />
          <span>info@proxyarchive.com</span>
        </Link>
        <Link className="flex flex-row items-center gap-2" href="/">
          <PiInstagramLogoLight className="w-3 h-3" />
          <span>@proxy__archive</span>
        </Link>
      </div>
      <div className="flex flex-col gap-2 w-[200px] text-[0.75rem]">
        <p className="text-primary text-right text-wrap">
          JOIN THE PROXY PAPER
        </p>
        {/* <p className="text-primary text-right text-wrap">
          Sign up for exclusive restock updates, pre-sale access, and curated
          promotions.
        </p> */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="enter your email address here"
            className="w-full border-1 border-primary p-1 text-center italic mb-1 placeholder:text-primary"
          />
          <div className="flex w-full justify-end">
            <button
              type="submit"
              className="bg-primary text-white max-w-fit p-1 self-end"
            >
              SUBSCRIBE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
