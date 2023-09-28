import { Menu, MenuButton, MenuList, MenuItem, Box, HStack, Button, Icon, Img, Avatar,  } from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faDroplet, faEye } from '@fortawesome/free-solid-svg-icons';
import LoginSignUpButton from "./loginSignUpButton";
interface DataItem {
id: string;
library: string;
visualizer: string;
test: string;
}
function Header() {
    const [loggedIn, setLoggedIn] = useState<Boolean>(false);

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
