import Link from "next/link";
import React from "react";

export default function ListInstructions() {
  return (
    <div className="flex flex-col gap-4 w-3/4 m-auto font-body">
      <div className="flex text-5xl">How to Play</div>
      <ul className="flex flex-col list-decimal ml-24 text-xl">
        <li>
          Check out the NFT combos that you&apos;re eligible to play. You must
          own at least one of the NFTs in the combo to start playing.
        </li>
        <li>Find users who own the other NFTs in the combo.</li>
        <li>Get them to connect to your combo link.</li>
        <li>Complete a combo and earn prizes.</li>
      </ul>
      <div className="flex text-md">
        Note: You can only win one prize per combo.
      </div>
      <a href="/nftcombos" className="mx-auto">
        <button className="bg-purple-300 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded w-64">
          Explore NFT Combos
        </button>
      </a>
    </div>
  );
}
