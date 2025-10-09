export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="p-4 md:py-header-height">{children}</div>;
}
