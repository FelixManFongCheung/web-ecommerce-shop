export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <div className="header"></div>
      {children}
      <div className="pagination"></div>
    </>
  )
};