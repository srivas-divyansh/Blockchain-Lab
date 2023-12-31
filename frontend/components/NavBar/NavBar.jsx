import React, {useState, useRef, useEffect} from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
//import icon
import {BsSearch} from 'react-icons/bs';
import {CgMenuLeft, CgMenuRight } from 'react-icons/cg';
//Internal import
import Style from './NavBar.module.css'
import {Discover, HelpCenter, Profile, SideBar} from './index';
import {Button} from "../componentindex";
import images from "../../img";

const NavBar = () => {
    const router = useRouter(); 
    //useState components
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [discover, setDiscover] = useState(false);
    const [help, setHelp] = useState(false);
    const [profile, setProfile] = useState(false);
    const [openSideMenu, setOpenSideMenu] = useState(false);

    const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDiscover(false);
        setHelp(false);
        setProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
    function handleCreateButtonClick() {
        // Navigate to the CreateNFT page when the button is clicked
        router.push('/createNFT'); // Replace '/createNFT' with the actual path to your CreateNFT page.
      }
      

    const openMenu = (e) => {
        const btnText = e.target.innerText;
        if(btnText == "Discover"){
            setDiscover(true);
            setHelp(false);
            setProfile(false);
        }
        else if(btnText=="Help Center"){
            setDiscover(false);
            setHelp(true);
            setProfile(false);
        }
        else{
            setDiscover(false);
            setHelp(false);
            setProfile(true);
        }
    }

    const openProfile = () => {
        if(!profile){
            setProfile(true);
            setDiscover(false);
            setHelp(false);
        } else {
            setProfile(false);
        }
    };

    const openSideBar = () => {
        if(!openSideMenu){
            setOpenSideMenu(true);
        } else {
            setOpenSideMenu(false);
        }
    };

    return (
        <div className={Style.navbar}>
            <div className={Style.navbar_container}>
                <div className={Style.navbar_container_left}>
                    <div className={Style.logo}>
                        {/*wrap the logo with link*/}
                        <Link href="/">
                    
                        <Image src={images.logo}
                         alt="NFTify"
                         width={120}
                         height={120}
                          />
                        
                        </Link>
                    </div>
                <div className={Style.navbar_container_left_box_input}>
                    <div className={Style.navbar_container_left_box_input_box}>
                        <input type='text' placeholder="Search NFT"/>
                        <BsSearch onClick={()=> {}} className={Style.search_con}/>
                    </div>
                </div>
                </div>
                {/* //end of left section */}
                <div className={Style.navbar_container_right}>
                    <div className={Style.navbar_container_right_discover}ref={dropdownRef}>
                        {/*discover menu*/}
                        <p onClick={(e) => openMenu(e)}>Discover</p>
                        {discover && (
                        <div className={Style.navbar_container_right_discover_box}>
                            <Discover />
                        </div>
                        )}
                    </div>

                    {/*help center menu*/}
                    <div className={Style.navbar_container_right_help}>
                        <p onClick={(e) => openMenu(e)}>Help Center</p>
                        {help && (
                        <div className={Style.navbar_container_right_help_box}>
                            <HelpCenter />
                        </div>
                        )}
                        </div>

                    {/* create button section*/}
                    <div className={Style.navbar_container_right_button}>
                      <Button btnName="Create" handleClick={handleCreateButtonClick}/>
                    </div>

                    {/*user profile*/}
                    <div className={Style.navbar_container_right_profile_box}>
                        <div className={Style.navbar_container_right_profile}>
                            <Image
                            src={images.user1}
                            alt="Profile"
                            width={40}
                            height={40}
                            onClick={(e) => openProfile(e)}
                            className={Style.navbar_container_right_profile}
                            />
                            {profile && <Profile />}
                        </div>
                        </div>

                    {/*menu button*/}

                    <div className={Style.navbar_container_right_menuBtn}>
                        <CgMenuRight className={Style.menuIcon}
                        onClick={() => openSideBar()}
                        />
                </div>
                </div>
            </div>

            {/*side bar*/}
            {openSideMenu && (
                <div className={Style.sideBar}>
                    <SideBar setOpenSideMenu={setOpenSideMenu}/>
                </div>
            )}
        </div>
    );
}

export default NavBar;