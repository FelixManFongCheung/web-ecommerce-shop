"use client";

import Image from "next/image";
import { useState } from "react";

export default function Gallery({
  productImageUrls,
}: {
  productImageUrls: string[];
}) {
  const [thumbnail, setThumbnail] = useState(productImageUrls[0]);
  const rest = productImageUrls.filter((image) => image !== thumbnail);
  return (
    <div className="hidden md:flex flex-col w-full gap-2">
      <div className="relative w-full aspect-[3/4]">
        <Image
          fill
          placeholder="blur"
          src={thumbnail ?? ""}
          blurDataURL={`/_next/image?url=${thumbnail ?? ""}&w=16&q=1`}
          alt="product image"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-row gap-2 w-full overflow-x-auto no-scrollbar">
        {rest.map((image, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-1/3 aspect-[3/4] cursor-pointer"
            onClick={() => setThumbnail(image)}
          >
            <Image
              src={image}
              placeholder="blur"
              blurDataURL={`/_next/image?url=${image}&w=16&q=1`}
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
