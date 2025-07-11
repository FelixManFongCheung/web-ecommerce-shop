export default function DecoratorLines({
  alignment,
  variant,
}: //   className,
{
  alignment: "horizontal" | "vertical";
  variant: "thin" | "medium" | "thick";
  //   className?: string;
}) {
  if (variant === "thin") {
    return (
      <svg width="100%" height="100%">
        <line
          x1={alignment === "horizontal" ? "0" : "50%"}
          y1={alignment === "horizontal" ? "50%" : "0"}
          x2={alignment === "horizontal" ? "100%" : "50%"}
          y2={alignment === "horizontal" ? "50%" : "100%"}
          stroke="black"
          stroke-width="2"
        />
      </svg>
    );
  }
  if (variant === "medium") {
    return (
      <svg width="400" height="200">
        <line
          x1="50"
          y1="50"
          x2="350"
          y2="150"
          stroke="black"
          stroke-width="2"
        />
      </svg>
    );
  }
  if (variant === "thick") {
    return (
      <svg width="400" height="200">
        <line
          x1="50"
          y1="50"
          x2="350"
          y2="150"
          stroke="black"
          stroke-width="2"
        />
      </svg>
    );
  }
}
