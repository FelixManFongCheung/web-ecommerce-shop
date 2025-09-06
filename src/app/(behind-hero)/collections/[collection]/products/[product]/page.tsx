// import Checkout from '@/components/checkout';
import { getCartServer } from "@/actions/getCart/server";
import { getPriceId, getProduct, retrievePrice } from "@/actions/stripe";
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
        "flex flex-col h-screen md:flex-row mt-header-height md:pl-desktop-product-page-padding-left md:pr-desktop-product-page-padding-right md:py-[100px] items-center justify-center"
      )}
    >
      <div className={cn("grid grid-cols-6")}>
        {product.images.map((image, index) => (
          <div key={index} className={cn("col-span-2")}>
            <Image fill={true} objectFit="cover" src={image} alt="" />
          </div>
        ))}
      </div>
      <div className={cn("flex flex-col gap-4")}>
        <div>
          <p>{product.name}</p>
          {product.description && <p>{product.description}</p>}
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
