import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GrantAccessForm from './features/GrantAccessForm';
import { Address, AddressOrEnsName } from './utils/types';

type Props = {}

const GrantAccess = (props: Props) => {
    const { address } = useParams<{ address: Address }>();
    const [protectedData, setProtectedData] = useState<Address | ''>('');
    const [authorizedUser, setAuthorizedUser] = useState<AddressOrEnsName | ''>('');
    
    useEffect(() => {
        console.log("address", address);
        if (address) {
            setProtectedData(address as Address); // Type assertion
        } else {
            setProtectedData(''); // Or handle the undefined case as needed
        }     
    }, [address]);

  return (
    <div className='container mx-auto pt-10 bg-gradient-to-tr from-[#06061E] via-[#06061E] to-blue-950 min-h-screen inter-font'>
        <GrantAccessForm
                protectedData={protectedData}
                authorizedUser={authorizedUser}
                setAuthorizedUser={setAuthorizedUser}
              />
    </div>
  )
}

export default GrantAccess;