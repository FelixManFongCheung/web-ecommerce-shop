import { cn } from "@/lib/cn/utils";
import { NestedGroup } from "./nestedGroup";

export interface Group {
  [key: string]: object | Group;
}

export default function Filter({
  groups,
  className,
  style,
  onClickHandle,
}: {
  groups: Group;
  className?: string;
  style?: React.CSSProperties;
  onClickHandle?: () => void;
}) {
  return (
    <div
      className={cn(
        "absolute flex flex-col justify-center items-start gap-2",
        className
      )}
      style={style}
    >
      <NestedGroup group={groups} onClickHandle={onClickHandle} />
    </div>
  );
}
