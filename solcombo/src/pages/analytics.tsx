import router from "next/router";

export default function Analytics() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="flex text-4xl font-body mx-auto mt-16">
        Find and connect with the coolest members of the Cyber Samurai Community
      </div>
      <button
        type="button"
        onClick={() =>
          router.push(
            "https://app.flipsidecrypto.com/dashboard/the-state-of-the-cyber-samurai-collection-d86DrV"
          )
        }
        className="w-1/2 mt-4 mb-6 mx-auto inline-block px-6 py-2.5 bg-purple-300 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-purple-400 focus:text-blue-700 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 active:text-blue-800 transition duration-300 ease-in-out"
      >
        View entire dashboard
      </button>
      <iframe
        src="https://app.flipsidecrypto.com/dashboard/the-state-of-the-cyber-samurai-collection-d86DrV"
        name="Flipside iframe"
        className="h-screen mx-12 mt-6"
      />
    </div>
  );
}
