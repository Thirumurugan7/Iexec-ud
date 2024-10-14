// src/pages/virtual-number/cart/CartCheckout.jsx
import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../../redux/cartSlice";
import SimIcon from "../../../assets/icons/sim.png";
import HeaderLogo from "../../../assets/ud-logo.png";
import { motion } from "framer-motion";
import CartRightComp from "./CartRightComp";
import checkPrice from "../../../functions/checkPrice";
import checkTier from "../../../functions/checkTier";

const CartCheckout = () => {
  const cartItems = useSelector(selectCartItems);
  const discountValue = 0.000;
  return (
    <div className="text-white inter-font">
      <div className="lg:grid lg:grid-cols-5">
        {/* left section */}
        <div className="lg:grid lg:col-span-2 bg-gradient-to-r from-blue-950 via-[#06061E] to-blue-950 border border-[#7B8DB7]/20 h-full pb-10 lg:pb-0 lg:min-h-screen">
          <div className="">
            <div className=" flex justify-center p-4 h-16">
              <motion.button
                onClick={() => handleNavigation("/selection-page")}
                whileTap={{ scale: 0.9 }}
                className=" "
              >
                <img
                  className="h-[26px] md:h-[32px] w-[150px] md:w-[216px]"
                  src={HeaderLogo}
                  alt="HeaderLogo"
                />
              </motion.button>
            </div>
            <div className="border-b border-[#7B8DB7]/20 w-full"></div>
            <div className="mx-8 md:mx-24 pt-6 md:pt-10">
              <p className="text-2xl md:text-3xl font-bold ">Your Cart</p>
              <p className=" text-customText">
                Get your exclusive web3 phone number now
              </p>
              <div className="border-b-2 my-5 border-[#7B8DB7]/20 w-full"></div>

              {/* Render items from the cart */}
              {cartItems.map((item) => (
                <div key={item} className=" flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <img className=" h-6 md:h-8 w-6 md:w-8" src={SimIcon} alt="SimIcon" />
                    <div className="">
                      <p className=" text-base font-bold">
                        {/* {item.tier} number */}
                        <span className="capitalize">
                          {checkTier(item)}
                        </span> number
                      </p>
                      <p className=" text-xs md:text-base text-customText">
                        {/* {item.number} */}
                        +999 {item}
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <p className=" font-semibold text-base">
                      {/* Ensure item.price is a number before calling .toFixed() */}
                      ETH {parseFloat(checkPrice(item)).toFixed(3)}
                    </p>
                  </div>
                </div>
              ))}

              <div className="border-b-2 my-5 border-[#7B8DB7]/20 w-full"></div>

              {/* calculation */}
              <div className="space-y-4">
                <div className=" flex items-center justify-between">
                  <p className=" text-customText">Subtotal</p>
                  <p className=" font-semibold text-base">
                    {/* BUSD {cartItems.reduce((total, item) => total + (typeof item.price === 'number' ? item.price : parseFloat(item.price)), 0).toFixed(2)} */}
                    ETH {cartItems.reduce((total, item) => total + (parseFloat(checkPrice(item))), 0).toFixed(3)}
                  </p>
                </div>
                <div className=" flex items-center justify-between">
                  <p className=" text-customText">Referral reward</p>
                  <p className=" font-semibold text-base">ETH {discountValue}</p>
                </div>
                <div className="border-b-2 border-[#7B8DB7]/20 w-full"></div>
                <div className="flex items-center justify-between">
                  <p className=" font-bold text-xl">Total</p>
                  <p className="font-semibold text-base">
                    ETH {(
                      cartItems.reduce((total, item) => total + parseFloat(checkPrice(item)), 0) - discountValue
                    ).toFixed(3)}
                  </p>
                </div>
              </div>
              <div className="border-b-2 my-5 border-[#7B8DB7]/20 w-full"></div>

              {/* coupon redeem */}
              <div className="mx-2">
                <p className=" font-bold">Coupon code</p>
                <input
                  type="text"
                  placeholder="Enter your coupon code"
                  className="mt-2 p-3 bg-[#1F2138] h-[44px] w-full rounded-lg border border-[#7B8DB7]/20"
                />
                <div className=" flex justify-center pt-5">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className={`font-bold text-xs md:text-base p-3 w-full rounded-full bg-customBlue text-white border border-customBlue`}
                  >
                    Add Coupon Code
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right section */}
        <div className="lg:grid lg:col-span-3 bg-black h-full">
          <CartRightComp />
        </div>
      </div>
    </div>
  );
};

export default CartCheckout;