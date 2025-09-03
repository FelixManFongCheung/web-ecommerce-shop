import { metaDataKey } from "@/data";
import { Stripe } from "stripe";
import { Group } from "../components/filter";

export const getRecursiveFolder = (productsAll: Stripe.Product[]): Group => {
  const groups: Group = {};
  const placementRecursive = (obj: Group, key: string, value: string[]) => {
    if (value.length === 0) {
      if (obj[key]) return;
      obj[key] = {};
    } else {
      obj[key] = { ...obj[key] } as Group;
      placementRecursive(obj[key] as Group, value[0], value.slice(1));
    }
  };
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
  return groups;
};
