import Image from "next/image";
import Link from "next/link";
import styles from "./modalProductCard.module.scss";

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
      className={styles.productCard}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        {product.metadata.brief && (
          <p className={styles.productBrief}>{product.metadata.brief}</p>
        )}
      </div>
    </Link>
  );
}
