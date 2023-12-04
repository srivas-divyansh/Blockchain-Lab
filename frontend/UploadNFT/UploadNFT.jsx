import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
import { FaPercent } from "react-icons/fa";
import { AiTwotonePropertySafety } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import Image from "next/image";
import uploadFileAndGetURL from '../utils/uploadFile';


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
  const [previewURL, setPreviewURL] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);

    // Generate a preview URL for image files
    if (selectedFile.type.startsWith('image/')) {
      const previewURL = URL.createObjectURL(selectedFile);
      setPreviewURL(previewURL);
    } else {
      // Clear the preview if the file is not an image
      setPreviewURL(null);
    }
  };

  const handleUpload = async () => {
    const url = await uploadFileAndGetURL(file);

    if (url) {
      // Now you can use the 'url' variable as needed
      console.log('URL returned from uploadFileAndGetURL:', url);
    }
  };

  const handlePreview = () => {
    setIsPreviewModalOpen(true);
  };

  const closePreviewModal = () => {
    setIsPreviewModalOpen(false);
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
        onFileChange={handleFileChange}
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
            handleClick={handlePreview}
            classStyle={Style.upload_box_btn_style}
          />
        </div>
      </div>
      {/* Preview Modal */}
      {isPreviewModalOpen && (
        <div className={Style.previewModal}>
          <div className={Style.previewModalContent}>
            <span className={Style.closePreviewModal} onClick={closePreviewModal}>
              &times;
            </span>
            {previewURL && (
              <img
                src={previewURL}
                alt="File Preview"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadNFT;