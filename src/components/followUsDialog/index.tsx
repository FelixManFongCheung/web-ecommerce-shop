"use client";

import { cn } from "@/lib/cn/utils";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DialogHeader } from "../ui/dialog";

export default function FollowUsDialog() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <Dialog open={open}>
      <DialogContent
        className={cn(
          "w-full h-full flex flex-col justify-center items-center text-secondary bg-primary"
        )}
      >
        <DialogHeader>
          <DialogTitle>Follow Us</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Link href="https://www.instagram.com/proxy__archive">
            <Image
              src="/assets/white/insta(w).png"
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
