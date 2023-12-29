import "../styles/globals.css";
import { storage } from '../firebase';

//internal import
import { NavBar, Footer } from "../components/componentindex";

const MyApp = ({ Component, pageProps }) => (
  <div>
    <NavBar />
    <Component {...pageProps} storage={storage} />
    <Footer />  
  </div>
);

export default MyApp;