import React from "react";
import HeaderLogo from "../../../../assets/ud-logo.png";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../../../redux/cartSlice";

const NumberNft = () => {
  const numbers = useSelector(selectCartItems);
  console.log("number", numbers);
  
  return (
    <div className="bg-gradient-to-br from-[#009EE5] via-[#00BFE5] to-[#50C9AF] shadow-md p-4 shadow-[#50C9AF] rounded-lg w-[190px] h-[180px] flex flex-col justify-between">
      <div className="">
        <img className="h-5" src={HeaderLogo} alt="HeaderLogo" />
      </div>
      <div className="font-bold">
        {numbers.map((item, index) => (
          <p key={index}>+999 {item}</p>
        ))}
      </div>
    </div>
  );
};

export default NumberNft;
