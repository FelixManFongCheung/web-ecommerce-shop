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
          "w-[80vw] aspect-[4/3] container px-12! flex flex-col justify-center items-center text-secondary bg-primary rounded-none sm:rounded-none border-none"
        )}
      >
        <DialogHeader>
          <DialogTitle>Follow Us</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            Follow @proxy__archive to get JEAN PAUL GAULTIER the first look at
            our latest arrivals. MIU MI
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Link href="https://www.instagram.com/proxy__archive">
            <Image
              src="/assets/white/insta.png"
              alt="Instagram"
              width={24}
              height={24}
            />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
