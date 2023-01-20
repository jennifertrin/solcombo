import Welcome from "@/components/Welcome";
import { useWallet } from '@solana/wallet-adapter-react';
import Instructions from "./howitworks";

export default function Home() {

  const { publicKey } = useWallet();

  return (
    <div className="flex w-3/4 h-screen">
     {publicKey ? <Instructions /> : <Welcome />}
    </div>
  )
}
