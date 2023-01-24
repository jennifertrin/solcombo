import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  CreateThreadCommand,
  Dialect,
  DialectCloudEnvironment,
  DialectSdk,
  ThreadMemberScope,
} from "@dialectlabs/sdk";
import { Solana, SolanaSdkFactory } from "@dialectlabs/blockchain-sdk-solana";
import { solanaWalletToDialectWallet } from "@/util/SolanaToDialect";
import { useWallet } from "@solana/wallet-adapter-react";

export default function NftCombos() {
  const solanaWallet = useWallet();

  const [showInputs, setShowInputs] = useState<boolean>(false);
  const [cyberSamuariOwners, setCyberSamuariOwners] =
    useState<any[] | undefined>();
  const [showCyberSamuariOwners, setShowCyberSamuariOwners] =
    useState<boolean>(false);
  const [
    showCyberSamuariOwnersWithMostSales,
    setShowCyberSamuariOwnersWithMostSales,
  ] = useState<boolean>(false);
  const [cyberSamuariOwnersWithMostSales, setCyberSamuariOwnersWithMostSales] =
    useState<any[] | undefined>();
  const [
    showCyberSamuariOwnersWithMost,
    setShowCyberSamuariOwnersWithMost,
  ] = useState<boolean>(false);
  const [cyberSamuariOwnersWithMost, setCyberSamuariOwnersWithMost] =
    useState<any[] | undefined>();

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

  useEffect(() => {
    async function getSamuariOwnersWithMostSales() {
      const cyberSamuariOwners = await fetch(
        "https://api.flipsidecrypto.com/api/v2/queries/903a6d8c-f908-4152-b608-d6064d19b671/data/latest"
      ).then((response) => response.json());
      if (cyberSamuariOwners.length > 0)
        setCyberSamuariOwnersWithMostSales(cyberSamuariOwners);
    }
    if (showCyberSamuariOwnersWithMostSales) {
      getSamuariOwnersWithMostSales();
    }
  }, [showCyberSamuariOwnersWithMostSales]);

  useEffect(() => {
    async function getSamuariOwnersWithMost() {
      const cyberSamuariOwners = await fetch(
        "https://node-api.flipsidecrypto.com/api/v2/queries/64b7f26f-81a5-45b1-99a2-27c5cfce8ea6/data/latest"
      ).then((response) => response.json());
      if (cyberSamuariOwners.length > 0)
        setCyberSamuariOwnersWithMost(cyberSamuariOwners);
    }
    if (showCyberSamuariOwnersWithMost) {
     getSamuariOwnersWithMost();
    }
  }, [showCyberSamuariOwnersWithMost]);

  const environment: DialectCloudEnvironment = "development";

  const sdk: DialectSdk<Solana> | undefined = useMemo(() => {
    const solanaToDialect = solanaWalletToDialectWallet(solanaWallet);
    if (!solanaToDialect) return;
    return Dialect.sdk(
      {
        environment,
      },
      SolanaSdkFactory.create({
        wallet: solanaToDialect,
      })
    );
  }, [solanaWallet]);

  async function createThread(recipient: string) {
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
    try {
      const thread = await sdk?.threads.create(command);
      return thread;
    } catch (e) {
      alert(`${e}`);
      console.log("Error:", e);
    }
  }

  return (
    <div className="flex w-1/2 h-screen">
      <div className="bg-white ml-6 my-auto px-12 py-8 rounded-lg flex flex-col gap-2 font-body">
        <span className="flex text-xl text-bold">
          Chat with a Cyber Samurai Owner!
        </span>
        <span className="flex text-md text-black mb-4">
          Click on Cyber Samuari to find a member to chat with!
        </span>
        <div className="flex flex-row gap-4">
          <div
            className="flex flex-col cursor-pointer"
            onClick={() => setShowInputs(!showInputs)}
          >
            <div className="px-6 py-4 bg-slate-100 max-w-md m-auto cursor-pointer w-64 h-64 rounded overflow-hidden shadow-lg">
              <div className="text-center font-bold text-xl mb-2 mx-auto">
                Cyber Samurai
              </div>
              <Image
                src="/CyberSamuraiLogo.jpeg"
                alt="Cyber Samurai Logo"
                className="mx-auto"
                width="160"
                height="160"
              />
              <p className="text-gray-700 text-base"></p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col font-body mx-auto ml-8">
        <div className="flex justify-center">
          {showInputs ? (
            <div className="font-body align-left text-xl mb-4 mt-6">
              Choose list of users:
              <div className="form-check">
                <input
                  className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  onChange={() => {
                    setShowCyberSamuariOwnersWithMostSales(true);
                    setShowCyberSamuariOwnersWithMost(false);
                    setShowCyberSamuariOwners(false);
                  }}
                ></input>
                <label className="form-check-label inline-block text-gray-800">
                  Cyber Samuari Owners with Most Sales
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  onChange={() => {
                    setShowCyberSamuariOwners(false);
                    setShowCyberSamuariOwnersWithMost(true);
                    setShowCyberSamuariOwnersWithMostSales(false);
                  }}
                ></input>
                <label className="form-check-label inline-block text-gray-800">
                  Most Cyber Samuari Owned
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  onChange={() => {
                    setShowCyberSamuariOwners(true);
                    setShowCyberSamuariOwnersWithMost(false);
                    setShowCyberSamuariOwnersWithMostSales(false);
                  }}
                ></input>
                <label className="form-check-label inline-block text-gray-800">
                  Current Cyber Samuari Owners
                </label>
              </div>
            </div>
          ) : null}
        </div>
        {showCyberSamuariOwners ? (
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <span className="font-body text-lg">
                      Cyber Samuari Owners
                    </span>
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
                    <tr className="flex flex-col max-h-sm h-1/2 overflow-y-auto border-b">
                      {cyberSamuariOwners?.map((owner) => (
                        <div
                          key={owner.PURCHASER}
                          className="w-full space-between flex flex-row"
                        >
                          <td className="flex text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {owner.PURCHASER.slice(0,5)+ '...' + owner.PURCHASER.slice(owner.PURCHASER.length - 5, owner.PURCHASER.length)}
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
        ) : null}
        {showCyberSamuariOwnersWithMostSales ? (
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <span className="font-body text-lg">
                    Cyber Samuari Owners With Most Sales
                  </span>
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 py-4 text-left"
                    >
                      Wallet Address / Number of Sales
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="flex flex-col max-h-sm h-1/2 overflow-y-auto border-b">
                    {cyberSamuariOwnersWithMostSales?.map((owner) => (
                      <div
                        key={owner.PURCHASER}
                        className="w-full space-between flex flex-row"
                      >
                        <td className="flex text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {owner.PURCHASER.slice(0,5)+ '...' + owner.PURCHASER.slice(owner.PURCHASER.length - 5, owner.PURCHASER.length)}
                        </td>
                        <td className="flex text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {owner.NUMBER_OF_SALES}
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
      ) : null}
      {showCyberSamuariOwnersWithMost ? (
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <span className="font-body text-lg">
                    Cyber Samuari Owners With Most Cyber Samuari Owned
                  </span>
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 py-4 text-left"
                    >
                      Wallet Address / Number of Owned
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="flex flex-col max-h-sm h-1/2 overflow-y-auto border-b">
                    {cyberSamuariOwnersWithMost?.map((owner) => (
                      <div
                        key={owner.PURCHASER}
                        className="w-full space-between flex flex-row"
                      >
                        <td className="flex text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {owner.PURCHASER.slice(0,5)+ '...' + owner.PURCHASER.slice(owner.PURCHASER.length - 5, owner.PURCHASER.length)}
                        </td>
                        <td className="flex text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {owner.NUMBER_OF_NFTS_OWNED}
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
      ) : null}
      </div>
    </div>
  );
}
