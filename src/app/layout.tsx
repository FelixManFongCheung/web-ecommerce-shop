import { Footer, Header, Hero, MobileNav } from "@/components";
import "../styles/globals.css";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Effect /> */}
        <MobileNav />
        <Header />
        <Hero />
        {children}
        {modal}
        <Footer />
      </body>
    </html>
  );
}
