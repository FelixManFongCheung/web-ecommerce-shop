import { getPriceId, retrievePrice } from "@/actions/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const priceId = await getPriceId(productId);
    const price = await retrievePrice(priceId);
    
    return NextResponse.json({
      amount: price?.amount,
      currency: price?.currency,
    });
  } catch (error) {
    console.error('Error fetching price:', error);
    return NextResponse.json(
      { error: 'Failed to fetch price' },
      { status: 500 }
    );
  }
}
