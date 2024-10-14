import { useAccount, useDisconnect } from 'wagmi';
import { Address } from '../utils/types';
import React from 'react';

export function NavBar() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  // Shorten wallet address for display
  const shortAddress = (address: Address) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
  };

  return (
    <nav className="w-full bg-transparent p-4">
      <div className="flex justify-between items-center">
        <div className="flex-grow text-right italic mr-4">
          {address && <span>{shortAddress(address as Address)}</span>}
        </div>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
    </nav>
  );
}