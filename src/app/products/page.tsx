import ProductCard from '../../components/productCard';
import styles from './products.module.scss';
import { getActiveProducts } from '@/app/utils/getActiveProducts';

export default async function Page() {
  const productList = await getActiveProducts();
    
  return (
    <div className={styles['products-container']}>
      {productList.map((product, index) => (
        <ProductCard key={index} product={product}/>
      ))}
    </div>
  )
};