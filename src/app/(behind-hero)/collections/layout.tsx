export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-left px-mobile-content-padding-horizontal min-h-screen w-full md:mt-header-height md:pl-desktop-left-nav-width md:pr-desktop-right-nav-width md:py-desktop-collections-padding">
      {children}
    </div>
  );
}
