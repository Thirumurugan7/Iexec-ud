import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import CurrentNum from "../../assets/currentnum.png";
import VirtualNum from "../../assets/virtualnum.png";
import Email from "../../assets/email.png";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { GlobalURL } from "../../constants";
import { useAccount } from "wagmi";

const SelectionPage = ({ connectionType, setIsConnected }) => {
  const navigate = useNavigate();
  const account = useAccount();
  const [userData, setUserData] = useState(null);
  const [isNumberLinked, setIsNumberLinked] = useState(false);

  const handleNavigation = (path) => {
      navigate(path);
  };

  const fetchUserData = async (address) => {
    try {
      const response = await fetch(`${GlobalURL}/user/getUser/${address}`);
      const data = await response.json();
      setUserData(data.data);
      setIsNumberLinked(!!data.data.phone); // Check if the phone number exists
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    if (account.address) {
      fetchUserData(account.address);
    }
  }, [account.address]);

  return (
    <div className="bg-gradient-to-tr from-[#06061E] via-[#06061E] to-blue-950 min-h-screen text-white inter-font">
      <Header connectionType={connectionType} setIsConnected={setIsConnected} />
      <div className="flex justify-center items-center pt-24 pb-6 md:pb-0">
        <div className="max-w-7xl">
          <div className="flex">
            <div className="flex-1">
              <p className="text-2xl md:text-3xl font-bold">Let's get you started</p>
              <p className="text-base text-customText">
                Supercharge your phone number for Web3
              </p>
            </div>
          </div>

          <div className="md:flex md:gap-6">
            {/* Current number block */}
            <div className="bg-[#181931] w-[330px] md:w-[360px] rounded-xl mt-10 mx-auto">
              <div className="w-[330px] md:w-[360px] overflow-hidden rounded-t-xl relative">
                <img
                  className="w-[360px] h-[220px] rounded-t-xl object-cover transform transition-transform duration-300 hover:scale-110"
                  src={CurrentNum}
                  alt=""
                />
              </div>
              <div className="flex h-10 justify-center pt-2">
                <p className="flex items-center text-sm font-bold text-center bg-[#489D5D] rounded-lg p-1 px-3 w-fit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  FREE
                </p>
              </div>
              <div className="px-5 pt-1 pb-3">
                <p className="font-bold text-2xl text-center">
                  Current number
                </p>
                <p className="text-base text-center text-customText">
                  {isNumberLinked
                    ? `Your number ${userData?.phone} is already linked.`
                    : "Verify the number with a secure OTP sent to your actual mobile number"}
                </p>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleNavigation('/selection-page/real-number')}
                  disabled={isNumberLinked}
                  className={`border-2 border-customBlue w-full p-2 rounded-full mt-3 ${
                    isNumberLinked ? "bg-gray-500 cursor-not-allowed" : "hover:bg-customBlue"
                  }`}
                >
                  <p className="font-bold mx-auto flex justify-center gap-3 items-center text-center">
                    {isNumberLinked ? "Number Already Linked" : "Use Your Current Number"}
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

            {/* Virtual number block */}
            <div className="bg-[#181931] w-[330px] md:w-[360px] rounded-xl mt-10 mx-auto">
              <div className="w-[330px] md:w-[360px] overflow-hidden rounded-t-xl relative">
                <img
                  className="w-[360px] h-[220px] rounded-t-xl object-cover transform transition-transform duration-300 hover:scale-110"
                  src={VirtualNum}
                  alt=""
                />
              </div>
              <div className="px-5 pt-1 pb-3">
                <p className="font-bold text-2xl text-center">
                  Virtual number
                </p>
                <p className="text-base text-center text-customText">
                  Purchase a new virtual number and link it to your account.
                </p>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleNavigation('/selection-page/virtual-number')}
                  className="border-2 border-customBlue hover:bg-customBlue w-full p-2 rounded-full mt-3"
                >
                  <p className="font-bold mx-auto flex justify-center gap-3 items-center text-center">
                    Buy A Virtual Number
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
            {/* Email */}
            <div className="bg-[#181931] w-[330px] md:w-[360px] rounded-xl mt-10 mx-auto">
              <div className="w-[330px] md:w-[360px] overflow-hidden rounded-t-xl relative">
                <img
                  className="w-[360px] h-[220px] rounded-t-xl object-cover transform transition-transform duration-300 hover:scale-110"
                  src={Email}
                  alt=""
                />
              </div>
              <div className="px-5 pt-1 pb-3">
                <p className="font-bold text-2xl text-center">
                  Email Id
                </p>
                <p className="text-base text-center text-customText">
                  Add your email id and link it to your account.
                </p>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleNavigation('/selection-page/email')}
                  className="border-2 border-customBlue hover:bg-customBlue w-full p-2 rounded-full mt-3"
                >
                  <p className="font-bold mx-auto flex justify-center gap-3 items-center text-center">
                    Use your email
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionPage;