import React, { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { motion } from "framer-motion";
import { GlobalURL } from "../../../constants";
import { useAccount, useBalance } from "wagmi";
import { formatPhoneNumber } from "../../../functions/formatPhoneNumber";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { formatEther } from "viem";

const MainContent = () => {
  const { address, isConnected, connector } = useAccount();
  const [coinbaseAddress, setCoinbaseAddress] = useState(null);
  const [coinBaseBalance, setCoinBaseBalance] = useState(null);
  const [userData, setUserData] = useState(null);
  const { data: balanceData, isLoading } = useBalance({
    address: address,
    watch: true,
  });
  const navigate = useNavigate();

  const fetchUserData = async (address) => {
    try {
      const response = await fetch(`${GlobalURL}/user/getUser/${address}`);
      const data = await response.json();
      console.log("User Data:", data.data);
      setUserData(data.data);
      return data.exists;
    } catch (error) {
      console.error("Error fetching user data", error);
      return true;
    }
  };

  useEffect(() => {
      fetchUserData(address);
  }, [address]);  
  

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <section>
      <div className="px-5 text-white border-b border-[#7181a5] pb-4 pt-1">
        <h1 className="text-3xl font-semibold pt-2">Home</h1>
        <p className="text-customText pt-1">
          Explore endless possibilities with your phone number in Web3
        </p>
      </div>

      <div className="border-b border-[#7181a5] px-5 pb-6">
        <div className="text-white py-9">
          <div className="flex lg:flex-row md:flex-col sm:flex-row flex-col justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Your Numbers</h1>
              <p className="text-customText pt-1">
                View and manage your numbers
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="border-2 border-customBlue hover:bg-customBlue w-fit p-2 px-8 rounded-full mt-3"
              onClick={() => handleNavigation("/selection-page")}
            >
              <p className="font-bold mx-auto flex justify-center gap-3 items-center text-center">
                Buy A Number
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
        </div>

        <div className="flex flex-wrap gap-4 items-center mx-auto justify-center sm:justify-between">
          {/* Display Real Phone Number and Virtual Numbers */}
          {userData ? (
            <>
              {/* Display Real Number if available */}
              {userData.phone && (
                <div className="bg-[#121735] p-4 flex flex-col gap-6 w-[20rem] rounded-xl mb-4">
                  <FaWallet className="text-[#7181a5]" />
                  <div>
                    <h4 className="text-white font-semibold text-xl">Real Number</h4>
                    <p className="text-customText">
                      {formatPhoneNumber(userData.phone)}
                    </p>
                  </div>
                  <div className="text-[#27613d] font-medium text-[14px] bg-[#27613d33] rounded-full px-3 w-fit">
                    Real
                  </div>
                </div>
              )}

              {/* Display Virtual Numbers */}
              {userData.virtuals && userData.virtuals.length > 0 ? (
                userData.virtuals.map((virtualNumber, index) => (
                  <div
                    key={index}
                    className="bg-[#121735] p-4 flex flex-col gap-6 w-[20rem] rounded-xl mb-4"
                  >
                    <FaWallet className="text-[#7181a5]" />
                    <div>
                      <h4 className="text-white font-semibold text-xl">Virtual Number</h4>
                      <p className="text-customText">
                        {formatPhoneNumber(virtualNumber)}
                      </p>
                    </div>
                    <div className="text-[#27613d] font-medium text-[14px] bg-[#27613d33] rounded-full px-3 w-fit">
                      virtual
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-customText">No virtual numbers available</p>
              )}
            </>
          ) : (
            <p className="text-customText">Loading user data...</p>
          )}
        </div>
      </div>
      {/* Email */}
      <div className="border-b border-[#7181a5] px-5 pb-6">
        <div className="text-white py-9">
          <div className="flex lg:flex-row md:flex-col sm:flex-row flex-col justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Your Email</h1>
              <p className="text-customText pt-1">
                View and manage your email
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="border-2 border-customBlue hover:bg-customBlue w-fit p-2 px-8 rounded-full mt-3"
              onClick={() => handleNavigation("/selection-page")}
            >
              <p className="font-bold mx-auto flex justify-center gap-3 items-center text-center">
                Add Email
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
        </div>

        <div className="flex flex-wrap gap-4 items-center mx-auto justify-center sm:justify-between">
          {/* Display Email */}
          {userData ? (
            <>
              {/* Display Email if available */}
              {userData.email && (
                <div className="bg-[#121735] p-4 flex flex-col gap-6 w-[20rem] rounded-xl mb-4">
                  <FaWallet className="text-[#7181a5]" />
                  <div>
                    <h4 className="text-white font-semibold text-xl">Email Id</h4>
                    <p className="text-customText">
                      {userData.email}
                    </p>
                  </div>
                  <div className="text-[#27613d] font-medium text-[14px] bg-[#27613d33] rounded-full px-3 w-fit">
                    Email
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="border-2 border-customBlue hover:bg-customBlue w-fit p-2 px-8 rounded-full mt-3"
                    onClick={() => handleNavigation("/email/grant-access")}
                  >
                    <p className="text-white font-bold mx-auto flex justify-center gap-3 items-center text-center">
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
              )}
            </>
          ) : (
            <p className="text-customText">Loading user data...</p>
          )}
        </div>
      </div>

      {/* Connected Wallets Section */}
      <div className="border-b border-[#7181a5] px-5 pb-6">
        <div className="text-white py-9">
          <div className="flex lg:flex-row md:flex-col sm:flex-row flex-col justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Connected Wallets</h1>
              <p className="text-customText pt-1">
                You can view wallets connected to your phone
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="border-2 border-customBlue hover:bg-customBlue w-fit p-2 px-8 rounded-full mt-3"
            >
              <p className="font-bold mx-auto flex justify-center gap-3 items-center text-center">
                Load Another Wallet
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                  />
                </svg>
              </p>
            </motion.button>
          </div>
        </div>

        {/* Wallet Information */}
        <div className="bg-[#121735] p-4 flex flex-col gap-6 w-fit sm:w-96 rounded-xl">
          <div className="flex gap-2 items-center">
            <FaWallet className="text-white" />
            <h4 className="text-white font-semibold text-xl">
               {isConnected ? `${connector.name}` : "Wallet not connected"}
            </h4>
          </div>
          {isConnected || coinbaseAddress ? (
            <>
              <p className="text-customText break-words">
                {address}
              </p>
              <div className="flex gap-1">
                {isLoading ? (
                  <p className="text-customText">Loading balance...</p>
                ) : (
                  <>
                    <h4 className="text-white font-semibold text-xl">Balance:</h4>
                    <p className="text-customText break-words">
                      {balanceData?.formatted || "0.00"} {balanceData?.symbol || ""}
                    </p>
                  </>
                )}
              </div>
            </>
          ) : (
            <p className="text-customText">Wallet not connected</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainContent;