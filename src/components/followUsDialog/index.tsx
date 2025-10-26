"use client";

import { cn } from "@/lib/cn/utils";
import { Dialog } from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const COOKIE_NAME = "followUsDialogShown";
const COOKIE_EXPIRY_DAYS = 1; // 24 hours

export default function FollowUsDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if cookie exists
    const cookieValue = getCookie(COOKIE_NAME);
    
    // Only show dialog if cookie doesn't exist (i.e., user hasn't seen it recently)
    if (!cookieValue) {
      setOpen(true);
    }
  }, []);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    
    // When dialog is closed, set cookie with expiry date
    if (!isOpen) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
      
      setCookie(COOKIE_NAME, "true", {
        expires: expiryDate,
        sameSite: "lax",
      });
    }
  };

  // Don't render anything if dialog shouldn't be shown
  if (!open) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "w-[80vw] md:w-[30vw] max-w-4xl container px-12! flex flex-col justify-center items-center text-secondary bg-primary rounded-none sm:rounded-none border-none pt-10 pb-0"
        )}
      >
        <DialogHeader className="mb-4">
          <DialogTitle className="text-[2rem]">FOLLOW US</DialogTitle>
        </DialogHeader>
        <div className="mb-4 text-center">
          <p className="text-sm">
            Follow @proxy.archive on Instagram to get the first look at our
            newest stock.
          </p>
        </div>
        <div className="mb-4">
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
