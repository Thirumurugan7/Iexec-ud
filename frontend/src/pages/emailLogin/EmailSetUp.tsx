import React from 'react';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Address, AddressOrEnsName } from './utils/types.ts';
import ProtectDataForm from './features/ProtectDataForm.tsx';
import { IExecWeb3mail, type Contact } from '@iexec/web3mail';

const web3Provider = window.ethereum;
const web3mail = new IExecWeb3mail(web3Provider);
type Props = {}

const EmailSetUp = (props: Props) => {
    const { isConnected } = useAccount();
    const [protectedData, setProtectedData] = useState<Address | ''>('');
    const [authorizedUser, setAuthorizedUser] = useState<AddressOrEnsName | ''>('');
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [emailSubject, setEmailSubject] = useState<string>('');
    const [emailContent, setEmailContent] = useState<string>('');
    const [sending, setSending] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
  
    // useEffect(() => {
    //   if (isConnected) {
    //     fetchData();
    //   }
    // }, [isConnected]);
  
    // const fetchData = async () => {
    //   try {
    //     const contactsList = await web3mail.fetchMyContacts({ isUserStrict: true });
    //     setContacts(contactsList); // Save contacts in state
    //   } catch (error) {
    //     console.error('Error fetching contacts:', error);
    //   }
    // };
  
    const handleSendEmail = async (recipientProtectedData: Address) => {
      if (!emailSubject || !emailContent) {
        alert('Please enter both email subject and content.');
        return;
      }
  
      setSending(true);
      try {
        await web3mail.sendEmail({
          protectedData: recipientProtectedData,
          emailSubject,
          emailContent,
          senderName: 'Your Project Name' // Customize as needed
        });
        setSuccessMessage(`Email successfully sent to: ${recipientProtectedData}`);
      } catch (error) {
        console.error('Failed to send email:', error);
        alert('Error sending email. Please try again.');
      } finally {
        setSending(false);
      }
    };
  
    return (
      <div className="container mx-auto pt-10 bg-gradient-to-tr from-[#06061E] via-[#06061E] to-blue-950 min-h-screen inter-font">
        {isConnected ? (
          <>
            {/* <NavBar /> */}
            <ProtectDataForm
              protectedData={protectedData}
              setProtectedData={setProtectedData}
            />
  
            {/* {protectedData && (
              <GrantAccessForm
                protectedData={protectedData}
                authorizedUser={authorizedUser}
                setAuthorizedUser={setAuthorizedUser}
              />
            )} */}
  
            {/* {protectedData && authorizedUser && (
              <RevokeAccessForm
                protectedData={protectedData}
                authorizedUser={authorizedUser}
              />
            )} */}
  
            {/** Display Contacts */}
            {/* {contacts.length > 0 ? (
              <div className="mt-5 p-4 bg-white shadow-md">
                <h2 className="text-lg font-semibold mb-4">Contact List</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="py-2 px-4">Address</th>
                        <th className="py-2 px-4">Owner</th>
                        <th className="py-2 px-4">Access Grant Timestamp</th>
                        <th className="py-2 px-4">Email Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact, index) => (
                        <tr key={index} className="border-t">
                          <td className="py-2 px-4">{contact.address}</td>
                          <td className="py-2 px-4">{contact.owner}</td>
                          <td className="py-2 px-4">
                            {new Date(contact.accessGrantTimestamp).toLocaleString()}
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              placeholder="Subject"
                              value={emailSubject}
                              onChange={(e) => setEmailSubject(e.target.value)}
                              className="block w-full p-2 mb-2 border rounded"
                            />
                            <textarea
                              placeholder="Content"
                              value={emailContent}
                              onChange={(e) => setEmailContent(e.target.value)}
                              className="block w-full p-2 mb-2 border rounded"
                              rows={4}
                            />
                            <button
                              className={`w-full mt-2 p-2 bg-blue-500 text-white rounded ${sending ? 'opacity-50' : ''}`}
                              onClick={() => handleSendEmail(contact.address as `0x${string}`)}
                              disabled={sending}
                            >
                              {sending ? 'Sending...' : 'Send Email'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {successMessage && (
                  <p className="text-green-500 mt-4">{successMessage}</p>
                )}
              </div>
            ) : (
              <p className="mt-5 text-center">No data shared.</p>
            )} */}
          </>
        ) : (
          "Nothing"
        )}
      </div>
    );
}

export default EmailSetUp;