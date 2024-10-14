// src/pages/virtual-number/search-result/SimilarNumberBox.jsx
import React from "react";
import { useSelector } from "react-redux";
import SimIcon from "../../../assets/icons/sim.png";
import BASE from "../../../assets/base.webp";
import { motion } from "framer-motion";
import DiamondTier from "./tiers-components/diamondTier";
import SilverTier from "./tiers-components/silverTier";
import BronzeTier from "./tiers-components/bronzeTier";
import GoldTier from "./tiers-components/goldTier";
import checkTier from "../../../functions/checkTier";
import checkPrice from "../../../functions/checkPrice";
import { selectCartItems } from "../../../redux/cartSlice";

const SimilarNumberBox = ({ addedItems, handleButtonClick, similarNumbers }) => {
  const cartItems = useSelector(selectCartItems); // Get cart items from Redux
  
  return (
    <div className="text-white">
      <p className="font-bold md:text-xl">Similar Numbers</p>
      <div className="w-[370px] md:w-[729px] bg-[#2e2e48] border-2 border-[#7B8DB7]/20 rounded-lg mt-3 p-2 md:p-3">
        {similarNumbers.map((item) => {
          const isInCart = cartItems.some(cartItem => cartItem.id === item.id); // Check if item is in cart
          return (
            <div
              key={item.id}
              className="flex items-center justify-between py-3 last:mb-0 border-b border-[#7B8DB7]/20 first:pt-0 last:pb-0 last:border-b-0"
            >
              {/* Container for Sim Icon and Tier Component */}
              <div className="flex items-center gap-1 md:gap-4">
                <img className="h-6 md:h-8 w-6 md:w-8" src={SimIcon} alt="Sim Icon" />
                <div className="">
                  {/* <span className="text-[#A7C3FB] text-xs font-semibold">+999</span> */}
                  <input
                    type="text"
                    placeholder="XXX XXX XXXX"
                    value={`+999 ${item}`}
                    readOnly
                    className="bg-transparent border-none text-white text-xs md:text-base font-medium focus:outline-none focus:ring-0 w-full"
                  />
                  {checkTier(item) === 'diamond' ? (
                    <DiamondTier />
                  ) : checkTier(item) === 'golden' ? (
                    <GoldTier />
                  ) : checkTier(item) === 'silver' ? (
                    <SilverTier />
                  ) : checkTier(item) === 'bronze' ? (
                    <BronzeTier />
                  ) : (
                    "NA"
                  )}
                </div>
              </div>

              {/* Container for Price and Button */}
              <div className="flex items-center gap-1 md:gap-4 ml-end">
                <div className="flex items-center">
                  <img className="h-8" src={BASE} alt="BASE" />
                  <p className="font-bold text-xs md:text-base">
                    ETH $ {checkPrice(item)}
                  </p>
                </div>
                <motion.button
                  onClick={() => handleButtonClick(item.id, item)} // Passing item data to handleButtonClick
                  whileTap={{ scale: 0.9 }}
                  className={`font-bold text-xs md:text-base p-4 rounded-full w-32 md:w-40 transition-colors duration-300 ${
                    isInCart
                      ? "bg-transparent border border-customBlue text-white shadow-customBlue shadow-md"
                      : "bg-customBlue text-white border border-customBlue"
                  }`}
                >
                  {isInCart ? "Remove" : "Add to Cart"}
                </motion.button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimilarNumberBox;
