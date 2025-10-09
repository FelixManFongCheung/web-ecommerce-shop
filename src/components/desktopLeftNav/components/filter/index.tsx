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
  menuStyle,
}: {
  groups: Group;
  className?: string;
  style?: React.CSSProperties;
  onClickHandle?: () => void;
  menuStyle?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "absolute flex flex-col justify-center items-start gap-2",
        className
      )}
      style={style}
    >
      <NestedGroup
        menuStyle={menuStyle}
        group={groups}
        onClickHandle={onClickHandle}
      />
    </div>
  );
}
