import Link from "next/link";
import React from "react";

export default function ListInstructions() {
  return (
    <div className="flex flex-col gap-4 w-3/4 m-auto font-body">
      <div className="flex text-5xl">How It Works</div>
      <ul className="flex flex-col list-decimal ml-24 text-xl">
        <li>
          Check out the available NFT collectons (only Cyber Samurai is available at the moment)
        </li>
        <li>Click on the collection</li>
        <li>Toggle the list that you would like to see</li>
        <li>Click on the chat button next the wallet to create a chat</li>
        <li>Click on the Messages box at the bottom and choose the convo to start chatting</li>
     </ul>
      <a href="/nftcombos" className="mx-auto">
        <button className="bg-purple-300 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded w-64">
          Explore NFT Combos
        </button>
      </a>
    </div>
  );
}
