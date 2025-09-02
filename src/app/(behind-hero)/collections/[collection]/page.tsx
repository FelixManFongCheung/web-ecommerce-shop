import {
  getProductsAll,
  retrieveProductsByMetaDataKeyAndValue,
} from "@/actions/stripe";
import { ProductCard, ProductCardSkeleton } from "@/components";
import { cn } from "@/lib/cn/utils";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const allProducts = await getProductsAll();

  if (!allProducts) {
    return (
      <section className="text-left py-2 px-2 md:py-[100px] md:px-[200px]">
        <div>No products found</div>
      </section>
    );
  }

  const products =
    collection === "all"
      ? allProducts
      : collection
      ? await retrieveProductsByMetaDataKeyAndValue("collection", collection)
      : allProducts;

  if (!products) {
    return (
      <section className="text-left py-2 px-2 md:py-[100px] md:px-[200px]">
        <div>No products found in this collection</div>
      </section>
    );
  }

  console.log(products);

  return (
    <div className="text-left py-2 px-2 mt-header-height md:pl-desktop-left-nav-width md:pr-desktop-right-nav-width md:py-[100px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
        {products.length > 0 ? (
          products.map((product) => (
            <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
              <ProductCard product={product}>
                <Link
                  className={cn("relative block w-full aspect-[3/4]")}
                  href={`/collections/${collection || "all"}/products/${
                    product.id
                  }`}
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 60vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Link>
              </ProductCard>
            </Suspense>
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>
    </div>
  );
}
