import { getProductsAll } from "@/actions/stripe";
import { DecoratorLines, LeftNestedGroup } from "@/components";
import { metaDataKey } from "@/data";
import { cn } from "@/lib/cn/utils";

const DESKTOP_LEFT_NAV_WIDTH = 200;

const VERTICAL_LINE_HEIGHT = 50;
const VERTICAL_LINE_OFFSET_X = 3;
const VERTICAL_LINE_OFFSET_Y = 2;

const HORIZONTAL_LINE_WIDTH = 40;
const HORIZONTAL_LINE_OFFSET_X = 1.5;
const HORIZONTAL_LINE_OFFSET_Y = 8;

export interface Group {
  [key: string]: object | Group;
}

export default async function DesktopLeftNav() {
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

  productsAll.forEach((product) => {
    metaDataKey.forEach((key) => {
      if (/-/.test(product.metadata[key])) {
        const linkArray = product.metadata[key].split("-");
        placementRecursive(groups, key, linkArray);
      } else {
        placementRecursive(groups, key, [product.metadata[key]]);
      }
    });
  });

  return (
    <div
      className={`md:block hidden fixed z-11 left-0 top-0 h-full w-[${DESKTOP_LEFT_NAV_WIDTH}px] bg-white`}
    >
      {/* TODO: to be abstracted */}
      {/* Navigation */}
      <div
        className={cn("absolute flex flex-col justify-center items-center")}
        style={{
          top: `${VERTICAL_LINE_OFFSET_Y}rem`,
          left: `${VERTICAL_LINE_OFFSET_X * 2}rem`,
          height: `${HORIZONTAL_LINE_OFFSET_Y - VERTICAL_LINE_OFFSET_Y}rem`,
        }}
      >
        <h1 className="text-primary text-wrap text-7xl">Shop</h1>
      </div>
      {/* Filters */}
      <div
        className={cn(
          "absolute flex flex-col justify-center items-start gap-2"
        )}
        style={{
          top: `${HORIZONTAL_LINE_OFFSET_Y + 1}rem`,
          left: `${VERTICAL_LINE_OFFSET_X * 2}rem`,
        }}
      >
        <LeftNestedGroup group={groups} />
      </div>
      {/* vertical line */}
      <DecoratorLines
        alignment="vertical"
        position="left"
        variant="thin"
        strokeColor="var(--color-primary)"
        height={`${VERTICAL_LINE_HEIGHT}rem`}
        x={VERTICAL_LINE_OFFSET_X}
        y={VERTICAL_LINE_OFFSET_Y}
        className={cn("absolute")}
      />
      {/* horizontal line */}
      <DecoratorLines
        alignment="horizontal"
        position="left"
        variant="thick"
        strokeColor="var(--color-primary)"
        width={`${HORIZONTAL_LINE_WIDTH}rem`}
        x={HORIZONTAL_LINE_OFFSET_X}
        y={HORIZONTAL_LINE_OFFSET_Y}
        className={cn("absolute")}
      />
    </div>
  );
}
