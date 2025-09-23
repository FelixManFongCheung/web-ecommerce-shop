import { getPlaceholderImage } from "@/actions/placeholder";
import { getProductsAll } from "@/actions/stripe";
import { ProductCard, ProductCardSkeleton } from "@/components";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn/utils";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page() {
  const products = await getProductsAll();
  const newProducts = products.filter((product) => {
    // TODO: change to 2 week or more
    const recentCutoff = dayjs().subtract(2, "week");
    const productCreationDate = new Date(product.created * 1000);
    return dayjs(productCreationDate).isAfter(dayjs(recentCutoff));
  });
  const productImageWithPlaceholders = await Promise.all(
    newProducts.map(async (product) => {
      const placeholder = await getPlaceholderImage(product.images[0]);
      return { ...product, placeholder };
    })
  );

  return (
    <div>
      {newProducts.length > 0 ? (
        <div className="grid grid-col-1 md:grid-cols-3 gap-2 auto-rows-max">
          {productImageWithPlaceholders.map((product) => (
            <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
              <ProductCard product={product} className="mb-6">
                <Link
                  className={cn("relative block w-full aspect-[3/4]")}
                  href={`/products/${product.id}`}
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    placeholder="blur"
                    blurDataURL={product.placeholder.placeholder}
                    loading="lazy"
                    fill
                    sizes="(max-width: 768px) 60vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {!product.active && (
                    <Image
                      src="/assets/normal/x.png"
                      alt={product.name}
                      placeholder="blur"
                      blurDataURL={product.placeholder.placeholder}
                      loading="lazy"
                      fill
                      sizes="(max-width: 768px) 60vw, (max-width: 1200px) 50vw, 33vw"
                      className="absolute top-0 left-0"
                    />
                  )}
                </Link>
              </ProductCard>
            </Suspense>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center">
          <div>No new arrivals</div>
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
  );
}
