import React from "react";
import { motion } from "framer-motion";


const VirtualNumberComponent = () => {
  return (
    <div className="bg-gradient-to-t from-[#06061E] via-[#06061E] to-blue-950 h-full border-t border-[#7B8DB7]/30 p-4 md:p-10 lg:p-16">
      <div className="max-w-7xl space-y-6 md:space-y-0 mx-2 md:mx-auto md:grid md:grid-cols-3 gap-6">
        <div className="flex space-x-4">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-8 text-customBlue"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
              />
            </svg>
          </div>
          <div className="">
            <p className=" font-bold text-xl">
              Receive and Send Crypto with Ease
            </p>
            <p className=" text-customText">
              Use your virtual mobile number to map to your Web3 wallet address
              and simplify sending and receiving cryptocurrency. No need to
              share your entire wallet address, avoiding errors.
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-8 text-customBlue"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
              />
            </svg>
          </div>
          <div className="">
            <p className=" font-bold text-xl">Get Web3 Transaction Alerts</p>
            <p className=" text-customText">
              Our app provides secure and customizable notifications for your
              Web3 transactions, either as push notifications or text messages
              through our secure relay.
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-8 text-customBlue"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </div>
          <div className="">
            <p className=" font-bold text-xl">
              Decentralized VOIP and Messaging
            </p>
            <p className=" text-customText">
              Experience the future of communication with our decentralized VOIP
              and messaging platform. Choose who can contact you. Secure,
              private, and crystal clear.
            </p>
          </div>
        </div>
      </div>
      <div className=" flex justify-center pt-4 md:pt-10 lg:pt-16">
        <motion.button className=" text-customBlue font-semibold hover:underline">
          Learn more
        </motion.button>
      </div>
    </div>
  );
};

export default VirtualNumberComponent;
