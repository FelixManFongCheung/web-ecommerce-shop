import Image from "next/image";
import Link from "next/link";

interface ModalProductCardProps {
  product: {
    id: string;
    name: string;
    images: string[];
    metadata: {
      brief?: string;
    };
  };
  collection?: string;
}

export default function ModalProductCard({
  product,
  collection = "all",
}: ModalProductCardProps) {
  return (
    <Link
      href={`/collections/${collection}/products/${product.id}`}
      className="block text-inherit transition-transform duration-200 ease-in-out hover:-translate-y-0.5 rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl"
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-base font-semibold text-gray-900 leading-5">
          {product.name}
        </h3>
        {product.metadata.brief && (
          <p className="m-0 text-sm text-gray-600 leading-5">
            {product.metadata.brief}
          </p>
        )}
      </div>
    </Link>
  );
}
