import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const Navigation = () => {
  const router = useRouter();
  const navigationItems = [
    {
      label: "How It Works",
      href: "/howitworks",
    },
    {
      label: "NFT Combos",
      href: "/nftcombos",
    },
    {
      label: "Analytics",
      href: "/analytics"
    }
  ];
  return (
    <ul className="flex flex-col w-1/4 h-1/3 bg-white font-body text-xl tracking-wider my-auto ml-0 md:ml-24">
      {navigationItems.map((item) => (
        <li key={item.label} className="flex-1 mr-2">
          <a
            className={`text-center ${router.pathname === item.href ? 'font-bold' : 'font-normal'} block rounded py-4 px-4 text-black`}
            href={item.href}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
