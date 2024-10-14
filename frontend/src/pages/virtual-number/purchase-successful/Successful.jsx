import React, { useState } from "react";
import Header from "../../../components/Header";
import NumberNft from "./nft/NumberNft";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GETPHONENUMBERSBYWALLET } from "../../../contract/contractIntegration";
import { useAccount } from "wagmi";


const Successful = () => {
  const account = useAccount();
  const walletAddress = account.address;
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  
  const GetPhoneNumberByWallet = async (walletAddress) => {
    try {
      const result = await GETPHONENUMBERSBYWALLET(walletAddress);
      setPhoneNumbers(result);
      console.log("phoneNumbers from contract", phoneNumbers);
    } catch (error) {
      console.error("Error fetching numbers:", error);
    }
  };
  return (
    <div className="text-white inter-font">
      <div className="bg-gradient-to-t from-[#06061E] via-[#06061E] to-blue-950 min-h-screen pb-24">
        <Header connectionType={connectionType} setIsConnected={setIsConnected}/>
        <div className="flex justify-center items-center pt-16">
          <div className="max-w-7xl mx-4 md:mx-0 space-y-6">
            <div className="flex justify-center">
              <NumberNft />
            </div>
            <div className=" text-center">
              <p className=" font-bold text-3xl">Purchase Successful</p>
              <p className=" text-customText">
                Congratulations! Your have successfully purchased a web3{" "}
                <br className=" hidden md:flex" /> phone number.
              </p>
              <div className="  pt-5">
                <motion.button
                  onClick={() => handleNavigation ("/search-results/cart-checkout/purchase-successful")}
                  whileTap={{ scale: 0.9 }}
                  className={`font-bold text-xs md:text-base p-3 w-full rounded-full bg-customBlue text-white border border-customBlue`}
                >
                  Link your number to a wallet
                </motion.button>
                {/* <div>
                  <button onClick={() => GetPhoneNumberByWallet(walletAddress)}>
                    Get Phone Numbers
                  </button>
                  {phoneNumbers.map((item, index) => (
                    <div className="" key={index}>
                      {item}
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Successful;
