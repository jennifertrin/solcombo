import { BottomChat } from '@dialectlabs/react-ui';
import Header from './Header';
import Navigation from './Navigation';
import { useWallet } from '@solana/wallet-adapter-react';

export default function Layout({ children } : React.PropsWithChildren<{}>) {
  return (
    <>
    <div>
      <Header />
      <div className="flex flex-row">
      <Navigation />
      <BottomChat dialectId="dialect-bottom-chat" />
      {children}
      </div>
    </div>
    </>
  )
}