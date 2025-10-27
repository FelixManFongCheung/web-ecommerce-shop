export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="p-[var(--mobile-content-padding-horizontal)] pt-0 md:py-header-height">{children}</div>;
}
