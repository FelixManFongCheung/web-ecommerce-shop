import DecoratorLines from "../decoratorLines";

export default function Hero() {
  return (
    <div className="relative h-screen w-screen bg-gray-100">
      <div className="absolute inset-0 h-full w-full">
        <div className="absolute top-[5%] left-[5%] block h-[40%] w-[2px]">
          <DecoratorLines alignment="vertical" variant="thin" />
        </div>
        <div className="absolute top-[12%] left-[3%] block h-[4px] w-[75%]">
          <DecoratorLines alignment="horizontal" variant="medium" />
        </div>
        <div className="absolute top-[22%] left-[3%] block h-[4px] w-[22%]">
          <DecoratorLines alignment="horizontal" variant="medium" />
        </div>
        <div className="absolute top-[30%] left-[3%] block h-[8px] w-[45%]">
          <DecoratorLines alignment="horizontal" variant="thick" />
        </div>

        <div className="absolute bottom-[5%] right-[5%] block h-[40%] w-[8px]">
          <DecoratorLines alignment="vertical" variant="thick" />
        </div>
        <div className="absolute bottom-[16%] right-[3%] block h-[4px] w-[22%]">
          <DecoratorLines alignment="horizontal" variant="medium" />
        </div>
        <div className="absolute bottom-[8%] right-[3%] block h-[4px] w-[45%]">
          <DecoratorLines alignment="horizontal" variant="thin" />
        </div>
      </div>
      <div className="flex flex-col h-full w-full items-center justify-center">
        <strong className="text-2xl after:content-['*'] after:text-2xl after:relative after:-top-1">
          proxy archive
        </strong>
        <p className="text-xs">your gateway to an archival wardrobe</p>
      </div>
    </div>
  );
}
