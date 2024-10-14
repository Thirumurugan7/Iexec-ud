import React from 'react';
import Logo from "../../assets/logo.png";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
const ConnectCoinbaseWallet = () => {
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const coinbaseConnector = connectors.find(connector => connector.name === 'Coinbase Wallet')

  return (
    <div className="w-[300px] md:w-[400px] flex justify-center mx-auto pt-6 lg:pt-10">
        {coinbaseConnector && (
          <button
            className='flex justify-center p-3 rounded-full items-center  gap-3 text-base md:text-md border-[#2070F4] border-2 hover:bg-[#2070F4] hover:text-white hover:shadow-[#2070F4] hover:shadow-md w-full font-bold'
            key={coinbaseConnector.id}
            onClick={() => connect({ connector: coinbaseConnector })}
            type="button"
          >
            <img className=" w-6 h-6" src={Logo} alt="" />
            Connect with Ultimate Wallet
          </button>
        )}
        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
    </div>
  );
};

export default ConnectCoinbaseWallet;

