import { getPriceId, retrievePrice } from "@/actions/stripe";
import Stripe from "stripe";

async function ProductCard({
  product,
  children,
}: {
  product: Stripe.Product;
  children?: React.ReactNode;
}) {
  const priceId = await getPriceId(product.id);
  const price = await retrievePrice(priceId);

  return (
    <div className="relative w-auto h-full">
      {/* <Scaler scrollContainer={scrollContainer}> */}
      {/* </Scaler> */}
      {children}
      <div className="product-info text-center mt-2">
        <div className="name">{product.name}</div>
        <div className="brief">{product.metadata.brief}</div>
        {product.active ? (
          <div className="price">{price?.unit_amount}</div>
        ) : (
          <div className="price">sold out</div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
