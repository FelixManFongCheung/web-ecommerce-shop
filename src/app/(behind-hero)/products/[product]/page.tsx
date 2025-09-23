// import Checkout from '@/components/checkout';
import { getAllProductImages } from "@/actions/getAllProductImages";
import { getPlaceholderImage } from "@/actions/placeholder";
import { getPriceId, getProduct, retrievePrice } from "@/actions/stripe";
import { Gallery, Pagination } from "@/components";
import ATC from "@/components/atc";
import { cn } from "@/lib/cn/utils";
import { ProductPageMetaData } from "./type";

export default async function Page(props: {
  params: Promise<{ product: string }>;
}) {
  const params = await props.params;
  const productId = params.product;
  // TODO: remember to always store all of teh images including the thumbnail on supabase s3
  const images = await getAllProductImages(productId);
  const productImageWithPlaceholders = await Promise.all(
    images.map(async (imageUrl) => {
      const placeholder = await getPlaceholderImage(imageUrl);
      return { imageUrl, placeholder };
    })
  );
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
        "flex flex-col w-full gap-8 min-h-screen h-fit md:flex-row justify-center md:pt-8 pt-0"
      )}
    >
      <div className={cn("relative md:w-[50%] w-full")}>
        <Pagination productImageUrls={productImageWithPlaceholders} />
        <Gallery productImageUrls={productImageWithPlaceholders} />
      </div>
      <div
        className={cn("flex flex-col md:w-[50%] w-full gap-4 items-start pr-4")}
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
