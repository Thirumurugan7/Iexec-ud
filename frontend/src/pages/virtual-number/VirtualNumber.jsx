import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { setNumber, selectNumber } from "../../redux/numberSlice";
import UDlogo from "../../assets/logo.png";
import Telephone from "../../assets/icons/Telephone.png";
import Light from "../../assets/light.png";
import Header from "../../components/Header";
import VirtualNumberComponent from "./VirtualNumberComponent";

const VirtualNumber = ({connectionType, setIsConnected}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedNumber = useSelector(selectNumber);
  const [inputValue, setInputValue] = useState(storedNumber.replace("+999 ", "")); // Remove +999 when displaying in input

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  const formatPhoneNumber = (value) => {
    // Remove any non-digit characters
    const cleaned = value.replace(/\D/g, "");

    // Ensure the value doesn't exceed 10 digits
    const trimmed = cleaned.substring(0, 10);

    // Split the digits into 3x3x4 format
    const formattedNumber = trimmed.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");

    return formattedNumber;
  };

  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    if (rawValue.length <= 10) {
      const formattedValue = formatPhoneNumber(rawValue);
      setInputValue(formattedValue);
      dispatch(setNumber(`+999 ${formattedValue}`)); // Include +999 in the Redux store
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0); // Ensure scroll to top after navigation
  };

  return (
    <div className="text-white inter-font">
      <div className="bg-gradient-to-t from-[#06061E] via-[#06061E] to-blue-950 h-full pb-16 md:pb-24 ">
        <img
          className="absolute mx-auto h-[200px] md:h-[200px] w-[150px] md:w-[300px] left-0 right-0 top-0"
          src={Light}
          alt="spotlight"
        />
        <Header connectionType={connectionType} setIsConnected={setIsConnected} />
        <div className="pt-20">
        <motion.button
          onClick={() => handleNavigation("/selection-page")}
          whileTap={{ scale: 0.9 }}
          className="bg-[#2B324A]/70 p-3 px-5 w-fit rounded-full m-3 lg:m-10"
        >
          <p className="flex gap-2 text-xs md:text-base font-semibold items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4 md:size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Go Back
          </p>
        </motion.button>
        </div>

        <div className="flex justify-center items-center">
          <div className="max-w-7xl mx-4 md:mx-0 space-y-3">
            <img className="h-12 w-12 mx-auto" src={UDlogo} alt="UD - Logo" />
            <p className="text-2xl md:text-3xl lg:text-4xl text-center font-bold">
              Your Web3 Mobile Number
            </p>
            <p className="text-base text-center text-customText">
              Your custom mobile number. Your Web3 identity. <br className="hidden md:block " /> The only
              wallet address you ever need to share.
            </p>
            <div className="flex items-center justify-center h-[72px] w-[350px] md:w-[553px]">
              <div className="flex items-center w-full bg-[#2e2e48] text-white rounded-lg border border-[#7B8DB7]/20 shadow-lg overflow-hidden">
                {/* Telephone Icon */}
                <div className="flex items-center justify-center p-4 bg-[#384160] h-[72px] rounded-l-lg">
                  <img className="w-10 h-10" src={Telephone} alt="Telephone" />
                </div>

                {/* Input Field */}
                <div className="flex-grow p-3">
                  <label className="block text-sm font-semibold">
                    Phone number
                  </label>
                  <div className="flex items-center">
                    <span className="text-[#A7C3FB] font-semibold">+999</span>
                    <input
                      type="text"
                      placeholder="XXX XXX XXXX"
                      value={inputValue}
                      onChange={handleInputChange}
                      className="bg-transparent border-none text-customText font-medium focus:outline-none focus:ring-0 w-full ml-2"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <motion.button
                  onClick={() => handleNavigation(`/virtual-number/search-results?n=${inputValue}`)}
                  whileTap={{ scale: 0.9 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 h-[72px] rounded-r-lg"
                >
                  Search
                </motion.button>
              </div>
            </div>
            <p className="text-customText text-center">
              <span className="italic text-customBlue">#</span> Enter minimum 10 digits
            </p>
          </div>
        </div>
      </div>

      <VirtualNumberComponent />
    </div>
  );
};

export default VirtualNumber;
