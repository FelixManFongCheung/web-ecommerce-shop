import { retrieveProductsByMetaDataKeyAndValue } from "@/actions/stripe";
import ProductCard from "@/components/productCard";

export default async function Page() {
  // category: archive, value: archive
  const products = await retrieveProductsByMetaDataKeyAndValue(
    "mode",
    "archive"
  );

  console.log(products);

  const fakeProducts = [...products];
  fakeProducts.push(...fakeProducts, ...fakeProducts, ...fakeProducts);

  return (
    <div className="relative h-screen w-screen overflow-x-auto flex flex-col justify-center items-center">
      <div className="flex flex-row gap-4 w-fit">
        {fakeProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="md:w-[250px]"
          />
        ))}
      </div>
    </div>
  );
}
