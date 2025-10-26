import { Suspense } from "react";
import InfiniteCollectionGrid from "@/components/collections/InfiniteCollectionGrid";
import { GridProductSkeletonCards } from "@/components";

export default async function Page({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const decodedCollection = decodeURIComponent(collection);
  const collectionMetaKey = decodedCollection.split("-")[0];
  const collectionMetaValue = decodedCollection.split("-").slice(1).join("-");

  return (
      <Suspense fallback={<GridProductSkeletonCards />}>
        <InfiniteCollectionGrid
          collection={collection}
          collectionMetaKey={collectionMetaKey}
          collectionMetaValue={collectionMetaValue}
        />
      </Suspense>
  );
}
