// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

      
  // Your Firebase configuration
const firebaseConfig = {
        apiKey: "AIzaSyDv3S-WrQuzQVKCrX-PJ5sGw07TU2hkua8",
        authDomain: "nftify-afb2c.firebaseapp.com",
        projectId: "nftify-afb2c",
        storageBucket: "nftify-afb2c.appspot.com",
        messagingSenderId: "888359085341",
        appId: "1:888359085341:web:2cefc9c89af88fb65e6df4",
        measurementId: "G-ZGLNG1GFNF"

};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { storage };
