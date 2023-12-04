// uploadFile.js
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const uploadFileAndGetURL = async (file) => {
  try {
    // Ensure a file is selected
    if (!file) {
      console.error('No file selected');
      return null;
    }

    // Create a storage reference
    const storageRef = ref(storage, 'nft-images/' + file.name);

    // Upload file to Firebase storage
    await uploadBytes(storageRef, file);

    // Get the download URL of the uploaded file
    const url = await getDownloadURL(storageRef);

    // Now you can use the downloadURL for minting or any other purpose
    console.log('File uploaded successfully! Download URL:', url);

    return url;
  } catch (error) {
    console.error('Error uploading file:', error.message);
    return null;
  }
};

export default uploadFileAndGetURL;
