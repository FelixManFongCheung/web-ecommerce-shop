import Header from '../components/header';
import Footer from '../components/footer';
import MobileNav from '../components/mobileNav';
import '../styles/index.scss';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'proxy archive',
  description: 'Home',
}

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
