"use client";

import Image from "next/image";
import { useState } from "react";

export default function Gallery({
  productImageUrls,
}: {
  productImageUrls: string[];
}) {
  const [thumbnail, setThumbnail] = useState(productImageUrls[0]);
  const rest = productImageUrls.filter((imageUrl) => imageUrl !== thumbnail);
  return (
    <div className="hidden md:flex flex-col gap-2">
      <div className="relative w-full aspect-[3/4]">
        <Image
          fill
          // placeholder="blur"
          src={thumbnail ?? ""}
          alt="product image"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-row gap-2">
        {rest.map((imageUrl, index) => (
          <div
            key={index}
            className="relative w-1/3 aspect-[3/4] cursor-pointer"
            onClick={() => setThumbnail(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt="product image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
