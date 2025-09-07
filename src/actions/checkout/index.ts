// app/actions/checkout.ts
"use server";

import { getCartProductsServer } from "@/actions/getCart/server";
import {
  createCheckoutSession,
  getPriceId,
  retrievePrice,
} from "@/actions/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function createCheckout() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin") || "";

    // Get cart data
    const cart = await getCartProductsServer();

    if (!cart || cart.length < 1) {
      return null;
    }

    // Get cart products and create line items
    const lineItems = await Promise.all(
      cart.map(async (product: Stripe.Product) => ({
        price: await getPriceId(product.id),
        quantity: 1,
      }))
    );

    // Filter out recurring items
    const paymentArray = await Promise.all(
      lineItems.map(async (item) => {
        const price = await retrievePrice(item.price);
        return price.type !== "recurring" ? item : null;
      })
    ).then((results) => results.filter((item) => item !== null));

    const baseSessionParams = {
      success_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}&no_embed=true`,
      cancel_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}&no_embed=true`,
      expires_at: Math.floor(Date.now() / 1000) + 3600 * 2,
    };

    const session = await createCheckoutSession({
      ...baseSessionParams,
      mode: "payment",
      line_items: paymentArray,
      payment_method_types: ["card"],
      invoice_creation: {
        enabled: true,
      },
      payment_intent_data: {
        setup_future_usage: "off_session",
      },
      billing_address_collection: "required" as const,
      shipping_address_collection: {
        allowed_countries: [
          "DK",
        ] as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
      },
      shipping_options: [
        { shipping_rate: "shr_1QJKVjEn8tbdxcgB9WpQyRVl" },
        { shipping_rate: "shr_1QJKV1En8tbdxcgBsfS7JWNT" },
      ],
    });

    if (!session.url) {
      throw new Error("Session URL is null");
    }

    return { success: true, url: session.url };
  } catch (error) {
    console.error("Checkout error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Checkout failed",
    };
  }
}

type EmbeddedCheckoutResponse = {
  success: boolean;
  data?: {
    id: string;
    clientSecret: string | null;
    mode: "subscription" | "payment";
  };
  error?: string;
};

export async function createEmbeddedCheckout(
  priceId: string
): Promise<EmbeddedCheckoutResponse> {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin") || "";

    // Retrieve price details
    const price = await retrievePrice(priceId);

    // Common session parameters
    const baseSessionParams = {
      ui_mode: "embedded" as const,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
      expires_at: Math.floor(Date.now() / 1000) + 3600 * 2,
    };

    // Create session based on price type
    const session = await createCheckoutSession({
      ...baseSessionParams,
      mode: price.type === "recurring" ? "subscription" : "payment",
      ...(price.type === "recurring"
        ? {
            // Subscription-specific options
            subscription_data: {
              trial_period_days: 7,
            },
            payment_method_types: ["card"],
          }
        : {
            // One-time payment specific options
            payment_method_types: ["card"],
            invoice_creation: {
              enabled: true,
            },
            billing_address_collection: "required" as const,
            shipping_address_collection: {
              allowed_countries: [
                "DK",
              ] as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
            },
            shipping_options: [
              {
                shipping_rate: "shr_1QJKVjEn8tbdxcgB9WpQyRVl",
              },
              {
                shipping_rate: "shr_1QJKV1En8tbdxcgBsfS7JWNT",
              },
            ],
          }),
    });

    return {
      success: true,
      data: {
        id: session.id,
        clientSecret: session.client_secret,
        mode: price.type === "recurring" ? "subscription" : "payment",
      },
    };
  } catch (error) {
    console.error("Embedded checkout error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create checkout session",
    };
  }
}
