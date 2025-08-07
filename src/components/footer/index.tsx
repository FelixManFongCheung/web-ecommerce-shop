import { Icon } from "@/components";
import { Instagram, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="container mx-auto flex justify-between bottom-0 h-fit w-full pb-10 bg-white">
      <div className="flex flex-col gap-4 w-[200px]">
        <Icon />
        <Link className="flex flex-row gap-2" href="/">
          <Mail />
          <span>info@proxyarchive.com</span>
        </Link>
        <Link className="flex flex-row gap-2" href="/">
          <Instagram />
          <span>@proxy__archive</span>
        </Link>
      </div>
      <div className="flex flex-col gap-4 w-[200px]">
        <span className="text-primary text-right text-wrap">
          JOIN THE PROXY PAPER Sign up for exclusive restock updates, pre-sale
          access, and curated promotions.
        </span>
        <input
          type="email"
          placeholder="enter your email address here"
          className="w-full border-2 border-primary p-1"
        />
        <button className="bg-primary text-white max-w-fit p-1 self-end">
          SUBSCRIBE
        </button>
      </div>
    </div>
  );
}
