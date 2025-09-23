"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageWithPlaceholder {
  imageUrl: string;
  placeholder: { placeholder: string };
}

export default function Gallery({
  productImageUrls,
}: {
  productImageUrls: ProductImageWithPlaceholder[];
}) {
  const [thumbnail, setThumbnail] = useState(productImageUrls[0]);
  const rest = productImageUrls.filter(
    (image) => image.imageUrl !== thumbnail.imageUrl
  );
  return (
    <div className="hidden md:flex flex-col w-full gap-2">
      <div className="relative w-full aspect-[3/4]">
        <Image
          fill
          placeholder="blur"
          src={thumbnail.imageUrl ?? ""}
          blurDataURL={thumbnail.placeholder.placeholder ?? ""}
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
              src={image.imageUrl}
              placeholder="blur"
              blurDataURL={image.placeholder.placeholder}
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
