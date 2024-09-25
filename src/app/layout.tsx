import type { Metadata } from "next";
import localFont from "next/font/local";
// import styles from '../styles/global.scss';
import Header from './components/header';
import Footer from './components/footer';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
