import { retrieveProductsByMetaDataKeyAndValue } from "@/actions/stripe";
import ProductCard from "@/components/productCard";
import Scaler from "@/components/productCard/Scaler";
import { cn } from "@/lib/cn/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  // category: archive, value: archive
  const products = await retrieveProductsByMetaDataKeyAndValue(
    "mode",
    "archive"
  );

  console.log(products);

  const fakeProducts = [...products];
  fakeProducts.push(...fakeProducts, ...fakeProducts, ...fakeProducts);

  const scrollContainer = "scroll-container";

  return (
    <div
      id={scrollContainer}
      className="relative h-screen w-screen overflow-x-auto flex flex-col justify-center items-start"
    >
      <div className="flex flex-row gap-8">
        <div className="w-[50vw] h-full" />
        {fakeProducts.map((product) => (
          <ProductCard key={product.id} product={product}>
            <Scaler scrollContainer={scrollContainer}>
              <Link
                className={cn("relative block w-32 aspect-[3/4]")}
                href={`/collections/all/products/${product.id}`}
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 60vw, (max-width: 1200px) 50vw, 33vw"
                />
              </Link>
            </Scaler>
          </ProductCard>
        ))}
        <div className="w-[50vw] h-full" />
      </div>
    </div>
  );
}
