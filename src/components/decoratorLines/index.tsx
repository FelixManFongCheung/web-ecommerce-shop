import { cn } from "@/lib/cn/utils";

export default function DecoratorLines({
  alignment,
  variant,
  strokeColor,
  className,
  position,
  height: heightProp,
  width: widthProp,
  x,
  y,
}: {
  alignment: "horizontal" | "vertical";
  variant: "thin" | "medium" | "thick";
  strokeColor: string;
  className?: string;
  position?: "left" | "right";
  height?: string;
  width?: string;
  x?: number;
  y?: number;
}) {
  const getThickness = (variant: string) => {
    switch (variant) {
      case "thin":
        return "0.125rem"; // 2px
      case "medium":
        return "0.5rem"; // 8px
      case "thick":
        return "1rem"; // 16px
      default:
        return "0.125rem";
    }
  };

  const dimensionStyle =
    alignment === "horizontal"
      ? {
          height: getThickness(variant),
          width: widthProp,
        }
      : {
          height: heightProp,
          width: getThickness(variant),
        };

  const positionStyle =
    position === "left"
      ? {
          left: x + "rem",
          top: y + "rem",
        }
      : {
          right: x + "rem",
          top: y + "rem",
        };
  return (
    <div
      className={cn("block", className)}
      style={{
        ...dimensionStyle,
        ...positionStyle,
        backgroundColor: strokeColor,
      }}
    />
  );
}
