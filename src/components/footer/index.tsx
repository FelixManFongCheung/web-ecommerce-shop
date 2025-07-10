import Link from "next/link";

export default function Footer() {
  return (
    <div className="bottom-0 h-fit w-full bg-white px-5 pb-12 grid grid-cols-3 gap-20 md:flex md:flex-col md:gap-8">
      <div className="md:order-3">
        <p>Proxy Archive</p>
        <br />
        <p>
          Your gateway to exquisite vintage garments. We preserve pieces of
          history and showcase excellent quality, hoping to store an enduring
          sense of affection on your sentimental harddrive.
        </p>
        <br />
        <a
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          @proxy__archive
        </a>
        <br />
        <br />
        <p>©{new Date().getFullYear()}</p>
      </div>
      <div className="md:order-1">
        <p>Menu</p>
        <br />
        <div className="flex flex-col gap-4">
          <Link href="/contact">Contact us</Link>
          <Link href="/">Shipping</Link>
          <Link href="/">Return Policy</Link>
          <Link href="/">Terms and conditions</Link>
        </div>
      </div>
      <div className="md:order-2">
        <strong>Never Miss a Drop!</strong>
        <br />
        <br />
        <p>
          Sign up to receive exclusive restock updates, discounts and
          promotions.
        </p>
        <br />
        <div className="">
          <input
            type="email"
            placeholder="Enter you e-mail address"
            className="flex flex-col gap-4 rounded-none border border-gray-400 mb-4 p-2 w-full placeholder:text-black"
          />
          <button className="bg-black text-lg text-white py-2 px-10 w-fit">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
