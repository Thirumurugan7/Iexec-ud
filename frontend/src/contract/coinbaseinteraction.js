import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';
import { ethers } from 'ethers'; // Import ethers.js
import contractABI from "./abi/contract.json";
import { BASE_SEPOLIA_CONTRACT_ADDRESS } from '../constants';

export const sdk = new CoinbaseWalletSDK({
  appName: 'Ultimate Digits',
  appChainIds: [11155111],
});

export const provider = sdk.makeWeb3Provider({
  options: 'smartWalletOnly',
});

// const contractABI
const contractAddress = BASE_SEPOLIA_CONTRACT_ADDRESS;

// Function to connect wallet
export async function connectWallet() {
  try {
    const addresses = await provider.request({ method: 'eth_requestAccounts' });
    const address = addresses[0];

    const balanceInWei = await provider.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });

    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const contract = new ethers.Contract(contractAddress, contractABI, ethersProvider.getSigner());

    return {
      address,
      balance: balanceInWei,
      contract,
    };
  } catch (error) {
    if (error.code === 4001) {
      console.warn('User rejected the request to connect wallet.');
    } else {
      console.error('Error connecting to wallet:', error);
    }
    return null;
  }
}


export async function MINTNUMBERNFTBASE({ phoneNumbers, tokenUri, address, amount }) {
  const walletInfo = await connectWallet();
  if (walletInfo && walletInfo.contract) {
    try {
      const result = await walletInfo.contract.addPhoneNumbers(phoneNumbers, tokenUri, address, amount, {value: amount});
      console.log('Contract interaction result:', result);
    } catch (error) {
      console.error('Error interacting with contract:', error);
    }
  } else {
    console.error('Wallet not connected or contract instance not available.');
  }
}