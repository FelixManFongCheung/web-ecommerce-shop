import ModalProductCard from "@/components/modalProductCard";
import { getProductsAll } from "@/utils/stripe";

export default async function Home() {
  // Get a few featured products for the homepage
  const products = await getProductsAll();
  const featuredProducts = products?.slice(0, 6) || [];

  return (
    <section className="h-fit w-full">
      <div className="w-full bg-[#b60b0b] p-8 min-h-auto h-auto">
        {featuredProducts.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-white text-3xl mb-8 text-center">
              Featured Products
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:gap-4">
              {featuredProducts.map((product) => (
                <ModalProductCard
                  key={product.id}
                  product={product}
                  collection="all"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
