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

  const fakeProducts = [...products];
  fakeProducts.push(...fakeProducts, ...fakeProducts, ...fakeProducts);

  const scrollContainer = "scroll-container";

  return (
    <>
      <div
        id={scrollContainer}
        className="relative hidden md:flex h-screen w-screen overflow-x-auto flex-col justify-center items-start"
      >
        <div className="flex flex-row gap-10">
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
              </Scaler>
            </ProductCard>
          ))}
          <div className="w-[50vw] h-full" />
        </div>
      </div>
      <div className="md:hidden block">
        <div className="grid grid-cols-3 gap-2 auto-rows-max">
          {fakeProducts.map((product) => (
            <ProductCard key={product.id} product={product} className="mb-6">
              <Link
                className={cn("relative block w-full aspect-[3/4]")}
                href={`/collections/all/products/${product.id}`}
              >
                <Image src={product.images[0]} alt={product.name} fill />
                {!product.active && (
                  <Image src="/assets/normal/x.png" alt={product.name} fill />
                )}
              </Link>
            </ProductCard>
          ))}
        </div>
      </div>
    </>
  );
}
