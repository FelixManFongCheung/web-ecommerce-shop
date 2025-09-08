export default function TermsAndConditionsPage() {
  return (
    <div>
      <div className="flex-1">
        <h2 className="text-2xl mb-4">Shipping</h2>
        <p className="mb-4">
          We are based in Denmark and ship worldwide. Orders are processed and
          shipped within 3–7 business days of purchase.
        </p>
        <h3 className="text-xl mb-2">Shipping Rates</h3>
        <ul className="ml-10 mb-4">
          <li>Denmark – free shipping</li>
          <li>EU – €25</li>
          <li>USA – €40</li>
          <li>Rest of the world – €40</li>
        </ul>
        <h3 className="text-xl mb-4">Estimated Delivery Times</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <p>Denmark</p>
          <p>typically within 1-2 business days after dispatch.</p>
          <p>International</p>
          <p>typically within 3-7 business days after dispatch.</p>
        </div>
        {/* TODO: bold needs to be added for the font of this text */}
        <p className="mb-4">
          <span className="font-extrabold italic !font-[Athelas_Bold_Italic]">
            Please note
          </span>{" "}
          – Proxy Archive is not responsible for any taxes or duties applied to
          international shipments. Lost or delayed packages must be addressed
          with the shipping provider, as we cannot be held liable once the order
          has been dispatched.
        </p>
      </div>
      <div className="flex-1">
        <h2 className="text-2xl mb-4">Returns</h2>

        <p className="mb-4">
          As a small, independent archive, Proxy Archive is unable to offer
          returns.
        </p>

        <p className="mb-4">
          All pieces are carefully reviewed before listing, and any visible fl
          aws or signs of wear are clearly noted in the product de- scription or
          refl ected through our condition rating system:
        </p>
        <ol className="list-decimal list-inside mb-4">
          <li>Great vintage condition (no or minimal signs of wear)</li>
          <li>Very good vintage condition (slight signs of wear)</li>
          <li>Good vintage condition (visible but minor signs of wear)</li>
        </ol>
        <p className="mb-4">
          Please note that these are pre-loved items. Subtle signs of age or use
          may be present but will not affect the overall look or wearability. We
          take great care to ensure accuracy and trans- parency. In the rare
          case an item has been misrepresented, we will offer a full refund. If
          this applies, please contact us at info@proxyarchive.com within 3 days
          of receiving your order, including clear photos and a description of
          the issue.
        </p>
      </div>
    </div>
  );
}
