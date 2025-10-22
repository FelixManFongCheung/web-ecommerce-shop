"use client";

import { cn } from "@/lib/cn/utils";
import { Dialog } from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function FollowUsDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(
          "w-[80vw] max-w-4xl container px-12! flex flex-col justify-center items-center text-secondary bg-primary rounded-none sm:rounded-none border-none pt-10 pb-0"
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-[2rem]">FOLLOW US</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            Follow @proxy.archive on Instagram to get the first look at our
            newest stock.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Image
            src="/assets/white/insta.png"
            alt="Instagram"
            width={24}
            height={24}
          />
        </div>
        <div className="w-full aspect-[4457/3220] mt-4">
          <Link
            href="https://www.instagram.com/proxy__archive"
            className="block w-full h-full"
          >
            <Image
              src="/assets/popup.webp"
              alt="Instagram"
              fill
              className="w-full h-full object-contain"
              priority
            />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
