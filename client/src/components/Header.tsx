import { Menu, MenuButton, MenuList, MenuItem, Box, HStack, Button } from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
interface DataItem {
id: string;
email: string;
github: string;
linkedin: string;
}
function Header() {

return (
    <>
    <Box
    position="relative"
    backgroundColor="#18181b"
    >
    <Box color="white" maxWidth="1280px" margin="0 auto" >
        <HStack
        px={18}
        py={4}
        justifyContent="space-between"
        alignItems="center"
        >
        
        <Menu >
        </Menu>
        </HStack>
    </Box>
    </Box>
    </>
);
};
export default Header;
