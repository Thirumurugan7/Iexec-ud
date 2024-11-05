import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Address, AddressOrEnsName } from '../../emailLogin/utils/types';
import { Contact, IExecWeb3mail } from '@iexec/web3mail';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

const web3Provider = window.ethereum;
const web3mail = new IExecWeb3mail(web3Provider);

const MyContacts = () => {
  const { isConnected } = useAccount();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [emailSubject, setEmailSubject] = useState<string>('');
  const [emailContent, setEmailContent] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null); // Track the expanded row
  const [currentChain, setCurrentChain] = useState<number | null>(null);
  const [errorProtect, setErrorProtect] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected && currentChain === 134) {
      fetchData();
    }
  }, [isConnected, contacts, currentChain]);

  const fetchData = async () => {
    try {
      const contactsList = await web3mail.fetchMyContacts({ isUserStrict: true });
      setContacts(contactsList);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

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
        senderName: 'Your Project Name'
      });
      setSuccessMessage(`Email successfully sent to: ${recipientProtectedData}`);
      navigate("/sending-crpto/home-page")
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Error sending email. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index); // Toggle row expansion
  };

  const switchNetwork = async (desiredChainId: number) => {
    setLoading(true);
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
      setLoading(false);
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

  return (
    <div className="pt-10 bg-gradient-to-tr from-[#06061E] via-[#06061E] to-blue-950 min-h-screen inter-font">
      <div className="text-white font-bold text-4xl text-center">My Contacts</div>

      {contacts.length > 0 ? (
        <div className="mt-5 mx-5 rounded-lg p-4 bg-white shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4">Address</th>
                  <th className="py-2 px-4">Owner</th>
                  <th className="py-2 px-4">Access Grant Timestamp</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <React.Fragment key={index}>
                    <tr
                      className="border-t cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => toggleRow(index)} // Toggle the dropdown on click
                    >
                      <td className="py-2 px-4">{contact.address}</td>
                      <td className="py-2 px-4">{contact.owner}</td>
                      <td className="py-2 px-4">
                        {new Date(contact.accessGrantTimestamp).toLocaleString()}
                      </td>
                      <td className="py-2 px-4 text-center">
                        <span className="text-gray-600">▼</span>
                      </td>
                    </tr>

                    {/* Dropdown section */}
                    {expandedRow === index && (
                      <tr>
                        <td colSpan={4} className="p-4 bg-gray-100">
                          <div
                            className={`transition-all duration-500 ease-in-out ${
                              expandedRow === index ? 'max-h-screen' : 'max-h-0 overflow-hidden'
                            }`}
                          >
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
                              className={`w-full mt-2 p-2 bg-blue-500 text-white rounded ${
                                sending ? 'opacity-50' : ''
                              }`}
                              onClick={() => handleSendEmail(contact.address as `0x${string}`)}
                              disabled={sending}
                            >
                              {sending ? 'Sending...' : 'Send Email'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        </div>
      ) : (
        <p className="mt-5 text-white text-center">No data shared.</p>
      )}
    </div>
  );
};

export default MyContacts;