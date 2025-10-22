export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col p-4 px-[var(--mobile-content-padding-horizontal)] gap-4 h-fit md:flex-row md:mt-header-height md:pl-desktop-info-pages-padding-left md:pr-desktop-info-pages-padding-right md:py-[var(--desktop-info-pages-padding-top)]">
      {children}
    </div>
  );
}
