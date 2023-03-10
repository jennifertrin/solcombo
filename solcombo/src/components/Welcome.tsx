import React from 'react';
import ConnectWallet from './ConnectWalletButton';

export default function Welcome() {
  return (
    <div className="flex flex-col m-auto font-body">
     <div className="flex text-6xl">Welcome to Sol-Combo</div>
     <div className="flex mt-2 mb-4 md:mb-12 text-xl">Hunt and gather users owning specific NFTs!</div>
     <ConnectWallet />
    </div>
  )
}