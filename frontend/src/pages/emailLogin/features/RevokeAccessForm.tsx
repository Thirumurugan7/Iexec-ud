import React from 'react';
import { useState } from 'react';
import { IExecDataProtectorCore } from '@iexec/dataprotector';
import { Connector, useAccount } from 'wagmi';
import { WEB3MAIL_APP_ENS } from '../utils/constants.ts';
import { Address, AddressOrEnsName } from '../utils/types.ts';
export default function RevokeAccessForm({
  protectedData,
  authorizedUser,
}: {
  protectedData: Address;
  authorizedUser: AddressOrEnsName;
}) {
  const { connector } = useAccount() as { connector: Connector };

  const [loadingRevoke, setLoadingRevoke] = useState(false);
  const [errorRevoke, setErrorRevoke] = useState('');
  const [revokeAccess, setRevokeAccess] = useState('');

  const revokeAccessSubmit = async () => {
    setRevokeAccess('');
    try {
      setLoadingRevoke(true);

      const provider: any = await connector.getProvider();
      const dataProtector = new IExecDataProtectorCore(provider);
      const allGrantedAccess = await dataProtector.getGrantedAccess({
        protectedData,
        authorizedUser,
        authorizedApp: WEB3MAIL_APP_ENS,
      });

      if (allGrantedAccess.count === 0) {
        throw new Error('No access to revoke');
      }

      const { txHash } = await dataProtector.revokeOneAccess(
        allGrantedAccess.grantedAccess[0]
      );

      setRevokeAccess(txHash);
    } catch (error) {
      setErrorRevoke(String(error));
      setRevokeAccess('');
    }
    setLoadingRevoke(false);
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        Revoke Access to your protected data
      </h1>
      <div className="mb-4">
        <input
          type="text"
          disabled
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
          value={protectedData}
          placeholder="Protected Data Address"
        />
      </div>
      {!loadingRevoke && (
        <button
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          onClick={revokeAccessSubmit}
        >
          Revoke Access
        </button>
      )}
      {loadingRevoke && (
        <div className="flex justify-center mt-4">
          <div className="loader border-t-4 border-red-600 w-8 h-8 rounded-full animate-spin"></div>
        </div>
      )}
      {revokeAccess && !errorRevoke && (
        <div className="bg-green-100 text-green-700 p-4 rounded-md mt-4">
          <strong>Access successfully revoked!</strong>
        </div>
      )}
      {errorRevoke && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mt-4">
          <strong>Revoke Access failed</strong>
          <p>{errorRevoke}</p>
        </div>
      )}
    </div>
  );
}