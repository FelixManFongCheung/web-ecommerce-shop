export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 md:mt-header-height mt-header-height-mobile md:pl-desktop-left-nav-width md:pr-desktop-right-nav-width md:py-[100px]">
      {children}
    </div>
  );
}
