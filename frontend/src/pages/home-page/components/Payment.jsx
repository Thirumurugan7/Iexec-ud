import React, { useEffect, useState } from "react";
import { countries, GlobalURL } from "../../../constants";
import { useAccount } from "wagmi";
import { selectNumber, setNumber } from "../../../redux/numberSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";

const Payment = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("virtual");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [hasPhoneNumber, setHasPhoneNumber] = useState(false);
  const { address } = useAccount();
  const storedNumber = useSelector(selectNumber);
  const dispatch = useDispatch();
  const [fetchedData, setFetchedData] = useState(null);
  const [valueToSend, setValueToSend] = useState("");
  const [isSending, setIsSending] = useState(false);

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const trimmed = cleaned.substring(0, 10);
    const formattedNumber = trimmed.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
    return formattedNumber;
  };

  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.length <= 10) {
      const formattedValue = formatPhoneNumber(rawValue);
      setPhoneNumber(formattedValue);
      dispatch(setNumber(`+999 ${formattedValue}`));
    }
  };

  const fetchUserData = async (address) => {
    try {
      const response = await fetch(`${GlobalURL}/user/getUser/${address}`);
      const data = await response.json();
      setUserData(data.data);
      setHasPhoneNumber(!!data.data.phone);
      return data.exists;
    } catch (error) {
      console.error("Error fetching user data", error);
      return true;
    }
  };

  useEffect(() => {
    fetchUserData(address);
  }, [address]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setFetchedData(null); // Reset fetched data when option changes
    setPhoneNumber(""); // Clear phone number when option changes
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");
    setPhoneNumber(numericValue);
  };

  const getAddressByVirtualNumber = async (phoneNumber) => {
    try {
      const response = await fetch(`${GlobalURL}/user/searchVirtualnumber`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.exists) {
          console.log('Phone number exists:', data.user);
          setFetchedData(data.user);
          return data;
        } else {
          console.log('No associated phone number found.');
          return { exists: false, message: data.message };
        }
      } else {
        throw new Error(data.message || 'Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching address by phone number:', error);
      throw new Error('Unable to check phone number. Please try again later.');
    }
  };

  const getAddressByNumber = async (phoneNumber, countryCode) => {
    try {
      const response = await fetch(`${GlobalURL}/user/searchRealnumber`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phoneNumber, countryCode }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.exists) {
          console.log('Phone number exists:', data.user);
          setFetchedData(data.user);
          return data;
        } else {
          console.log('No associated phone number found.');
          return { exists: false, message: data.message };
        }
      } else {
        throw new Error(data.message || 'Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching address by phone number:', error);
      throw new Error('Unable to check phone number. Please try again later.');
    }
  };

  const getAddressByEmail = async (email) => {
    try {
      const response = await fetch(`${GlobalURL}/user/searchEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.exists) {
          console.log('Email exists:', data.user);
          setFetchedData(data.user);
          return data;
        } else {
          console.log('No associated email found.');
          return { exists: false, message: data.message };
        }
      } else {
        throw new Error(data.message || 'Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching address by email:', error);
      throw new Error('Unable to check email. Please try again later.');
    }
  };

  const handleProceed = () => {
    if (selectedOption === "virtual") {
      getAddressByVirtualNumber(phoneNumber);
    } else if (selectedOption === "real") {
      getAddressByNumber(phoneNumber, selectedCountry);
    }
    else {
      getAddressByEmail(email);
    }
  };

  const transactMoney = async (toAddress, amount) => {
    if (!window.ethereum) {
      console.error('MetaMask is not installed!');
      return;
    }

    setIsSending(true); // Set loading state to true when transaction starts

    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Initialize web3 instance
      const web3 = new Web3(window.ethereum);

      // Get the current user's account
      const fromAddress = address; // address is provided by the `useAccount` hook from wagmi

      // Convert the amount to Wei (smallest unit of ETH)
      const valueInWei = web3.utils.toWei(amount, 'ether');

      // Create the transaction object
      const transactionParameters = {
        to: toAddress, // Address to send ETH to
        from: fromAddress, // User's wallet address
        value: valueInWei, // Amount of ETH to send (in Wei)
      };

      // Send the transaction
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      console.log('Transaction hash:', txHash);

      // Optionally, you can listen for transaction receipt
      web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
        if (error) {
          console.error('Error fetching transaction receipt:', error);
        } else if (receipt) {
          console.log('Transaction successful:', receipt);
          // Optionally, add code to handle post-transaction logic (e.g., UI updates)
        }
      });
    } catch (error) {
      console.error('Error sending transaction:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="pt-8 ">
      <div className="border-b border-[#7181a5] px-5 pb-6 w-full">
        <h1 className="text-3xl font-semibold text-white">Payments</h1>
        <p className="text-customText pt-1">
          Start sending people crypto through their numbers
        </p>
      </div>

      <div className=" py-6 border-b border-[#7181a5] px-5 w-full">
        <div className="flex bg-[#121735] w-fit rounded-full">
          <button
            className={`p-3 w-fit rounded-full ${selectedOption === "virtual" ? "bg-customBlue text-white" : "text-white"}`}
            onClick={() => handleOptionChange("virtual")}
          >
            Virtual Number
          </button>
          {hasPhoneNumber && (
            <button
              className={`p-3 w-fit rounded-full ${selectedOption === "real" ? "bg-customBlue text-white" : "text-white"}`}
              onClick={() => handleOptionChange("real")}
            >
              Real Number
            </button>
          )}
          <button
              className={`p-3 w-fit rounded-full ${selectedOption === "email" ? "bg-customBlue text-white" : "text-white"}`}
              onClick={() => handleOptionChange("email")}
            >
              Email
            </button>
        </div>

        <div className="pt-8">
          {selectedOption === "virtual" ? (
            <div className="flex items-center ">
              <div
                id="country"
                className="bg-[#1F2138] px-5 h-12 border border-[#7B8DB7]/20 rounded-l-lg p-2 text-white flex items-center"
              >
                +999
              </div>
              <input
                type="tel"
                placeholder="+999 93567 94703"
                className="bg-[#1F2138]  h-12 w-52 lg:w-60 border border-[#7B8DB7]/20 p-2 text-customText"
                value={phoneNumber}
                onChange={handleInputChange}
              />
              <button className="bg-customBlue text-white h-12 rounded-r-lg px-2"
                onClick={handleProceed}>
                Proceed
              </button>
            </div>
          ) : selectedOption === 'real' ? (
            <div className="flex items-center ">
              <select
                id="country"
                className="bg-[#1F2138] max-w-20 h-12 border border-[#7B8DB7]/20 rounded-l-lg p-2 text-customText"
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
                placeholder="+1 (555) 000-000"
                className="bg-[#1F2138]  h-12 w-52 lg:w-60 border border-[#7B8DB7]/20 p-2 text-customText"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
              <button className="bg-customBlue text-white h-12 rounded-r-lg px-2"
                onClick={handleProceed}>
                Proceed
              </button>
            </div>
            ) : (
            <div>
              <input
                type="email"
                placeholder="email id"
                className="bg-[#1F2138]  rounded-l-lg h-12 w-52 lg:w-60 border border-[#7B8DB7]/20 p-2 text-customText"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="bg-customBlue text-white h-12 rounded-r-lg px-2"
                onClick={handleProceed}>
                Proceed
              </button>
              <button className="bg-customBlue text-white h-12 rounded-lg px-2 mx-2"
              onClick={() => navigate("/email/mycontacts")}>
                My Contacts
              </button>
            </div>
          )}
        </div>
      </div>
      {fetchedData ? (
        <div className="bg-[#121735] p-4 flex flex-col gap-6 w-fit sm:w-96 rounded-xl my-10 mx-4">
          <p className="text-customText break-words">
            {fetchedData.address ? fetchedData.address : fetchedData.wallet}
          </p>
          <input
            type="number"
            placeholder="Amount in ETH"
            className="h-12 border border-[#7B8DB7]/20 p-2 text-black"
            value={valueToSend}
            onChange={(e) => setValueToSend(e.target.value)}
          />
          <button
            className={`bg-customBlue text-white h-12 rounded-lg px-4 mt-4 ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => transactMoney(fetchedData.address, valueToSend)}
            disabled={isSending} // Disable the button while loading
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Payment;