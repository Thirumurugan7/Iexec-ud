import { useState } from 'react';
import { IExecDataProtectorCore } from '@iexec/dataprotector';
import { Connector, useAccount } from 'wagmi';
import { WEB3MAIL_APP_ENS } from '../utils/constants.ts';
import { Address, AddressOrEnsName } from '../utils/types.ts';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function GrantAccessForm({
  protectedData,
  authorizedUser,
  setAuthorizedUser,
}: {
  protectedData: Address | '';
  authorizedUser: AddressOrEnsName | '';
  setAuthorizedUser: (authorizedUser: AddressOrEnsName) => void;
}) {
  const { connector, address } = useAccount() as {
    connector: Connector;
    address: Address;
  };

  const [loadingGrant, setLoadingGrant] = useState(false);
  const [errorGrant, setErrorGrant] = useState('');
  const [numberOfAccess, setNumberOfAccess] = useState<number>(1);
  const [userAddress, setUserAddress] = useState<AddressOrEnsName>('');
  const navigate = useNavigate();
  const handleNumberOfAccessChange = (event: any) => {
    setNumberOfAccess(event.target.value);
  };

  const grantAccessSubmit = async () => {
    setErrorGrant('');
    if (!userAddress) {
      setErrorGrant('Please enter a user address');
      return;
    }
    try {
      setLoadingGrant(true);
      const provider: any = await connector.getProvider();
      const dataProtector = new IExecDataProtectorCore(provider);
      await dataProtector.grantAccess({
        protectedData,
        authorizedUser: userAddress,
        authorizedApp: WEB3MAIL_APP_ENS,
        numberOfAccess,
      });
      setAuthorizedUser(userAddress);
      navigate("/sending-crpto/home-page")
    } catch (error) {
      setErrorGrant(String(error));
    }
    setLoadingGrant(false);
  };

  const shareWithYourself = () => {
    setUserAddress(address as string);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md w-full max-w-lg mx-auto mt-8">
      <h1 className="text-xl font-semibold mb-6">Grant Access to Your Protected Data</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Protected Data Address</label>
        <input
          type="text"
          disabled
          value={protectedData}
          className="mt-2 w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Allowed Access Count</label>
        <input
          type="number"
          min="1"
          value={numberOfAccess}
          onChange={handleNumberOfAccessChange}
          className="mt-2 w-full p-3 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">User Address Restricted</label>
        <input
          type="text"
          value={userAddress}
          onChange={(event) => setUserAddress(event.target.value)}
          className="mt-2 w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* <div className="text-sm text-gray-500 mb-4">
        For testing here, you can{' '}
        <button
          type="button"
          className="text-blue-500 underline"
          onClick={shareWithYourself}
        >
          enter your own wallet address
        </button>
        .
      </div> */}

      {!loadingGrant ? (
        <button
          onClick={grantAccessSubmit}
          className="bg-blue-600 text-white w-full py-3 rounded-md hover:bg-blue-700"
        >
          Grant Access
        </button>
      ) : (
        <div className="flex justify-center my-4">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"></div>
        </div>
      )}

      {errorGrant && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          <h2 className="font-semibold">Grant Access Failed</h2>
          <p>{errorGrant}</p>
        </div>
      )}

      {authorizedUser && !errorGrant && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
          <h2 className="font-semibold">Access Granted!</h2>
        </div>
      )}
    </div>
  );
}