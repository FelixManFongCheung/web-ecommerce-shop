import { getPriceId, retrievePrice } from "@/actions/stripe";
import { cn } from "@/lib/cn/utils";
import Stripe from "stripe";

async function ProductCard({
  product,
  children,
  className,
  noInfo = false,
}: {
  product: Stripe.Product;
  children?: React.ReactNode;
  className?: string;
  noInfo?: boolean;
}) {
  const priceId = await getPriceId(product.id);
  const price = await retrievePrice(priceId);

  return (
    <div className={cn("relative w-auto h-full", className)}>
      {children}
      {!noInfo && (
        <div className="product-info text-center mt-2">
          <div className="name">{product.name}</div>
          <div className="brief">{product.metadata.brief}</div>
          {product.active ? (
            <div className="price">{price?.amount} {price?.currency.toUpperCase()}</div>
          ) : (
            <div className="price">sold out</div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductCard;
