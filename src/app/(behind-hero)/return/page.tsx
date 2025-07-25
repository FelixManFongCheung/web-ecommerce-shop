import { redirect } from 'next/navigation';
import { completeOrder, cancelOrder } from '@/utils/order';
import { retrieveSession } from '@/utils/stripe';

export default async function Page(
  props: {
    searchParams: Promise<{ session_id: string, no_embed?: boolean }>
  }
) {
  const searchParams = await props.searchParams;
  if (!searchParams.session_id) {
    redirect('/');
  }

  let session;

  if (!searchParams.no_embed) {
    // Server-side session check
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/embedded-checkout?session_id=${searchParams.session_id}`);
    session = await response.json();    
  } else {
    session = await retrieveSession(searchParams.session_id);
  }

  // Handle different session statuses
  if (session.status === 'open') {
    redirect('/cart');
  }

  if (session.status === 'complete') {
    // Handle successful payment server-side
    await completeOrder(searchParams.session_id);
    return (
      <section>
        <p>
          We appreciate your business! A confirmation email will be sent to {session.customer_email}.
          The order will be processed and shipped to you within 24 hours.
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