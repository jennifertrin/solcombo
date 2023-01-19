import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";
import '@dialectlabs/react-ui/index.css';
import { 
  DialectUiManagementProvider, 
  DialectThemeProvider, 
  DialectNoBlockchainSdk 
} from '@dialectlabs/react-ui';

export default function App({ Component, pageProps }: AppProps) {
  const endpoint = "https://rpc.ankr.com/solana";

  const WalletProvider = dynamic(
    () => import("../contexts/ClientWalletProvider"),
    {
      ssr: false,
    }
  );

  const SdkProvider = ({children} : React.PropsWithChildren<{}>) => {
    return <DialectNoBlockchainSdk>{children}</DialectNoBlockchainSdk>;
  }
  
  const DialectProviders = ({children} : React.PropsWithChildren<{}>) => {
    return (
      <SdkProvider>
        <DialectThemeProvider>
          <DialectUiManagementProvider>
            {children}
          </DialectUiManagementProvider>
        </DialectThemeProvider>
      </SdkProvider>
    );
  }

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider>
        <DialectProviders>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </DialectProviders>
      </WalletProvider>
    </ConnectionProvider>
  );
}
