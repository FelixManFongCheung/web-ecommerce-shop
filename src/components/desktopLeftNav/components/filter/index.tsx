import { getProductsAll } from "@/actions/stripe";
import { metaDataKey } from "@/data";
import { cn } from "@/lib/cn/utils";
import {
  HORIZONTAL_LINE_OFFSET_Y_RIGHT,
  VERTICAL_LINE_OFFSET_X_RIGHT,
} from "@/lib/constants";
import { NestedGroup } from "./nestedGroup";

export interface Group {
  [key: string]: object | Group;
}

export default async function Filter() {
  const groups: Group = {};
  const productsAll = await getProductsAll();

  const placementRecursive = (obj: Group, key: string, value: string[]) => {
    if (value.length === 0) {
      if (obj[key]) return;
      obj[key] = {};
    } else {
      obj[key] = { ...obj[key] } as Group;
      placementRecursive(obj[key] as Group, value[0], value.slice(1));
    }
  };

  // TODO: rigid structure for metadatakey???? or flexible????
  productsAll.forEach((product) => {
    if (metaDataKey.every((key) => product.metadata[key])) {
      metaDataKey.forEach((key) => {
        if (/-/.test(product.metadata[key])) {
          const linkArray = product.metadata[key].split("-");
          placementRecursive(groups, key, linkArray);
        } else {
          placementRecursive(groups, key, [product.metadata[key]]);
        }
      });
    }
  });

  return (
    <div
      className={cn("absolute flex flex-col justify-center items-start gap-2")}
      style={{
        top: `${HORIZONTAL_LINE_OFFSET_Y_RIGHT + 1}rem`,
        left: `${VERTICAL_LINE_OFFSET_X_RIGHT * 2}rem`,
      }}
    >
      <NestedGroup group={groups} />
    </div>
  );
}
