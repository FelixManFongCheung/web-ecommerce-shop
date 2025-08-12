import { getCartProductsServer } from "@/actions/getCart/server";
import { CheckoutButton, RemoveItem } from "@/components";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

function CartItems({
  cartDataArray,
  cartID,
}: {
  cartDataArray: Stripe.Product[];
  cartID: string;
}) {
  return cartDataArray.map((product: Stripe.Product) => (
    <RemoveItem key={product.id} cartID={cartID} productId={product.id}>
      <div className="w-24 aspect-[3/4] relative">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 60vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </RemoveItem>
  ));
}

export default async function Page() {
  const cookieStore = await cookies();
  const cartID = cookieStore.get("cart")?.value;
  if (!cartID)
    return (
      <section className="flex flex-col gap-4 items-end md:items-start">
        <div>empty cart</div>
        <Link href="/collections/all">Find Products</Link>
      </section>
    );

  const cartDataArray = await getCartProductsServer(cartID);
  if (!cartDataArray)
    return (
      <section className="flex flex-col gap-4 items-end md:items-start">
        <div>empty cart</div>
        <Link href="/collections/all">Find Products</Link>
      </section>
    );

  return (
    <section className="flex flex-col gap-4 items-end md:items-start">
      {cartDataArray && cartDataArray.length > 0 ? (
        <>
          <CartItems cartDataArray={cartDataArray} cartID={cartID} />
          <CheckoutButton cartID={cartID} />
        </>
      ) : (
        <section className="flex flex-col gap-4 items-end md:items-start">
          <div>empty cart</div>
          <Link href="/collections/all">Find Products</Link>
        </section>
      )}
    </section>
  );
}
