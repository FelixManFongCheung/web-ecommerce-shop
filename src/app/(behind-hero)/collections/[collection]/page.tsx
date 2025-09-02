import {
  getProductsAll,
  retrieveProductsByMetaDataKeyAndValue,
} from "@/actions/stripe";
import { ProductCard, ProductCardSkeleton } from "@/components";
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
  return (
    <div className="text-left py-2 px-2 mt-header-height md:pl-desktop-left-nav-width md:pr-desktop-right-nav-width md:py-[100px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
        {products.length > 0 ? (
          products.map((product) => (
            <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
              <ProductCard product={product} />
            </Suspense>
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>
    </div>
  );
}
