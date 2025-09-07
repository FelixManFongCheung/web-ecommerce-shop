import { searchProducts } from "@/actions/stripe";
import { ProductCard, ProductCardSkeleton } from "@/components";
import { cn } from "@/lib/cn/utils";
import Image from "next/image";
import Link from "next/link";
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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 auto-rows-max">
        {products.products && products.products.length > 0 ? (
          products.products.map((product) => (
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
    </section>
  );
}
