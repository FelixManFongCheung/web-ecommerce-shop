'use client';

export default function CheckoutButton({ cartID }: { cartID: string }) {

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartID }),
      });
      
      if (!response.ok) throw new Error('Checkout failed');
      
      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <button onClick={handleCheckout}>
      Checkout
    </button>
  );
}

// will i need to use embedded checkout or normal checkout from stripe?`