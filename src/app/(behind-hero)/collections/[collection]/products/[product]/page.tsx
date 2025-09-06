// import Checkout from '@/components/checkout';
import { getCartServer } from "@/actions/getCart/server";
import { getPriceId, getProduct, retrievePrice } from "@/actions/stripe";
import ATC from "@/components/atc";
import { cn } from "@/lib/cn/utils";
import { cookies } from "next/headers";
import Image from "next/image";
import { ProductPageMetaData } from "./type";

export default async function Page(props: {
  params: Promise<{ product: string }>;
}) {
  const params = await props.params;
  const userCookies = (await cookies()).get("cart")?.value;
  let isATC: boolean = false;
  if (userCookies) {
    const cartItems = await getCartServer(userCookies);
    isATC = cartItems.products?.includes(params.product) || false;
  }

  const product = await getProduct(params.product);
  const priceID = await getPriceId(product.id);
  const price = await retrievePrice(priceID);
  const productMetadata: ProductPageMetaData = product.metadata;
  const measurements = [
    { key: "size", value: productMetadata.size },
    { key: "chest", value: productMetadata.chest },
    { key: "length", value: productMetadata.length },
    { key: "sleeve_length", value: productMetadata.sleeve_length },
  ].filter((measurement) => measurement.value !== "");

  const condition = productMetadata.condition ?? "";
  const composition = productMetadata.composition ?? "";

  return (
    <div
      className={cn(
        "flex flex-col gap-4 h-screen md:flex-row md:mt-header-height mt-header-height-mobile md:pl-desktop-product-page-padding-left md:pr-desktop-product-page-padding-right md:py-[100px] items-center justify-center"
      )}
    >
      <div className={cn("relative w-full max-w-md aspect-[3/4]")}>
        {product.images.map((image, index) => (
          <div key={index} className={cn("relative w-full h-full")}>
            <Image
              fill
              sizes="(max-width: 768px) 80vw, (max-width: 1200px) 30vw, 25vw"
              placeholder="blur"
              blurDataURL={image}
              src={image}
              alt="product image"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
      <div className={cn("flex flex-col gap-4 items-start pr-4")}>
        <div>
          <p>{product.name}</p>
          {product.description && <p>{product.description}</p>}
        </div>
        <div>
          <ATC productId={product.id} isATC={isATC} />
        </div>
        <div>
          <p>Measurements</p>
          {measurements.length > 0 &&
            measurements.map((measurement) => (
              <div key={measurement.key}>
                <p>{measurement.key}</p>
                <div>{measurement.value}</div>
              </div>
            ))}
        </div>
        <div>
          <p>Condition</p>
          {condition && <p>{condition}</p>}
        </div>
        <div>
          <p>Composition</p>
          {composition && <p>{composition}</p>}
        </div>
      </div>
    </div>
  );
}
