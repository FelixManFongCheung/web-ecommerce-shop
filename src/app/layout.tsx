import Footer from "../components/footer";
import Header from "../components/header";
import MobileNav from "../components/mobileNav";
import "../styles/index.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Effect /> */}
        <MobileNav />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
