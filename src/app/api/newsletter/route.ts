import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  
  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #000000; font-size: 24px; font-weight: bold; margin: 0 0 20px 0;">Welcome to Proxy Archive!</h1>
          <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 16px 0;">
            Thank you for subscribing to our newsletter.
          </p>
          <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 16px 0;">
            You'll receive exclusive updates about new arrivals, restocks, and special promotions.
          </p>
          <p style="color: #666666; font-size: 14px; margin: 30px 0 0 0;">
            - The Proxy Archive Team
          </p>
        </div>
      </body>
    </html>
  `;
  
  try {
    const { data, error } = await resend.emails.send({
      from: "Proxy Archive <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to Proxy Archive Newsletter",
      html: emailHtml,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
