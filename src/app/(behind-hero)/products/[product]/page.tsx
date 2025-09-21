// import Checkout from '@/components/checkout';
import { getAllProductImages } from "@/actions/getAllProductImages";
import { getPriceId, getProduct, retrievePrice } from "@/actions/stripe";
import ATC from "@/components/atc";
import { cn } from "@/lib/cn/utils";
import Pagination from "./components/Pagination";
import { ProductPageMetaData } from "./type";

export default async function Page(props: {
  params: Promise<{ product: string }>;
}) {
  const params = await props.params;
  const productId = params.product;
  // TODO: remember to always store all of teh images including the thumbnail on supabase s3
  const images = await getAllProductImages(productId);
  const product = await getProduct(productId);
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
        "flex flex-col gap-4 min-h-screen h-fit md:flex-row md:mt-header-height mt-header-height-mobile md:pl-desktop-product-page-padding-left md:pr-desktop-product-page-padding-right md:py-[100px] items-center justify-center"
      )}
    >
      <div className={cn("relative w-full")}>
        <Pagination productImageUrls={images} />
      </div>
      <div
        className={cn("flex flex-col w-full md:w-auto gap-4 items-start pr-4")}
      >
        <div className="w-full">
          <p>{product.name}</p>
          {product.description && <p>{product.description}</p>}
        </div>
        {product && (
          <div className="w-full text-right">
            <p className="text-bold">{price?.amount}</p>
          </div>
        )}
        <div className="w-full">
          <ATC productId={productId} isSoldOut={!product.active} />
        </div>
        <div className="w-full">
          <p>Measurements</p>
          {measurements.length > 0 &&
            measurements.map((measurement) => (
              <div key={measurement.key}>
                <p>{measurement.key}</p>
                <div>{measurement.value}</div>
              </div>
            ))}
        </div>
        <div className="w-full">
          <p>Condition</p>
          {condition && <p>{condition}</p>}
        </div>
        <div className="w-full">
          <p>Composition</p>
          {composition && <p>{composition}</p>}
        </div>
      </div>
    </div>
  );
}
