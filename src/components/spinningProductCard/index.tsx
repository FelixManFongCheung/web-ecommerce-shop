import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

export default function SpinningProductCard({
  product,
}: {
  product: Stripe.Product;
}) {
  let imageUrls = product.images;
  imageUrls = imageUrls.length < 2 ? Array(2).fill(imageUrls[0]) : imageUrls;

  return (
    <div className={"perspective-box"}>
      <div>
        <Link
          scroll={true}
          className={"image-wrapper"}
          href={`/products/${product.id}`}
        >
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className={index === 0 ? "test-front" : "test-back"}
            >
              <div>
                <Image fill src={url} alt="" />
              </div>
            </div>
          ))}
        </Link>
      </div>
    </div>
  );
}
