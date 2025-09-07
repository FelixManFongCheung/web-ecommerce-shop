import { retrieveProductsByMetaDataKeyAndValue } from "@/actions/stripe";
import { ProductCard, ProductCardSkeleton } from "@/components";
import { cn } from "@/lib/cn/utils";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page() {
  const products = await retrieveProductsByMetaDataKeyAndValue(
    "mode",
    "new-arrivals"
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
      {products.length > 0 ? (
        products.map((product) => (
          <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
            <ProductCard product={product}>
              <Link
                className={cn("relative block w-full aspect-[3/4]")}
                href={`/collections/all/products/${product.id}`}
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 60vw, (max-width: 1200px) 50vw, 33vw"
                />
                {!product.active && (
                  <Image
                    src="/assets/normal/x.png"
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 60vw, (max-width: 1200px) 50vw, 33vw"
                    className="absolute top-0 left-0"
                  />
                )}
              </Link>
            </ProductCard>
          </Suspense>
        ))
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
}
