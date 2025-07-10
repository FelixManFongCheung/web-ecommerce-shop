import { Filter, ProductCard, ProductCardSkeleton } from "@/components";
import { searchProducts } from "@/utils/stripe";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.search || "";

  const products = await searchProducts(search);

  return (
    <section className="text-left py-2 px-2 md:py-[100px] md:px-[200px]">
      <h1>Search Results for &ldquo;{search}&rdquo;</h1>
      <br />
      <Filter filters={{}} />
      <br />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 auto-rows-max">
        {products.products && products.products.length > 0 ? (
          products.products.map((product) => (
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
