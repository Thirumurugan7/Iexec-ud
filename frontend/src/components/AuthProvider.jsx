// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useAccount } from 'wagmi';
// import { useNavigate } from 'react-router-dom';
// import { GlobalURL } from '../constants';
// import { connectWallet } from '../App';

// const AuthContext = createContext();

// export const AuthProvider = ({ children, connectionType, isConnected }) => {
//   const account = useAccount();
//   const [coinbaseAddress, setCoinbaseAddress] = useState(null);
//   const [wagmiAddress, setWagmiAddress] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isAuthConnected, setIsAuthConnected] = useState(false);
//   const navigate = useNavigate();

//   // Fetch Coinbase wallet address or Wagmi wallet address
//   useEffect(() => {
//     const fetchCoinbaseAddress = async () => {
//       if (connectionType === 'coinbase') {
//         const address = await connectWallet();
//         if (address) {
//           setCoinbaseAddress(address);
//           setWagmiAddress(null); // Clear wagmi address
//         }
//       }
//     };

//     const fetchWagmiAddress = () => {
//       if (connectionType === 'wagmi' && account.address) {
//         setWagmiAddress(account.address);
//         setCoinbaseAddress(null); // Clear coinbase address
//       }
//     };

//     if (connectionType === 'coinbase') {
//       fetchCoinbaseAddress();
//     } else if (connectionType === 'wagmi') {
//       fetchWagmiAddress();
//     }
//   }, [connectionType, account.address, coinbaseAddress]);
//   useEffect(() => {
//     if (connectionType === 'coinbase' && coinbaseAddress) {
//       setIsAuthConnected(true); // This should be managed in the ConnectCoinbaseWallet directly
//     } else if (connectionType === 'wagmi' && wagmiAddress) {
//       setIsAuthConnected(true); // Similar handling for Wagmi
//     }
//   }, [coinbaseAddress, wagmiAddress, connectionType]);

//   useEffect(() => {
//     console.log("Current Connection Type: ", connectionType);
//     console.log("Is Connected: ", isAuthConnected);
//   }, [connectionType, isAuthConnected]);
  
//   // Get the current active address
//   const currentAddress = connectionType === 'wagmi' && wagmiAddress ? wagmiAddress : coinbaseAddress;

//   // Function to check if user exists in the backend
//   const checkIfUserExists = async (address) => {
//     try {
//       const response = await fetch(`${GlobalURL}/user/getUser/${address}`);
//       const data = await response.json();
//       console.log("User existence result:", data.exists);
//       return data.exists;
//     } catch (error) {
//       console.error("Error checking user existence", error);
//       return false;
//     }
//   };

//   useEffect(() => {
//     const handleNavigation = async () => {
//       if (isConnected && currentAddress) {
//         setLoading(true);
//         const userExists = await checkIfUserExists(currentAddress);
//         setLoading(false);
  
//         if (!userExists) {
//           navigate("/selection-page");
//         } else {
//           navigate("/sending-crpto/home-page");
//         }
//       } else if (!isConnected) {
//         console.log("Wallet is not connected");
//         navigate("/");
//       }
//     };
  
//     handleNavigation(); // Call the function to handle navigation based on the connection state
//   }, [isConnected, currentAddress, navigate]);
  

//   return (
//     <AuthContext.Provider value={{ loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);