'use client'

import Header from './components/header';
import Footer from './components/footer';
import MobileNav from './components/mobileNav';
import '@/styles/index.scss';
import { AppContextProvider } from "@/context/AppContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          <MobileNav />
          <Header />
          {children}
          <Footer />
        </AppContextProvider>
      </body>
    </html>
  );
}
