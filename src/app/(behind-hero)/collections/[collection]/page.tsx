import { Filter, ProductCard, ProductCardSkeleton } from "@/components";
import {
  getProductsAll,
  retrieveProductsByMetaDataKeyAndValue,
} from "@/utils/stripe";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const allProducts = await getProductsAll();

  // Early return if no products
  if (!allProducts) {
    return (
      <section className="text-left py-2 px-2 md:py-[100px] md:px-[200px]">
        <div>No products found</div>
      </section>
    );
  }

  // Process filters
  const filters = allProducts.reduce((acc, product) => {
    Object.entries(product.metadata).forEach(([key, value]) => {
      if (!acc[key]) {
        acc[key] = new Set();
      }
      acc[key].add(value);
    });
    return acc;
  }, {} as Record<string, Set<string>>);

  const cleanedFilters: Record<string, string[]> = {};
  Object.keys(filters).forEach((key) => {
    cleanedFilters[key] = Array.from(filters[key]);
  });

  // Get filtered products
  const products = searchParams?.collection
    ? (
        await retrieveProductsByMetaDataKeyAndValue(
          "collection",
          searchParams.collection as string
        )
      ).products
    : allProducts;

  if (!products) {
    return (
      <section className="text-left py-2 px-2 md:py-[100px] md:px-[200px]">
        <div>No products found in this collection</div>
      </section>
    );
  }

  return (
    <section className="text-left py-2 px-2 md:py-[100px] md:px-[200px]">
      <Filter filters={cleanedFilters} />
      <br />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 auto-rows-max">
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
    </section>
  );
}
