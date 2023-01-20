import Link from "next/link";
import React from "react";

const Navigation = () => {
  const navigationItems = [
    {
      label: "How It Works",
      href: "/howitworks",
    },
    {
      label: "Analytics",
      href: "/analytics",
    },
    {
      label: "NFT Combos",
      href: "/nftcombos",
    },
    {
      label: "Token Combos",
      href: "/tokencombos",
    },
  ];
  return (
    <ul className="flex flex-col w-1/4 h-1/3 bg-white font-body text-xl tracking-wider my-auto ml-0 md:ml-24">
      {navigationItems.map((item) => (
        <li key={item.label} className="flex-1 mr-2">
          <Link
            className="text-center block rounded py-4 px-4 text-black"
            href={item.href}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
