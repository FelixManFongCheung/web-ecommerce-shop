import DecoratorLines from "../decoratorLines";

export default function Hero() {
  return (
    <div className="mt-[10vh] bg-gray-100">
      <div className="relative block h-[10px] w-[100px]">
        <DecoratorLines alignment="vertical" variant="thin" />
      </div>
    </div>
  );
}
