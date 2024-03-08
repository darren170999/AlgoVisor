import { Avatar, Box, HStack } from "@chakra-ui/react";
import { faBook, faDroplet, faEye, faHouse, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import LogOutButton from "./LogOutButton";
import LoginSignUpButton from "./LoginButton";
import { Link } from "react-router-dom";
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
    },[loggedIn])

    const handleLogout = () => {
        localStorage.setItem('user','false');
        localStorage.setItem('isSuperAdmin', 'false');
    };
    return (
        <>
            <Box position="relative" backgroundColor="#fcc015">
                <Box color="black" maxWidth="1280px" margin="0 auto" >
                    <HStack px={18} py={2} justifyContent="space-between" alignItems="center">
                        <Link to="/home">
                            <Avatar name="Home" src="apple-touch-icon.png" />
                        </Link>
                        <HStack>
                            {!loggedIn && <LoginSignUpButton />}
                        </HStack>
                            {loggedIn && <nav>
                                <HStack spacing={24} >
                                    <Link to="/visualizer">
                                        <FontAwesomeIcon icon={faEye} size="2x" />
                                    </Link>
                                    <Link to="/townhall">
                                        <FontAwesomeIcon icon={faHouse} size="2x" />
                                    </Link>
                                    <Link to="/concepts">
                                        <FontAwesomeIcon icon={faBook} size="2x" />
                                    </Link>
                                    <Link to="/tutorials">
                                        <FontAwesomeIcon icon={faDroplet} size="2x" />
                                    </Link>
                                    {isSuperAdmin ? <Link to="/admin">
                                        <FontAwesomeIcon icon={faLockOpen} size="2x" />
                                    </Link> : <FontAwesomeIcon icon={faLock} size="2x" />}

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
