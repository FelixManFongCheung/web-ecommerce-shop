export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 pt-0 md:mt-header-height md:pl-desktop-left-nav-width md:pr-desktop-right-nav-width md:py-[100px]">
      {children}
    </div>
  );
}
