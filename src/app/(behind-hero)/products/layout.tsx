export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-left px-3 min-h-screen mt-header-height-mobile md:mt-header-height md:pl-desktop-left-nav-width md:pr-desktop-right-nav-width">
      {children}
    </div>
  );
}
