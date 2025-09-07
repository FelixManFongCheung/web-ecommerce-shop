import { DesktopLeftNav } from "@/components";
import { redirect } from "next/navigation";

export default async function Page(props: {
  searchParams: Promise<{
    session_id: string;
    no_embed?: boolean;
    status?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  if (!searchParams.session_id) {
    redirect("/");
  }

  // If middleware already processed the order successfully
  if (searchParams.status === "complete") {
    let session;

    if (searchParams.no_embed) {
      const response = await fetch(
        `${process.env.BASE_URL}/api/embedded-checkout?session_id=${searchParams.session_id}`
      );
      session = await response.json();
    }

    return (
      <>
        <DesktopLeftNav headerName="Return">
          {" "}
          {session.customer_email ? (
            <div className="h-screen w-screen">
              <p>
                We appreciate your business! A confirmation email will be sent
                to {session.customer_email}. The order will be processed and
                shipped to you within 24 hours. If you have any questions,
                please email{" "}
                <a href="mailto:orders@example.com">orders@example.com</a>.
              </p>
            </div>
          ) : (
            <div className="h-screen w-screen">
              <p>We appreciate your business!</p>
            </div>
          )}
        </DesktopLeftNav>
      </>
    );
  }

  // This should rarely happen now since middleware handles most cases
  return null;
}
