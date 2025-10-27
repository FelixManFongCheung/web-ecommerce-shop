import { retrieveProductsByMetaDataKeyAndValue } from "@/actions/stripe";
import InfiniteCarousel from "@/components/infiniteCarousel";
import ProductCard from "@/components/productCard";
import Scaler from "@/components/productCard/Scaler";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  // category: archive, value: archive
  const products = await retrieveProductsByMetaDataKeyAndValue(
    "mode",
    "archive"
  );

  const scrollContainer = "scroll-container";

  const infiniteProducts = [...products, ...products, ...products];

  const ProductItem = ({
    product,
    index,
  }: {
    product: (typeof products)[number];
    index: number;
  }) => (
    <ProductCard key={`${product.id}-${index}`} product={product}>
      <Scaler scrollContainer={scrollContainer}>
        <Link
          className={cn(
            "relative block w-32 aspect-[3/4] before:content-[''] before:absolute before:inset-0 before:border-2 before:border-t-primary before:border-transparent before:rounded-full before:w-8 before:h-8 before:m-auto before:animate-spin before:z-0"
          )}
          href={`/products/${product.id}`}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            placeholder="blur"
            blurDataURL={`/_next/image?url=${product.images[0]}&w=16&q=1`}
            loading="lazy"
            fill
            sizes="(max-width: 768px) 60vw, (max-width: 1200px) 50vw, 25vw"
            className="relative z-10"
          />
          {!product.active && (
            <Image
              src="/assets/normal/x.png"
              alt={product.name}
              placeholder="blur"
              blurDataURL={`/_next/image?url=${product.images[0]}&w=16&q=1`}
              loading="lazy"
              fill
              sizes="(max-width: 768px) 60vw, (max-width: 1200px) 50vw, 33vw"
              className="absolute top-0 left-0"
            />
          )}
        </Link>
      </Scaler>
    </ProductCard>
  );

  return (
    <>
      <InfiniteCarousel scrollContainer={scrollContainer}>
        <div className="flex flex-row gap-10">
          {infiniteProducts.length > 0 ? (infiniteProducts.map((product, index) => (
            <ProductItem
              key={`${product.id}-${index}`}
              product={product}
              index={index}
            />
          ))): (
            <div className="flex flex-col gap-4 min-h-[500px] justify-center items-center">
              <div>No archive</div>
              <Button
                variant="outline"
                className={cn(
                  "w-2xs bg-transparent border-primary text-primary rounded-none"
                )}
              >
                <Link href="/collections/all">View all</Link>
              </Button>
            </div>
          )}
        </div>
      </InfiniteCarousel>
      <div className="md:hidden block">
        <div className="grid grid-cols-3 gap-1 auto-rows-max">
          {products.map((product) => (
            <ProductCard noInfo={true} key={product.id} product={product}>
              <Link
                className={cn(
                  "relative block w-full aspect-[3/4] before:content-[''] before:absolute before:inset-0 before:border-2 before:border-t-primary before:border-transparent before:rounded-full before:w-8 before:h-8 before:m-auto before:animate-spin before:z-0"
                )}
                href={`/products/${product.id}`}
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  placeholder="blur"
                  blurDataURL={`/_next/image?url=${product.images[0]}&w=16&q=1`}
                  loading="lazy"
                  fill
                  className="relative z-10"
                />
                {!product.active && (
                  <Image src="/assets/normal/x.png" alt={product.name} fill />
                )}
              </Link>
            </ProductCard>
          ))}
        </div>
      </div>
    </>
  );
}
