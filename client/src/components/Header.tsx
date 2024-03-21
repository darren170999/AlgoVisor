import { useState, useEffect } from "react";
import { Avatar, Box, HStack } from "@chakra-ui/react";
import { SiVisualstudio, SiVisualstudiocode } from "react-icons/si";
import { RiAdminLine, RiAdminFill } from "react-icons/ri";
import { GiWhiteBook, GiBlackBook } from "react-icons/gi";
import { FaRegFileCode, FaFileCode } from "react-icons/fa6";
import { PiChatsCircleDuotone, PiChatsCircleFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import LogOutButton from "./LogOutButton";
import LoginSignUpButton from "./LoginButton";

const iconData = [
  { name: "algovisual", IconSelected: FaFileCode, Icon: FaRegFileCode },
  { name: "townhall", IconSelected: PiChatsCircleFill, Icon: PiChatsCircleDuotone },
  { name: "concepts", IconSelected: GiBlackBook, Icon: GiWhiteBook },
  { name: "tutorials", IconSelected: SiVisualstudio, Icon: SiVisualstudiocode },
];

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const checkSuperAdmin = () => {
    setIsSuperAdmin(localStorage.getItem("isSuperAdmin") === 'true');
  };

  const checkLoggedIn = () => {
    setLoggedIn(localStorage.getItem("user") === 'true');
  };

  useEffect(() => {
    checkSuperAdmin();
    checkLoggedIn();
  }, [loggedIn]);

  const handleLogout = () => {
    localStorage.setItem('user', 'false');
    localStorage.setItem('isSuperAdmin', 'false');
  };

  const handleIconClick = (iconName: string ) => {
    setSelectedIcon(iconName === selectedIcon ? null : iconName);
  };

  return (
    <Box position="relative" backgroundColor="#fcc015">
      <Box color="black" maxWidth="1280px" margin="0 auto">
        <HStack px={18} py={2} justifyContent="space-between" alignItems="center">
          <Link to="/home">
            <Avatar name="Home" src="apple-touch-icon.png" />
          </Link>
          <HStack>
            {!loggedIn && <LoginSignUpButton />}
          </HStack>
          {loggedIn && (
            <nav>
              <HStack spacing={24}>
                {iconData.map(({ name, IconSelected, Icon }) => (
                  <Link to={`/${name}`} key={name}>
                    {selectedIcon === name ? <IconSelected size="40px" /> : <Icon size="40px" onClick={() => handleIconClick(name)} />}
                  </Link>
                ))}
                {isSuperAdmin && (
                  <Link to="/admin">
                    {selectedIcon === 'admin' ? <RiAdminFill size="40px" /> : <RiAdminLine size="40px" onClick={() => handleIconClick('admin')} />}
                  </Link>
                )}
                <LogOutButton onClick={handleLogout} />
              </HStack>
            </nav>
          )}
        </HStack>
        <HStack />
      </Box>
    </Box>
  );
}

export default Header;
