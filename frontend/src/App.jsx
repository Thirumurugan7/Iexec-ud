import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './pages/landing-page/LandingPage';
import SelectionPage from './pages/selection-page/SelectionPage';
import RealNumber from './pages/real-number/RealNumber';
import VirtualNumber from './pages/virtual-number/VirtualNumber';
import SearchResult from './pages/virtual-number/search-result/searchResults';
import OtpPage from './pages/real-number/OtpPage';
import Linked from './pages/real-number/Linked';
import CartCheckout from "./pages/virtual-number/cart/CartCheckout";
import PurchaseSuccessful from "./pages/virtual-number/purchase-successful/Successful";
import HomePage from './pages/home-page/HomePage';
import MintNumber from './pages/virtual-number/purchase-successful/nft/MintNumber';
import VirtualLinked from './pages/virtual-number/purchase-successful/VirtualLinked';
import { GlobalURL } from './constants';
import { useAccount } from 'wagmi';
import EmailSetUp from './pages/emailLogin/EmailSetUp';
import EmailLinked from './pages/emailLogin/EmailLinked';
import GrantAccessEmail from './pages/emailLogin/GrantAccessEmail';
import GrantAccess from './pages/emailLogin/GrantAccess';
import MyContacts from './pages/home-page/components/MyContacts';

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [userExists, setUserExists] = useState(null);
  const account = useAccount();
  const navigate = useNavigate();

  const checkIfUserExists = async (address) => {
    try {
      const response = await fetch(`${GlobalURL}/user/getUser/${address}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error("Error checking user existence", error);
      return false;
    }
  };

  useEffect(() => {
    const fetchUserExists = async () => {
      if (account.address) {
        const result = await checkIfUserExists(account.address);
        setUserExists(result);
        if (result === true){
          navigate('/sending-crpto/home-page');
        }
      }
    };

    fetchUserExists();
  }, [account.address]);

  return (
    <div className=''>
        <Routes>
          <Route path='/' element={account.isConnected && userExists === false ? <SelectionPage /> : <LandingPage />} />
          <Route path='/selection-page' element={<SelectionPage /> } />
          <Route path='/sending-crpto/home-page' element={<HomePage /> } />
          <Route path='/selection-page/real-number' element={<RealNumber />} />
          <Route path='/selection-page/virtual-number' element={<VirtualNumber />} />
          <Route path='/real-number/otp-page' element={<OtpPage />} />
          <Route path='/otp-page/number-linked' element={<Linked />} />
          <Route path='/virtual/number-linked' element={<VirtualLinked />} />
          <Route path='/virtual-number/search-results' element={<SearchResult />} />
          <Route path='/virtual-number/search-results/cart-checkout' element={<CartCheckout />} />
          <Route path='/search-results/cart-checkout/mint-number' element={<MintNumber />} />
          <Route path='/search-results/cart-checkout/purchase-successful' element={<PurchaseSuccessful />} />
          <Route path="/sending-crpto/payment-realnumber" element={<HomePage  activeTab="payments" />} />
          <Route path='/selection-page/email' element={<EmailSetUp />} />
          <Route path='/email/email-linked' element={<EmailLinked />} />
          <Route path='/email/grant-access' element={<GrantAccessEmail />} />
          <Route path='/email/access-profile/:address' element={<GrantAccess />} />
          <Route path='/email/mycontacts' element={<MyContacts />} />
        </Routes>
    </div>
  );
};

export default App;