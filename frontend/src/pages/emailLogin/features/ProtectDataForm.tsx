import { useEffect, useState } from 'react';
import React from 'react';
import { Connector, useAccount } from 'wagmi';
import { IExecDataProtectorCore, type DataSchema } from '@iexec/dataprotector';
import { IEXEC_EXPLORER_URL } from '../utils/config.ts';
import { Address } from '../utils/types.ts';
import { GlobalURL } from '../../../constants.js';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

export default function ProtectDataForm({
  protectedData,
  setProtectedData,
}: {
  protectedData: Address | '';
  setProtectedData: (protectedData: Address) => void;
}) {
  const { connector } = useAccount() as { connector: Connector };
  const {address} = useAccount();
  const [loadingProtect, setLoadingProtect] = useState(false);
  const [errorProtect, setErrorProtect] = useState('');
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [currentChain, setCurrentChain] = useState<number | null>(null);

   // Function to switch network to the desired chain (84532 in this case)
   const switchNetwork = async (desiredChainId: number) => {
    try {
      const chainIdHex = `0x${desiredChainId.toString(16)}`;
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });
      setCurrentChain(desiredChainId);
    } catch (error: any) {
      // Handle if the user does not have the chain added to their MetaMask
      if (error.code === 4902) {
        console.error('Chain not found in wallet, please add it.');
      } else {
        console.error('Failed to switch network:', error);
        setErrorProtect('Failed to switch network. ' + error.message);
      }
    }
  };

  useEffect(() => {
    const checkNetwork = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();
        setCurrentChain(chainId);
        if (chainId !== 134) {
          // Switch to the correct chain (84532 in this example)
          switchNetwork(134);
        }
      } else {
        console.error('MetaMask is not installed');
      }
    };

    checkNetwork();
  }, []);

  
  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
    setIsValidEmail(event.target.validity.valid);
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const protectedDataSubmit = async () => {
    setErrorProtect('');

    if (!email) {
      setErrorProtect('Please enter a valid email address');
      return;
    }

    const data: DataSchema = { email: email } as DataSchema;
    try {
      setLoadingProtect(true);

      const provider: any = await connector.getProvider() as ethers.providers.ExternalProvider;
      const dataProtector = new IExecDataProtectorCore(provider);
      const { address: protectedDataAddress } = await dataProtector.protectData({
        data,
        name,
      });
      setProtectedData(protectedDataAddress as Address);
      // Send data to the backend
      const response = await fetch(`${GlobalURL}/user/addEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          email,
        }),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Backend error: ${errorMessage}`);
      }
      localStorage.setItem("emailId", email);
      navigate("/email/email-linked");
      setErrorProtect('');
    } catch (error) {
      setErrorProtect(String(error));
    }
    setLoadingProtect(false);
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Protect your email address</h1>
      <div className="mb-4">
        <input
          type="email"
          required
          className={`w-full p-3 border rounded-md ${!isValidEmail ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        {!isValidEmail && (
          <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
        )}
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      {/* {errorProtect && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
          <strong>Creation failed</strong>
          <p>{errorProtect}</p>
        </div>
      )} */}
      {!loadingProtect && (
        <button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          onClick={protectedDataSubmit}
        >
          Create
        </button>
      )}
      {protectedData && !errorProtect && (
        <div className="bg-green-100 text-green-700 p-4 rounded-md mt-4">
          <strong>Your data has been protected!</strong>
          <a
            href={`${IEXEC_EXPLORER_URL}${protectedData}`}
            target="_blank"
            className="text-green-700 underline"
            rel="noopener noreferrer"
          >
            You can check it here
          </a>
          <p className="text-sm mt-2">
            Your protected data address:{' '}
            <span className="font-mono text-xs">{protectedData}</span>
          </p>
        </div>
      )}
      {loadingProtect && (
        <div className="flex justify-center mt-4">
          <div className="loader border-t-4 border-blue-600 w-8 h-8 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}