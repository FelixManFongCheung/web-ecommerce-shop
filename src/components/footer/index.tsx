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
    console.log(data);
  };
  return (
    <div
      className={cn(
        "relative",
        "w-full px-14 flex justify-between items-end h-fit pb-10 pt-20"
      )}
    >
      <div className="flex flex-col w-[200px]">
        <Icon className={cn("w-auto mb-4")} />
        <Link className="flex flex-row items-center gap-2" href="/">
          <TfiEmail className="w-4 h-4" />
          <span>info@proxyarchive.com</span>
        </Link>
        <Link className="flex flex-row items-center gap-2" href="/">
          <PiInstagramLogoLight className="w-4 h-4" />
          <span>@proxy__archive</span>
        </Link>
      </div>
      <div className="flex flex-col gap-4 w-[200px]">
        <span className="text-primary text-right text-wrap">
          JOIN THE PROXY PAPER Sign up for exclusive restock updates, pre-sale
          access, and curated promotions.
        </span>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="enter your email address here"
            className="w-full border-2 border-primary p-1"
          />
          <button
            type="submit"
            className="bg-primary text-white max-w-fit p-1 self-end"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
  );
}
