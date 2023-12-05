
import ethers from "ethers";
// import {useState, useEffect} from "react";
import abi from  "../components/contracts/MyNFT.json";


export const linkingDetails = async () => {
    const [state, setState] = useState({
      provider: null,
      signer: null,
      contract: null
    });
    const [account, setAccount] = useState("None");
    
    useEffect(() => {
        const linking = async () => {
            const contractAddress = "0x5BD3D0c828a05451B0C2306737324bD394BA5174";
            const contractABI = abi.abi;
            try {
            const {ethereum} = window;
            if (ethereum){
                const [account] = await ethereum.request({
                method:"eth_requestAccounts",
                });
            
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
        };
        linking();
    }, []);
    return {
        currentState: state,
        currentAccount: account
    };
}