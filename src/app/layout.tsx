import Header from '../components/header';
import Footer from '../components/footer';
import MobileNav from '../components/mobileNav';
import Effect from '../components/effects/proxyA';
import '../styles/index.scss';

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
