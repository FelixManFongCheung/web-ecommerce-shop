import { retrieveProductsByMetaDataKeyAndValue } from "@/actions/stripe";
import { ProductCard, ProductCardSkeleton } from "@/components";
import { Suspense } from "react";

export default async function NewArrivalsPage() {
  const products = await retrieveProductsByMetaDataKeyAndValue(
    "mode",
    "new-arrivals"
  );
  return (
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
  );
}
