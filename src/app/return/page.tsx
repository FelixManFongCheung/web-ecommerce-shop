import { redirect } from 'next/navigation';
import styles from './return.module.scss'
import { completeOrder, cancelOrder } from '@/app/utils/order';


export default async function Page({
  searchParams,
}: {
  searchParams: { session_id: string }
}) {
  if (!searchParams.session_id) {
    redirect('/');
  }  

  // Server-side session check
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/embeded-checkout?session_id=${searchParams.session_id}`);
  const session = await response.json();

  // Handle different session statuses
  if (session.status === 'open') {
    redirect('/');
  }

  if (session.status === 'complete') {
    // Handle successful payment server-side
    await completeOrder(searchParams.session_id);
    return (
      <section id={styles.success}>
        <p>
          We appreciate your business! A confirmation email will be sent to {session.customer_email}.
          The order will be processed and shipped to {session.shipping_details} within 24 hours.
          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  if (session.status === 'expired') {
    // Handle cancelled payment server-side
    await cancelOrder(searchParams.session_id);
    redirect('/cart');
  }

  return null;
}