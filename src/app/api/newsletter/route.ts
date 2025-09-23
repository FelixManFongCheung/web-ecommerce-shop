import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
  const { email } = await req.json();

  // Prepare to call Mailchimp API
  const API_KEY = process.env.MAILCHIMP_API_KEY ?? "";
  const LIST_ID = process.env.MAILCHIMP_LIST_ID ?? "";
  const datacenter = API_KEY.split("-")[1]; // Mailchimp uses datacenter in API URL

  const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `apikey ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed", // or 'pending' if you want to send a confirmation email
    }),
  });

  if (response.ok) {
    return NextResponse.json({ message: "Subscription successful!" });
  } else {
    const error = await response.json();
    return NextResponse.json({ message: error.detail });
  }
}
