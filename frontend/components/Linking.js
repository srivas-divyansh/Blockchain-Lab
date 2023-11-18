import ethers from "ethers";
import React, { useState, useEffect } from "react";
import abi from "./contracts/MyNFT.json";

export function Linking() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
     const contractAddress = "0x5BD3D0c828a05451B0C2306737324bD394BA5174";
     const contractABI = abi.abi;
     try {
       const {ethereum} = window;
       if (ethereum){
         const account = await ethereum.request({
           method:"eth_requestAccounts",
         });
  
         window.ethereum.on("chainChanged", () => {
           window.location.reload();
         });
  
         window.ethereum.on("accountChanged", () => {
           window.location.reload();
         })
       
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       const signer = provider.getSigner();
       const contract = new ethers.Contract(contractAddress, contractABI, signer);
       setAccount(account);
       setState({provider, signer, contract});
       } else {
         alert("Please install Metamask");
       }
     } catch(error){
       console.log(error);
     }
     }
   connectWallet();
  }, []);
  console.log(state);
}