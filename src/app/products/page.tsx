import ProductCard from '../../components/productCard';
import styles from './products.module.scss';
import Stripe from 'stripe';

export default async function Page() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const products = await stripe.products.list();
  const productList: Stripe.Product[] = products.data;

  console.log(productList);
  
    
  return (
    <div className={styles['products-container']}>
      {productList.map((product, index) => (
        <ProductCard key={index} product={product}/>
      ))}
    </div>
  )
};