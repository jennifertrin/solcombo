import Welcome from "@/components/Welcome";
import { useWallet } from '@solana/wallet-adapter-react';
import Instructions from "./howitworks";
import { useEffect } from "react";

export default function Home() {

  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) fetch(`/api/createuser/${publicKey}`);
  }, [publicKey])

  return (
    <div className="flex w-3/4 h-screen">
     {publicKey ? <Instructions /> : <Welcome />}
    </div>
  )
}
