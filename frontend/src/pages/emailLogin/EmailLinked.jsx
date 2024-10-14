import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

const EmailLinked = () => {
  const navigate = useNavigate();
  const account = useAccount();

  const [emailId, setEmailId] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("emailId");
    if (email) {
      setEmailId(email);
    }
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-gradient-to-tr from-[#06061E] via-[#06061E] to-blue-950 min-h-screen text-white inter-font">
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-7xl mx-4 md:mx-0">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-14 text-green-500"
            >
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="text-center mx-6 md:mx-0">
            <p className="text-2xl md:text-3xl font-bold">Email linked!</p>
            <p className="text-base text-customText">
              Congratulations! Your email has been linked to{" "}
              <br className="hidden lg:flex" /> your chosen wallet address
            </p>
          </div>
          <div className=" flex justify-center">
            <div className="bg-[#181931] h-[80px] mt-6 p-2 px-4 w-[380px] md:w-full rounded-lg border border-[#7B8DB7]/20">
              <p className="text-xl font-medium">Your current email</p>
              <p className="text-base text-customText pt-1">
                {`${emailId}` || "No Email"}
              </p>
            </div>
          </div>

          <div className="flex justify-center py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-10 text-green-600"
            >
              <path
                fillRule="evenodd"
                d="M6.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.25 4.81V16.5a.75.75 0 0 1-1.5 0V4.81L3.53 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5Zm9.53 4.28a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V7.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="bg-[#181931] h-[80px] py-3 md:p-2 px-4 w-[380px] items-center md:w-full rounded-lg border border-[#7B8DB7]/20">
            <p className="text-xl font-medium">Wallet Address</p>
            {/* Display the wallet address fetched from local storage */}
            <p className="text-xs md:text-base text-customText pt-1">
              {account.address || "No wallet address linked"}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="border-2 border-customBlue bg-customBlue hover:bg-transparent w-full p-2 rounded-full mt-6"
            onClick={() => handleNavigation("/sending-crpto/home-page")}
          >
            <p className="font-bold flex justify-center mx-auto gap-3 items-center text-center">
              Start Sending Crypto
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
      <div className="flex justify-center">
        <footer className="text-center text-gray-500 absolute bottom-0 p-2">
          &copy; Ultimate Digits 2024
        </footer>
      </div>
    </div>
  );
};

export default EmailLinked;