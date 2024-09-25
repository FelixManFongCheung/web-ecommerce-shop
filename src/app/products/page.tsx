import Product from './product/page';
import styles from './products.module.scss';

export default function Products() {
  const productUrls: string[] = Array(1).fill('https://placehold.co/200x300');

  return (
    <div className={styles['perspective-box']}>
      <div className={styles.container}>
        {productUrls.map(url => (
          <Product key={url} url={url}/>
        ))}
      </div>
    </div>
  )
};