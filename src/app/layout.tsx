import Footer from "../components/footer";
import Header from "../components/header";
import MobileNav from "../components/mobileNav";
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
        {children}
        {modal}
        <Footer />
      </body>
    </html>
  );
}
