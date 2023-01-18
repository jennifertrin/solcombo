import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function ConnectWallet() {
  return (
    <div className="bg-purple-300 mx-auto"><WalletMultiButton className="mx-auto"/></div>
  )
}