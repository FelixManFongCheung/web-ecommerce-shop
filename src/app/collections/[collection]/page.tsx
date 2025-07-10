import Filter from "@/components/filter";
import ProductCard from "@/components/productCard";
import ProductCardSkeleton from "@/components/productSkeleton";
import type { collectionType } from "@/utils/stripe";
import { getProductsAll, searchProducts } from "@/utils/stripe";
import { Suspense } from "react";
import Stripe from "stripe";

export default async function Page(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  let products: Stripe.Product[] | undefined = await getProductsAll();

  if (products) {
    const filters = products.reduce((acc, product) => {
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

    if (searchParams) {
      const collection: collectionType = {
        metadataName: "collection",
        metadataQuery: searchParams.collection as string,
      };
      const searchResult = await searchProducts("", collection);
      products = searchResult.products;
    }

    return (
      <section className="text-left py-2 px-2 md:py-[100px] md:px-[200px]">
        <Filter filters={cleanedFilters} />
        <br />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 auto-rows-max">
          {products ? (
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
}
