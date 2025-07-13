import DecoratorLines from "../decoratorLines";

export default function Hero() {
  return (
    <div className="mt-[10vh] bg-gray-100">
      <div className="relative block ml-10 h-[100px] w-[10px]">
        <DecoratorLines alignment="vertical" variant="thin" />
      </div>
    </div>
  );
}
