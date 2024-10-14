import React, { useEffect, useState } from "react";
import HeaderLogo from "../assets/ud-logo.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAccount, useDisconnect } from "wagmi";
import { clearNumber } from "../redux/numberSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [coinbaseDisconnect, setCoinbaseDisconnect] = useState(false);
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();
  const account = useAccount();
  const dispatch = useDispatch();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
      console.log("Disconnect");
      disconnect();
      dispatch(clearNumber);
      navigate('/');
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="p-4 px-2 absolute top-0 w-full md:px-10 lg:px-24 border-b-2 border-white/10 flex items-center text-white bg-transparent">
      <motion.button
        onClick={() => handleNavigation("/selection-page")}
        whileTap={{ scale: 0.9 }}
        className="flex-1"
      >
        <img
          className="h-[26px] md:h-[32px] w-[150px] md:w-[216px]"
          src={HeaderLogo}
          alt=""
        />
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="flex gap-2 items-center"
        onClick={() => setShowModal(true)}
      >
        <p className="text-base md:text-xl font-bold">Log Out</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 0 0 0 12h3"
          />
        </svg>
      </motion.button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black max-w-sm w-full">
            <p className="text-lg font-bold mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Log Out
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
