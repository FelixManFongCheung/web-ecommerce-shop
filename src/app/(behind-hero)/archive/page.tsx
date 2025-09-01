import { retrieveProductsByMetaDataKeyAndValue } from "@/actions/stripe";
import ProductCard from "@/components/productCard";

export default async function Page() {
  // category: archive, value: archive
  const products = await retrieveProductsByMetaDataKeyAndValue(
    "mode",
    "archive"
  );
  console.log(products);
  return (
    <section>
      <div className="relative h-full overflow-x-auto">
        <div className="flex flex-row gap-4 w-fit">
          {products.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
