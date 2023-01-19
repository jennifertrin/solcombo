import Header from './header'

export default function Layout({ children } : React.PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}