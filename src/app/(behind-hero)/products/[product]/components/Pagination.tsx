"use client";

import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Pagination({
  productImageUrls,
}: {
  productImageUrls: string[];
}) {
  const [page, setPage] = useState(0);
  const pageCount = productImageUrls.length;
  return (
    <>
      {productImageUrls.map((image, index) => (
        <div
          key={index}
          className={cn(
            "relative w-full max-w-md aspect-[3/4] mx-auto",
            {
              hidden: index !== page,
            },
            "transition duration-300 ease-in-out"
          )}
        >
          <Image
            fill
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 30vw, 25vw"
            placeholder="blur"
            blurDataURL={image ?? ""}
            src={image ?? ""}
            alt="product image"
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}

      <div className="flex flex-row items-center justify-center gap-2">
        <div
          onClick={() => setPage(page - 1)}
          className={cn(
            "flex items-center justify-center",
            {
              "opacity-50 cursor-not-allowed pointer-events-none": page === 0,
            },
            "mr-10"
          )}
        >
          <ChevronLeftIcon className="w-8 h-8" />
        </div>
        {Array.from({ length: pageCount }).map((_, index) => (
          <div
            className="flex items-center justify-center"
            key={index}
            onClick={() => setPage(index)}
          >
            <div
              className={cn(
                "w-8 h-[1px] bg-primary transition duration-300 ease-in-out"
              )}
              style={{
                height: index === page ? "4px" : "1px",
              }}
            ></div>
          </div>
        ))}
        <div
          onClick={() => setPage(page + 1)}
          className={cn(
            "flex items-center justify-center",
            {
              "opacity-50 cursor-not-allowed pointer-events-none":
                page === pageCount - 1,
            },
            "ml-10"
          )}
        >
          <ChevronRightIcon className="w-8 h-8" />
        </div>
      </div>
    </>
  );
}
