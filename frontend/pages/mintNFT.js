import { useEffect } from "react";

// const web3 = createAlchemyWEb3(A)

export const mintNFT = ({state}) => {
    const {contract} = state;
    const [itemId, setItemid] = useState(0);
    useEffect(() => {
        async function NFT() {
            recipient = document.querySelector("#recipient").value;
            tokenURI = document.querySelector("#tokenURI").value;
            royal = document.querySelector("#royalitiesPercentage").value;
            const itemId = await contract.mintNFT(recipient, tokenURI, royal);
            setItemid(itemId);
        }
        contract && NFT();
    }, [contract]);
    return (
        <div>
            <h1>{itemId}</h1>
        </div>
    );
}