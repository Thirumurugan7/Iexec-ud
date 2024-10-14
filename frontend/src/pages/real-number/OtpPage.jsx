import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GlobalURL } from "../../constants";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OtpPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState("");
  const [otp, setOtp] = useState("");
  const account = useAccount();

  const navigate = useNavigate();

  const verifyOtpSent = async () => {
    try {
      const bodyData = {
        countryCode: countryCode,
        phoneNumber: phoneNumber,
        otp: otp,
        address: walletAddress
      };
      const response = await fetch(`${GlobalURL}/twilio-sms/verify-otp`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData)
      });
      const result = await response.json();
      if (response.ok && result.status === 'approved') {
        console.log('OTP verified successfully:', result);
        return true;
      } else {
        console.error("Failed to verify OTP:", result);
        return false;
      }
    } catch (error) {
      console.error("Error checking user existence", error);
      return false;
    }
  }
  const handleNavigation = async (path) => {
    setLoading(true);
    const isVerified = await verifyOtpSent();
    setLoading(false);
    if (isVerified) {
      navigate(path);
    }
    else {
      toast.error("OTP verification failed. Please try again.");
    }
  };

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem("phoneNumber");
    const storedCountryCode = localStorage.getItem("countryCode");
    if (storedPhoneNumber && storedCountryCode) {
      setPhoneNumber(storedPhoneNumber);
      setCountryCode(storedCountryCode);
      setWalletAddress(account.address);
    }
  }, []);

  return (
    <div className=" bg-gradient-to-tr from-[#06061E] via-[#06061E] to-blue-950 min-h-screen text-white inter-font">
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-7xl mx-4 md:mx-0">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-14 text-customBlue"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold">
              Let&apos;s verify your phone number
            </p>
            <p className="text-base text-customText">
              We&apos;ve sent a confirmation code to{" "}
              <span className="text-customBlue">{`+ ${countryCode} ${phoneNumber}` || "Enter your Phone Number"}</span>
            </p>
          </div>
          <div className=" pt-10">
            <p className="text-xl font-medium">Confirmation code</p>
            <input
              type="tel"
              placeholder="Enter 6-digit confirmation code"
              className="bg-[#1F2138] pt-2 w-full h-12 rounded-lg border border-[#7B8DB7]/20 p-2 text-customText"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className=" font-bold text-customBlue pt-3">
              Resend code
            </button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleNavigation("/otp-page/number-linked")}
              disabled={loading}
              className="border-2 border-customBlue bg-customBlue hover:bg-transparent w-full p-2 rounded-full mt-6 "
            >
              <p
                className="font-bold flex justify-center mx-auto gap-3 items-center text-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0114.32-4.32 7.964 7.964 0 00-1.208-.03A8 8 0 004 12z" />
                    </svg>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    Continue
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
                  </>
                )}
              </p>
            </motion.button>
          </div>
        </div>
      </div>
      <div className=" flex justify-center">
        <footer className="text-center text-gray-500 absolute bottom-0 p-2">
          &copy; Ultimate Digits 2024
        </footer>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OtpPage;
