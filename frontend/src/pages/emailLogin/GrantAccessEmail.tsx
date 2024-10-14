import { IExecDataProtectorCore } from '@iexec/dataprotector';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { Connector, useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

type Profile = {
  name: string;
  address: string;
  owner: string;
  schema: {
    email: string;
  };
  creationTimestamp: number;
  multiaddr: string;
};

type Props = {};

const GrantAccessEmail = (props: Props) => {
  const { connector } = useAccount() as { connector: Connector };
  const { address } = useAccount();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const navigate = useNavigate();
  const [currentChain, setCurrentChain] = useState<number | null>(null);
  const [errorProtect, setErrorProtect] = useState('');
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const fetchProtectedData = async () => {
    try {
      const provider: any = await connector.getProvider() as ethers.providers.ExternalProvider;
      const dataProtector = new IExecDataProtectorCore(provider);
      const listProtectedData: any = await dataProtector.getProtectedData({
        owner: `${address}`,
      });
      console.log('list', listProtectedData);
      setProfiles(listProtectedData);
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  };

  const switchNetwork = async (desiredChainId: number) => {
    setLoading(true); // Start loading when switching network
    try {
      const chainIdHex = `0x${desiredChainId.toString(16)}`;
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });
      setCurrentChain(desiredChainId);
    } catch (error: any) {
      if (error.code === 4902) {
        console.error('Chain not found in wallet, please add it.');
      } else {
        console.error('Failed to switch network:', error);
        setErrorProtect('Failed to switch network. ' + error.message);
      }
    } finally {
      setLoading(false); // Stop loading once the network switch is complete
    }
  };

  useEffect(() => {
    const checkNetwork = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();
        setCurrentChain(chainId);
        if (chainId !== 134) {
          switchNetwork(134);
        }
      } else {
        console.error('MetaMask is not installed');
      }
    };

    checkNetwork();
  }, []);

  useEffect(() => {
    if (currentChain === 134) {
      fetchProtectedData(); // Fetch data only after switching to the correct chain
    }
  }, [currentChain]);

  const handleCardClick = (profileAddress: string) => {
    navigate(`/email/access-profile/${profileAddress}`);
  };

  return (
    <div className="container mx-auto pt-10 bg-gradient-to-tr from-[#06061E] via-[#06061E] to-blue-950 min-h-screen inter-font">
      <div className="text-white font-bold text-4xl text-center">
        My Protected Data
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="text-center text-white">
          <p>Switching network, please wait...</p>
        </div>
      )}

      {/* Disable interaction while loading */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ${
          loading ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        {profiles.map((profile, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{profile.name}</h3>
            <div className="flex items-center justify-between">
              <div className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-medium">
                email
              </div>
              <div className="text-gray-500 text-sm bg-gray-100 rounded-full px-3 py-1">
                {new Date(profile.creationTimestamp * 1000).toLocaleDateString()}
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="border-2 border-customBlue hover:bg-customBlue w-fit p-2 px-8 rounded-full mt-3"
              onClick={() => handleCardClick(profile.address)}
              disabled={loading} // Disable the button during loading
            >
              <p className="text-black font-bold mx-auto flex justify-center gap-3 items-center text-center">
                Grant Access
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </p>
            </motion.button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrantAccessEmail;