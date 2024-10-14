import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectNumber } from "../../../redux/numberSlice";
import { addItemToCart, clearCart, selectCartItems } from "../../../redux/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Telephone from "../../../assets/icons/Telephone.png";
import Header from "../../../components/Header";
import SearchResultComp from "./searchResultComp";
import { generateDiamondNumbers } from '../../../functions/diamond-numbers/generateDiamondNumbers';
import { generateGoldNumbers } from '../../../functions/gold-numbers/generateGoldNumbers';
import { generateSilverNumbers } from '../../../functions/silver-numbers/generateSilverNumbers';
import { generateRandomNumbers } from '../../../functions/random-numbers/generateRandomNumbers';
import { GlobalURL } from "../../../constants";
import axios from "axios";

const SearchResult = ({connectionType, setIsConnected}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedNumber = useSelector(selectNumber);
  const cart = useSelector(selectCartItems);
  const [showModal, setShowModal] = useState(false);
  const searchParams = new URLSearchParams(window.location.search);
  const [queryParam, setQueryParam] = useState(searchParams.get("n") || "");
  const [generatedNumbers, setGeneratedNumbers] = useState([]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const generateNumbers = async () => {
    try {
      const nums = await generateDiamondNumbers(queryParam);
      const nums2 = await generateGoldNumbers(queryParam);
      const nums3 = await generateSilverNumbers(queryParam);
      const nums4 = generateRandomNumbers();

      setGeneratedNumbers([...nums, ...nums2, ...nums3, ...nums4]);
    } catch (error) {
      console.error("Error generating numbers:", error);
    }
  };

  const checkAccFunc = async () => {
    try {
      const res = await axios.post(`${GlobalURL}/coinbase/getvirtuals`, {
        number: queryParam,
      });

      if (res.status === 204) {
        setAva(true);
      } else {
        setAva(false);
      }
    } catch (error) {
      console.log("errror in checking numnber", error);
    }
  };

  const [ava, setAva] = useState(true);
  useEffect(() => {
    console.log("Cart", cart);
    setShowModal(cart.length > 0);
  }, [cart]);
  useEffect(() => {
    setQueryParam(searchParams.get("n"));
    generateNumbers();
    console.log("queryParam", queryParam);
    console.log("AVA", ava);
    console.log("generatedNumbers", generatedNumbers);
    checkAccFunc();
    dispatch(clearCart());
  }, [queryParam]);


  return (
    <div className="text-white inter-font">
      <div className="bg-gradient-to-t from-[#06061E] via-[#06061E] to-blue-950 min-h-screen pb-24">
        <Header connectionType={connectionType} setIsConnected={setIsConnected}/>
        <div className="flex justify-center items-center pt-24">
          <div className="max-w-7xl mx-4 md:mx-0 space-y-3">
            <div className="flex items-center justify-center h-[72px] w-[350px] md:w-[553px] mx-auto">
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
                    <input
                      type="text"
                      placeholder="XXX XXX XXXX"
                      value={storedNumber} // Use state for the input value
                      onChange={(e) => dispatch(selectNumber(e.target.value))} // Update state on change
                      className="bg-transparent border-none text-customText font-medium focus:outline-none focus:ring-0 w-full"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <motion.button
                  className="bg-blue-600 hover:bg-blue-700 hover:cursor-not-allowed text-white font-semibold px-6 h-[72px] rounded-r-lg"
                >
                  Search
                </motion.button>
              </div>
            </div>

            <div className="pt-4 md:pt-10 space-y-3">
              <p className="text-3xl font-bold text-center">Search results</p>
              <p className="text-customText text-center">
                The number you are looking for is available!
              </p>
            </div>

            <div className="mx-2 md:mx-0 ">
              <SearchResultComp
                number={queryParam}
                showAvailability={true}
                available={ava}
                
                isFirst={true} 
              />

            </div>
            <div className="pt-2 mx-2 md:mx-0">
              <p className="text-center font-bold md:text-xl">Similar Numbers</p>
              <div className="w-[370px] md:w-full bg-[#2e2e48] border-2 border-[#7B8DB7]/20 rounded-lg mt-3 md:p-3">
                {generatedNumbers.map((number, i) => (
                  <SearchResultComp
                    number={number}
                    showAvailability={false}
                    key={i}
                    isLast={i === generatedNumbers.length - 1} // true for the last item
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Cart Summary with Smooth Transition */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.5 }}
              className="fixed inset-x-0 bottom-0 p-4 bg-blue-950 border-t border-t-customBlue"
            >
              <div className="flex justify-center items-center gap-4">
                <motion.button
                  onClick={() =>
                    handleNavigation(
                      "/virtual-number/search-results/cart-checkout"
                    )
                  }
                  whileTap={{ scale: 0.9 }}
                  className="font-bold text-xs md:text-base p-4 rounded-full bg-customBlue text-white border border-customBlue"
                >
                  Continue to Cart
                </motion.button>
                <p className="text-white text-sm md:text-base font-bold flex items-center">
                  Your Cart:
                  <div className="text-[#508FF6] bg-[#639BF7]/40 h-10 w-10 rounded-full flex items-center justify-center ml-2">
                    {cart.length}
                  </div>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchResult;
