import React from "react";
import LoginSignup from "./components/Login-signup";
import topLogo from "../../assets/ud-logo.png";
import heroImage from "../../assets/heroImage.svg";

const Landing = () => {
  return (
    <div className="bg-gradient-to-tr from-blue-700 via-blue-950 to-black h-full md:max-h-screen overflow-y-hidden text-white inter-font">
      <div className=" mx-3 md:mx-6 lg:mx-10 md:grid md:grid-cols-2">
        <div className=" items-center pt-10">
          <div className=" flex justify-center">
            <img className=" h-[36px] w-[228px]" src={topLogo} alt="Logo" />
          </div>
          <p className=" text-2xl md:text-3xl lg:text-4xl font-bold text-center pt-10">
            Your Mobile Number → Your <br className=" "/>
            <span className=" bg-blue-200 bg-clip-text text-transparent">
              Crypto Wallet and Web3 Identity
            </span>
          </p>
          <div className=" flex justify-center pt-8">
            <img className=" hidden md:flex max-h-[500px] w-auto" src={heroImage} alt="" />
          </div>
        </div>

        <div className="">
          <LoginSignup />
        </div>
      </div>
    </div>
  );
};

export default Landing;
