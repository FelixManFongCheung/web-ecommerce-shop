import { getProductsAll } from "@/actions/stripe";
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
  const decodedCollection = decodeURIComponent(collection);
  const allProducts = await getProductsAll();
  const collectionMetaKey = decodedCollection.split("-")[0];
  const collectionMetaValue = decodedCollection.split("-").slice(1).join("-");

  if (!allProducts) {
    return (
      <section className="text-left px-2 md:py-[100px] md:px-[200px] mt-header-height-mobile md:mt-header-height flex flex-col items-center justify-center">
        <div>No products found</div>
      </section>
    );
  }

  const searchProductsByMetaDataKeyAndValue = async (
    key: string,
    value: string
  ) => {
    return allProducts.filter((product) => {
      const metadataValue = product.metadata[key];
      return metadataValue && metadataValue.includes(value);
    });
  };

  const products =
    collection === "all"
      ? allProducts
      : collection
      ? await searchProductsByMetaDataKeyAndValue(
          collectionMetaKey,
          collectionMetaValue
        )
      : allProducts;

  if (!products) {
    return (
      <section className="text-left px-2 min-h-screen md:py-[100px] md:px-[200px]">
        <div className="text-center mt-header-height-mobile">
          No products found in this collection
        </div>
      </section>
    );
  }

  //TODO: implement infinite scroll with lazy load or virtualisation
  // TODO: implement filter click to collections/[param] by using substring construction with ~ key for substring search with stripe metadata
  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-14 gap-1 auto-rows-max">
          {products.map((product) => (
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
                    blurDataURL={`/_next/image?url=${product.images[0]}&w=16&q=1`}
                    loading="lazy"
                    fill
                    sizes="(max-width: 768px) 60vw, (max-width: 1200px) 50vw, 33vw"
                    className={
                      !product.active
                        ? "opacity-80 hover:opacity-100"
                        : "opacity-100"
                    }
                  />
                </Link>
              </ProductCard>
            </Suspense>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full mt-header-height-mobile md:mt-header-height">
          <div>No products found</div>
        </div>
      )}
    </div>
  );
}
