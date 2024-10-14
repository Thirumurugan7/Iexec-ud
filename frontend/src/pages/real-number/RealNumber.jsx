import React, { useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { countries, GlobalURL } from "../../constants.js";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RealNumber = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const handleOtpSend = async () => {
    try {
      const bodyData = {
        countryCode: selectedCountry,
        phoneNumber: phoneNumber
      }; 
      const response = await fetch(`${GlobalURL}/twilio-sms/sendotp`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData)
      });
      const result = await response.json();
      if (response.ok && result.sid) {
        console.log('OTP sent successfully:', result);
        return true;
      } else {
        console.error("Failed to send OTP:", result);
        return false;
      }
    } catch (error) {
      console.error("Error checking user existence", error);
      return false;
    }
  };

  const handleNavigation = async (path) => {
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("countryCode", selectedCountry);
    setLoading(true); // Start loading

    const otpSent = await handleOtpSend();
    setLoading(false); // End loading

    if (otpSent) {
      navigate(path);
    } else {
      toast.error("Failed to send OTP! Please try again.");
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    // Allow only numbers
    const numericValue = value.replace(/[^0-9]/g, "");
    setPhoneNumber(numericValue);
  };

  return (
    <div className="bg-gradient-to-t from-[#06061E] via-[#06061E] to-blue-950 min-h-screen text-white inter-font">
      <Header />
      
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-7xl mx-4 md:mx-0">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-14 text-customBlue"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold">
              What&apos;s your phone number?
            </p>
            <p className="text-base text-customText">
              Which number would you like to use as your web3 identity
            </p>
          </div>
          <div className="pt-10 items-center mx-4 md:mx-0">
            <label className="block text-xl font-medium mr-4" htmlFor="country">
              Phone number
            </label>
            <div className="flex items-center">
              <select
                id="country"
                className="bg-[#2B324A] max-w-20 h-12 border border-[#7B8DB7]/20 rounded-l-lg p-2 text-customText"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option className="max-w-16 truncate" value="" disabled>
                  US
                </option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name} (+{country.code})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="Mobile number without country code & spaces"
                className="bg-[#1F2138] w-full h-12 rounded-r-lg border border-[#7B8DB7]/20 p-2 text-customText"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="border-2 border-customBlue bg-customBlue hover:bg-transparent w-full p-2 rounded-full mt-6"
              onClick={() => handleNavigation("/real-number/otp-page")}
              disabled={loading} // Disable the button when loading
            >
              <p className="font-bold flex justify-center mx-auto gap-3 items-center text-center">
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
      <div className="flex justify-center">
        <footer className="text-center text-gray-500 absolute bottom-0 p-2">
          &copy; Ultimate Digits 2024
        </footer>
      </div>
      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default RealNumber;
