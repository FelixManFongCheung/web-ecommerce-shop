import { cn } from "@/lib/cn/utils";

export default function DecoratorLines({
  alignment,
  variant,
  className,
  position,
  height: heightProp,
  width: widthProp,
  top,
  left,
  bottom,
  right,
  styles,
}: {
  alignment: "horizontal" | "vertical";
  variant: "thin" | "medium" | "thick";
  className?: string;
  position?: "left" | "right";
  height?: string;
  width?: string;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  styles?: React.CSSProperties;
}) {
  const getThickness = (variant: string) => {
    switch (variant) {
      case "thin":
        return "0.125rem"; // 2px
      case "medium":
        return "0.4rem"; // 8px
      case "thick":
        return "0.7rem"; // 16px
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

  const positionStyle = (() => {
    if (position === "left") {
      return {
        ...(left !== undefined && { left: left + "rem" }),
        ...(top !== undefined && { top: top + "rem" }),
        ...(bottom !== undefined && { bottom: bottom + "rem" }),
      };
    } else if (position === "right") {
      return {
        ...(right !== undefined && { right: right + "rem" }),
        ...(top !== undefined && { top: top + "rem" }),
        ...(bottom !== undefined && { bottom: bottom + "rem" }),
      };
    }
    return {};
  })();
  return (
    <div
      className={cn("block", className)}
      style={{
        ...dimensionStyle,
        ...positionStyle,
        ...styles,
      }}
    />
  );
}
