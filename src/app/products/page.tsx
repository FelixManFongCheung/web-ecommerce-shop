import ProductCard from '../components/productCard';
import styles from './products.module.scss';
import Stripe from 'stripe';

export default async function Page() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const products = await stripe.products.list();
  const productList: Stripe.Product[] = products.data;
    
  return (
    <div className={styles['perspective-box']}>
      <div className={styles.container}>
        {productList.map((product, index) => (
          <ProductCard key={index} product={product}/>
        ))}
      </div>
    </div>
  )
};