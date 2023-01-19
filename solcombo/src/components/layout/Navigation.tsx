import React from "react";

const Navigation = () => {
  return (
    <ul className="flex flex-col">
      <li className="flex-1 mr-2">
        <a
          className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
          href="#"
        >
          How It Works
        </a>
      </li>
      <li className="flex-1 mr-2">
        <a
          className="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
          href="#"
        >
          NFT Combos
        </a>
      </li>
      <li className="text-center flex-1">
        <a
          className="block py-2 px-4 text-gray-400 cursor-not-allowed"
          href="#"
        >
          Token Combos
        </a>
      </li>
    </ul>
  );
};

export default Navigation;
