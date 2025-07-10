import { getPriceId, retrievePrice } from "@/utils/stripe";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

async function ProductCard({
  product,
  collection,
}: {
  product: Stripe.Product;
  collection?: string;
}) {
  const priceId = await getPriceId(product.id);
  const price = await retrievePrice(priceId);

  let imageUrls = product.images;
  imageUrls = imageUrls.length < 2 ? Array(2).fill(imageUrls[0]) : imageUrls;

  return (
    <div className="relative w-full h-full">
      <Link
        className="relative block w-full aspect-[3/4]"
        href={`/collections/${collection || "all"}/products/${product.id}`}
      >
        <Image
          className=""
          src={imageUrls[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 60vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      <div className="product-info">
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
