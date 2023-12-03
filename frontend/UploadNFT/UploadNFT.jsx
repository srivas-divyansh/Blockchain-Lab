import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
import { FaPercent } from "react-icons/fa";
import { AiTwotonePropertySafety } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import Image from "next/image";


//INTERNAL IMPORT
import Style from "./UploadNFT.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import images from "../img";
import { Button } from "../components/componentindex.js";
import { DropZone } from "../UploadNFT/uploadNFTindex.js";

const UploadNFT = () => {
  const [active, setActive] = useState(0);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    // Ensure a file is selected
    if (!file) {
      console.error('No file selected');
      return;
    }
    try {
      // Create a storage reference
      const storageRef = ref(storage, 'nft-images//' + file.name);

      // Upload file to Firebase storage
      await uploadBytes(storageRef, file);

      // Get the download URL of the uploaded file
      const downloadURL = await getDownloadURL(storageRef);

      // Now you can use the downloadURL for minting or any other purpose
      console.log('File uploaded successfully! Download URL:', downloadURL);
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
};
  return (
    <div className={Style.upload}>
      <DropZone
        title="JPG, PNG, WEBM , MAX 100MB"
        heading="Drag & drop file"
        subHeading="or Browse media on your device"
        itemName={itemName}
        description={description}
        royalties={royalties}
        image={images.upload}
        onFileChange={(selectedFile) => setFile(selectedFile)}
      />

      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Item Name</label>
          <input
            type="text"
            placeholder="nft name"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="6"
            placeholder="something about yourself in few words"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p>
            The description will be included on the item's detail page
            underneath its image. Markdown syntax is supported.
          </p>
        </div>
        <div className={formStyle.Form_box_input_social}>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="Royalties">Royalties</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <FaPercent />
              </div>
              <input
                type="text"
                placeholder="20%"
                onChange={(e) => setRoyalties(e.target.value)}
              />
            </div>
          </div>
          <br/>
        <div className={Style.upload_box_btn}>
          <Button
            btnName="Upload"
            handleClick={handleUpload}
            classStyle={Style.upload_box_btn_style}
          />
          <Button
            btnName="Preview"
            handleClick={() => {}}
            classStyle={Style.upload_box_btn_style}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadNFT;