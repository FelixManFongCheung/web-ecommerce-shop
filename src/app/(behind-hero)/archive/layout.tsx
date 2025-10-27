export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="p-4 pt-0 md:py-header-height">{children}</div>;
}
