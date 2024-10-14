import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import CoinbaseLogo from "../../../assets/coinbase.png";
import Wallet from "../../../components/Wallet";
import { useNavigate } from 'react-router-dom';
import ConnectCoinbaseWallet from "../../../components/coinbase/ConnectCoinbaseWallet";

const LoginSignup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div className="lg:flex lg:justify-center items-center pt-10 lg:pt-0 min-h-screen text-[#3D4043] ">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
          <div className="flex flex-col items-center">
            <div className="loader mb-4 border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        </div>
      )}
      <div className=" bg-white w-[350px] md:w-fit h-full mx-auto rounded-xl p-6 lg:p-10">
        <div className=" flex justify-center">
          <img className=" h-[48px] w-[48px]" src={Logo} alt="" />
        </div>
        <p className=" text-2xl lg:text-3xl font-bold text-center pt-3 lg:pt-6">
          Sign Up or Log In
        </p>
        <Wallet setLoading={setLoading} />
        <ConnectCoinbaseWallet />
        {loading && (
          <div className="flex justify-center pt-6">
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        )}
        <p className=" flex justify-center items-center font-semibold gap-2 opacity-60 pt-3">
          Powered by Coinbase{" "}
          <img className=" w-6 h-6" src={CoinbaseLogo} alt="" />
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
