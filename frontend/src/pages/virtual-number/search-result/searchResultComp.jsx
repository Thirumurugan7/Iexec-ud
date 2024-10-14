import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TickIcon from "../../../assets/icons/tick.png";
import Cross from "../../../assets/icons/cross-icon.svg";
import BASE from "../../../assets/base.webp";
import SimcardIcon from "../../../assets/icons/sim.png";
import { useDispatch, useSelector } from "react-redux";
import { selectNumber } from "../../../redux/numberSlice";
import { motion } from "framer-motion";
import checkTier from "../../../functions/checkTier";
import checkPrice from "../../../functions/checkPrice";
import BronzeTier from "./tiers-components/bronzeTier";
import DiamondTier from "./tiers-components/diamondTier";
import GoldTier from "./tiers-components/goldTier";
import SilverTier from "./tiers-components/silverTier";
import { formatPhoneNumber } from "../../../functions/formatPhoneNumber"; 
import { addItemToCart, removeItemFromCart, selectCartItems } from "../../../redux/cartSlice";

const SearchResultComp = ({ number, showAvailability, available, isLast, isFirst }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector(selectCartItems);

  const [tier, setTier] = useState("diamond");
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    setAddedToCart(cart.some((item) => item === number));
  }, [cart, number]);
  
  const onClick = () => {
    if (addedToCart) {
      dispatch(removeItemFromCart(number)); // Remove from cart in Redux
    } else {
      dispatch(addItemToCart(number)); // Add to cart in Redux
    }
  };  

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    setTier(checkTier(number));
    console.log("Tier", tier);
  }, [number]);

  return (
    <div className="text-white">
      <div className={`w-[365px] md:w-full bg-[#2e2e48] rounded-lg p-1 md:p-3 ${ isFirst  ? 'border border-green-500' : 'border-none'}`}>
        <div className="flex items-center">
          <div className="flex flex-1 items-center gap-1 md:gap-6">
            <img className="h-6 md:h-8" src={showAvailability ? (available ? TickIcon : Cross) : SimcardIcon} alt="TickIcon" />
            <div className="text-center text-xs md:text-base">
              <input
                type="text"
                placeholder="XXX XXX XXXX"
                value={`+999 ${number && formatPhoneNumber(number)}`}
                readOnly
                className="bg-transparent border-none text-white text-sm md:text-base font-medium focus:outline-none focus:ring-0 w-full"
              />
              <div className="md:flex gap-2 space-y-1 md:space-y-0">
                {showAvailability && (
                  <p
                    className={`w-fit h-fit text-xs md:text-sm p-1 px-2 rounded-full font-bold ${
                      available ? "bg-[#489D5D]" : "bg-[#FF9900]"
                    }`}
                  >
                    {available ? "Available" : "Unavailable"}
                  </p>
                )}
                <p className="">
                  {tier === 'diamond' ? (
                    <DiamondTier />
                  ) : tier === 'golden' ? (
                    <GoldTier />
                  ) : tier === 'silver' ? (
                    <SilverTier />
                  ) : tier === 'bronze' ? (
                    <BronzeTier />
                  ) : (
                    "NA"
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex items-center gap-2">
                <img className= " h-4 md:h-8" src={BASE} alt="BASE" />
                <p className="font-bold w-12 md:w-20 text-xs md:text-base">{checkPrice(number)} ETH</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className={`font-bold text-xs md:text-base p-2 md:p-4 rounded-full w-24 md:w-40 transition-colors duration-300 ${
                  addedToCart
                    ? "bg-transparent border border-customBlue text-white shadow-customBlue shadow-md"
                    : "bg-customBlue text-white border border-customBlue"
                }`}
                onClick={onClick}
              >
                {addedToCart ? `Remove` : `Add to Cart`}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      {/* Conditionally render border for all except the last item */}
      {!isLast && (
        <div className={` mx-3 border-b border-b-[#7B8DB7]/20 ${isFirst ? 'mt-6' : ''}`}></div>
      )}
    </div>
  );
};

export default SearchResultComp;
