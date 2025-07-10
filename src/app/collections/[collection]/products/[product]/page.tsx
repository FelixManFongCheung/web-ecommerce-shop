// import Checkout from '@/components/checkout';
import ATC from '@/components/atc';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { getCartServer } from '@/utils/getCart/server';
import { getPriceId, getProduct, retrievePrice } from '@/utils/stripe';

export default async function Page(props: { params: Promise<{ product: string }> }) {
  const params = await props.params;
  const userCookies = (await cookies()).get('cart')?.value;
  let isATC: boolean = false;
  if (userCookies) {
    const cartItems = await getCartServer(userCookies);
    isATC = cartItems.products?.includes(params.product) || false;
  }


  const product = await getProduct(params.product);
  const priceID = await getPriceId(product.id);
  const price = await retrievePrice(priceID);

  return (
    <section className={styles['product-page-wrapper']}>
      <div className={styles['image-container']}>
        {product.images.map((image, index) => (
          <div key={index} className={styles['image-wrapper']}>
              <Image fill src={image} alt="" />
          </div>
        ))}
      </div>
      <div className={styles['product-info']}>
        <div className={styles['product-title']}>{product.name}</div>
        <div className={styles['product-price']}>{price.unit_amount}</div>
        <ATC isATC={isATC} productId={product.id}/>
        <div className={styles['product-desc']}>{product.description}</div>
        <br /><br />
        <div className={styles['product-size']}>Size{product.metadata.size}</div>
        <br /><br /><br /><p> &gt; Condition </p><br /><br />
        <div className={styles['product-condition']}>{product.metadata.condition}</div>
        <br /><br /><br /><p> &gt; Measurements </p><br /><br />
        <div className={styles['product-measurements']}>{product.metadata.measurements}</div>
        <br /><br /><br /><p> &gt; Composition </p><br /><br />
        <div className={styles['product-composition']}>{product.metadata.composition}</div>
        {/* <Checkout priceID={priceID}/> */}
      </div>
    </section>
  )
};