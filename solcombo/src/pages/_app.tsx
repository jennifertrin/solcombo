import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConnectionProvider, useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";
import '@dialectlabs/react-ui/index.css';
import { 
  DialectUiManagementProvider, 
  DialectThemeProvider, 
  DialectNoBlockchainSdk, 
  ConfigProps
} from '@dialectlabs/react-ui';
import { DialectSolanaSdk, DialectSolanaWalletAdapter, SolanaConfigProps } from '@dialectlabs/react-sdk-blockchain-solana';
import { useEffect, useMemo, useState } from "react";
import { solanaWalletToDialectWallet } from "@/util/SolanaToDialect";

export default function App({ Component, pageProps }: AppProps) {
  const endpoint = "https://rpc.ankr.com/solana";

  const WalletProvider = dynamic(
    () => import("../contexts/ClientWalletProvider"),
    {
      ssr: false,
    }
  );

  const SdkProvider = ({children} : React.PropsWithChildren<{}>) => {
    const solanaWallet = useWallet();

    const [dialectSolanaWalletAdapter, setDialectSolanaWalletAdapter] =
    useState<DialectSolanaWalletAdapter | null>(null);
  
  const dialectConfig: ConfigProps = useMemo(() => ({
    environment: 'development',
    dialectCloud: {
      tokenStore: 'local-storage',
    }
  }), []);

  const solanaConfig: SolanaConfigProps = useMemo(() => ({
    wallet: dialectSolanaWalletAdapter,
  }), [dialectSolanaWalletAdapter]);

  useEffect(() => {
    setDialectSolanaWalletAdapter(solanaWalletToDialectWallet(solanaWallet));
  }, [solanaWallet]);
    
  if (dialectSolanaWalletAdapter) {
    return (
      <DialectSolanaSdk config={dialectConfig} solanaConfig={solanaConfig}>
        {children}
      </DialectSolanaSdk>
    );
  }

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