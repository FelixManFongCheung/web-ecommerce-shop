export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 md:mt-header-height md:py-[100px]">{children}</div>
  );
}
