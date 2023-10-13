import { Menu, MenuButton, MenuList, MenuItem, Box, HStack, Button, Icon, Img, Avatar,  } from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faDroplet, faEye } from '@fortawesome/free-solid-svg-icons';
import LogOutButton from "./LogOutButton";
import LoginSignUpButton from "./LoginButton";
interface DataItem {
id: string;
library: string;
visualizer: string;
test: string;
}
function Header() {
    const [loggedIn, setLoggedIn] = useState<Boolean>(false);
    const [isSuperAdmin, setIsSuperAdmin] = useState<Boolean>(false);
    const checkSuperAdmin = () => {
        if(localStorage.getItem("isSuperAdmin") == 'true'){
          setIsSuperAdmin(true);
          return;
        }
        else{
          setIsSuperAdmin(false);
        }
        return;    
    };
    const checkLoggedIn = () => {
        console.log(localStorage)
        if(localStorage.getItem("user") === 'true'){
            setLoggedIn(true);
          return;
        }
        else{
            setLoggedIn(false);
        }
        return;    
    };
    useEffect(()=>{
        checkSuperAdmin();
        checkLoggedIn();
    },[isSuperAdmin, loggedIn])

    const handleLogout = () => {
        localStorage.setItem('user','false');
        localStorage.setItem('isSuperAdmin', 'false');
    };
    return (
        <>
        
            <Box position="relative" backgroundColor="#fffae5">
                <Box color="black" maxWidth="1280px" margin="0 auto" >
                    <HStack px={18} py={2} justifyContent="space-between" alignItems="center">
                        <Avatar name="Home" src="apple-touch-icon.png" />
                        <HStack>
                            {!loggedIn && <LoginSignUpButton />}
                        </HStack>
                            {loggedIn && <nav>
                                <HStack spacing={24} >
                                    <a> <FontAwesomeIcon icon={faEye} size="2x" /> </a>
                                    <a> <FontAwesomeIcon icon={faBook} size="2x"/> </a>
                                    <a> <FontAwesomeIcon icon={faDroplet} size="2x"/> </a>
                                    <a> <LogOutButton onClick={handleLogout}/></a>
                                </HStack>
                            </nav>}
                    </HStack>
                    <HStack>
                        
                    </HStack>
                </Box>
            </Box>
        </>
    );
};
export default Header;
