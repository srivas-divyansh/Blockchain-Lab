import "../styles/globals.css";
import { storage } from '../firebase';

//internal import
import { NavBar, Footer } from "../components/componentindex";

const MyApp = ({ Component, pageProps }) => (
  <div>
    <NavBar />
    <Component {...pageProps} />
    <Footer />
    <Component {...pageProps} storage={storage} />
  </div>
);

export default MyApp;