import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  CreateThreadCommand,
  Dialect,
  DialectCloudEnvironment,
  DialectSdk,
  ThreadMemberScope,
} from "@dialectlabs/sdk";
import {
  NodeDialectSolanaWalletAdapter,
  Solana,
  SolanaSdkFactory,
} from "@dialectlabs/blockchain-sdk-solana";
import { useWallet } from "@solana/wallet-adapter-react";

export default function NftCombos() {
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!publicKey) return;
  }, [publicKey])
  
  const [cyberSamuariOwners, setCyberSamuariOwners] =
    useState<any[] | undefined>();
  const [showCyberSamuariOwners, setShowCyberSamuariOwners] =
    useState<boolean>(false); 

  useEffect(() => {
    async function getSamuariOwners() {
      const cyberSamuariOwners = await fetch(
        "https://api.flipsidecrypto.com/api/v2/queries/bf7f3cba-0e8b-4513-ac80-329f3154ec28/data/latest"
      ).then((response) => response.json());
      if (cyberSamuariOwners.length > 0)
        setCyberSamuariOwners(cyberSamuariOwners);
    }
    getSamuariOwners();
  }, []);

  const environment: DialectCloudEnvironment = "development";

  async function createThread(recipient: string) {
    const sdk: DialectSdk<Solana> = Dialect.sdk(
      {
        environment,
      },
      SolanaSdkFactory.create({
        // IMPORTANT: must set environment variable DIALECT_SDK_CREDENTIALS
        // to your dapp's Solana messaging wallet keypair e.g. [170,23, . . . ,300]
        wallet: NodeDialectSolanaWalletAdapter.create(),
      })
    );
    const command: CreateThreadCommand = {
      encrypted: false,
      me: {
        scopes: [ThreadMemberScope.ADMIN, ThreadMemberScope.WRITE],
      },
      otherMembers: [
        {
          address: recipient,
          scopes: [ThreadMemberScope.ADMIN, ThreadMemberScope.WRITE],
        },
      ],
    };
    const thread = await sdk.threads.create(command);
    return thread;
  }

  return (
    <div className="flex w-screen h-screen">
      <div className="mx-auto flex flex-row gap-4 font-body">
        <div className="flex max-w-md w-64 h-64 m-auto rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4 cursor-pointer">
            <div className="font-bold text-xl mb-2 mx-auto">
              Froots Collection
            </div>
            <Image
              src="/FrootsLogo.jpeg"
              alt="Froots Logo"
              className="mx-auto"
              width="160"
              height="160"
            />
            <p className="text-gray-700 text-base"></p>
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className="px-6 py-4 max-w-md m-auto cursor-pointer w-64 h-64 rounded overflow-hidden shadow-lg"
            onClick={() => setShowCyberSamuariOwners(!showCyberSamuariOwners)}
          >
            <div className="font-bold text-xl mb-2 mx-auto">Cyber Samurai</div>
            <Image
              src="/CyberSamuraiLogo.jpeg"
              alt="Cyber Samurai Logo"
              className="mx-auto"
              width="160"
              height="160"
            />
            <p className="text-gray-700 text-base"></p>
          </div>
          {showCyberSamuariOwners ? (
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead className="border-b">
                        <tr>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Wallet Address
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="flex flex-col max-h-sm h-32 overflow-y-auto border-b">
                          {cyberSamuariOwners?.map((owner) => (
                            <div
                              key={owner.PURCHASER}
                              className="flex flex-row"
                            >
                              <td className="flex text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {owner.PURCHASER}
                              </td>
                              <td
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                onClick={() => createThread(owner.PURCHASER)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6 cursor-pointer"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                                  />
                                </svg>
                              </td>
                            </div>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
