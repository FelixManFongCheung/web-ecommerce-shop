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
          "w-[80vw] max-w-4xl aspect-[3/2] container px-12! flex flex-col justify-center items-center text-secondary bg-primary rounded-none sm:rounded-none border-none"
        )}
      >
        <DialogHeader>
          <DialogTitle>Follow Us</DialogTitle>
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
        {/* Image container - 80% of dialog width */}
        <Link
          href="https://www.instagram.com/proxy__archive"
          className="block w-full aspect-[1.48] mt-4"
        >
          <div className="relative w-full h-full">
            <Image
              src="/assets/popup.png"
              alt="Instagram"
              fill
              className="object-cover"
              priority
            />
          </div>
        </Link>
      </DialogContent>
    </Dialog>
  );
}
