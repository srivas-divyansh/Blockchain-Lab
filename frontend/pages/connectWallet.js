import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
// import ethers from "ethers";
// import abi from "../components/contracts/MyNFT.json";
//import linking.js file from frontend/pages/linking.js
import linking from "./linking";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "../styles/connectWallet.module.css";
import images from "../img";
const connectWallet = () => {
  const router = useRouter();

  const handleClick = () => {
    // Redirect to the new page with linking.js code
    router.push('/linking');
  };
  const [activeBtn, setActiveBtn] = useState(1);
  const providerArray = [
    {
      provider: images.provider1,
      name: "Metamask",
    },
  ]; 
 
  
  return (
    <div className={Style.connectWallet}>
      <div className={Style.connectWallet_box}>
        <h1>Connect your wallet</h1>
        <p className={Style.connectWallet_box_para}>
          Connect with a wallet provider to get started
        </p>

        <div className={Style.connectWallet_box_provider}>
          {providerArray.map((el, i) => (
            <div
              className={`${Style.connectWallet_box_provider_item} ${
                activeBtn == i + 1 ? Style.active : ""
              }`}
              key={i + 1}
              onClick={() => {
                setActiveBtn(i + 1);
                handleClick();
              }}
            >
              <p></p>
              <Image
                src={el.provider}
                alt={el.provider}
                width={50}
                height={50}
                className={Style.connectWallet_box_provider_item_img}
              />
              <p>{el.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default connectWallet;