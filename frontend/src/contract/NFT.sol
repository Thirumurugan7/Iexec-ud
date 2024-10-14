// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PhoneNumberNFT is ERC721URIStorage, Ownable {
    // Mapping from phone number to wallet address
    mapping(string => address) public phoneToWallet;
    // Mapping from wallet address to array of phone numbers
    mapping(address => string[]) public walletToPhones;

    // Event to notify when a new phone number is added and NFT is minted
    event PhoneNumberAdded(address indexed user, string phoneNumber, uint256 tokenId);

    uint256 public tokenIdCounter;

    constructor() ERC721("UDWeb3Number", "UDW3N") Ownable(msg.sender) {
        tokenIdCounter = 0;
    }

    // Modifier to ensure the phone number is unique
    modifier uniquePhoneNumber(string memory phoneNumber) {
        require(phoneToWallet[phoneNumber] == address(0), "Phone number already mapped.");
        _;
    }

    // Function to add one or more phone numbers, send an amount to a recipient address, and mint NFTs
    function addPhoneNumbers(
        string[] memory phoneNumbers,
        string memory tokenURI,
        address payable toAddress,
        uint256 amount
    ) public payable {
        // Ensure that the correct amount of Ether is sent
        require(msg.value == amount, "Incorrect amount of Ether sent.");

        // Transfer the Ether to the specified address
        toAddress.transfer(amount);

        // Mint NFTs for each phone number
        for (uint256 i = 0; i < phoneNumbers.length; i++) {
            string memory phoneNumber = phoneNumbers[i];

            // Ensure each phone number is unique
            require(phoneToWallet[phoneNumber] == address(0), "Phone number already mapped.");

            // Map the phone number to the sender's wallet address
            phoneToWallet[phoneNumber] = msg.sender;
            walletToPhones[msg.sender].push(phoneNumber);

            // Mint the NFT for each phone number
            uint256 newTokenId = tokenIdCounter;
            _mint(msg.sender, newTokenId);
            _setTokenURI(newTokenId, tokenURI);

            emit PhoneNumberAdded(msg.sender, phoneNumber, newTokenId);

            tokenIdCounter++;
        }
    }

    // Function to get the list of phone numbers mapped to a wallet address
    function getPhoneNumbersByWallet(address walletAddress) public view returns (string[] memory) {
        return walletToPhones[walletAddress];
    }

    // Function to get the wallet address mapped to a specific phone number
    function getWalletByPhoneNumber(string memory phoneNumber) public view returns (address) {
        return phoneToWallet[phoneNumber];
    }
}