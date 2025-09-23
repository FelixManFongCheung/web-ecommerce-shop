"use client";

import { cn } from "@/lib/cn/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface HeroImageProps {
  url: string;
  x: number;
  y: number;
}

export function HeroRandomImageScreen({
  images: initialImages,
}: {
  images: string[];
}) {
  const [images, setImages] = useState<HeroImageProps[]>(
    initialImages.map((image) => ({ url: image, x: 0, y: 0 }))
  );
  const screenRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const screenWidth = screenRef.current?.getBoundingClientRect().width;
  const screenHeight = screenRef.current?.getBoundingClientRect().height;
  const imageWidth = screenWidth && screenWidth > 768 ? "20%" : "35%";
  const screenWidthMargin = screenWidth && screenWidth > 768 ? 90 : 50;
  const screenHeightMargin = screenHeight && screenHeight > 768 ? 90 : 50;

  useEffect(() => {
    const fetchImages = async () => {
      setImages(
        images.map((image) => ({
          url: image.url,
          x: Math.random() * screenWidthMargin,
          y: Math.random() * screenHeightMargin,
        }))
      );
    };
    fetchImages();
  }, [screenWidthMargin, screenHeightMargin, initialImages]);

  return (
    <div ref={screenRef} className="absolute w-screen h-screen">
      <div className="absolute top-0 left-0 w-full h-full">
        {images.map((image) => (
          <div
            key={image.url}
            className={cn("absolute aspect-[3/4]")}
            style={{
              width: imageWidth,
              left: `${image.x}%`,
              top: `${image.y}%`,
            }}
          >
            <Image
              src={image.url}
              placeholder="blur"
              blurDataURL={`/_next/image?url=${image}&w=16&q=1`}
              alt="Hero Random Image"
              onLoad={() => {
                setLoaded(true);
              }}
              style={{
                opacity: loaded ? 1 : 0,
                transition: "opacity 0.3s ease-in-out",
              }}
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
}
