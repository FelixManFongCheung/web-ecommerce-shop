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
        <div className="h-screen w-screen bg-gray-100 min-h-screen"></div>
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
