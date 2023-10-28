import FullScreenSection from "../components/FullScreenSection";
import { Outlet } from 'react-router-dom';
import Header from "../components/Header";
import { Avatar, Heading, VStack } from "@chakra-ui/react";
function Tutorials(){
    return(
        <>
        <Header></Header>
        <FullScreenSection backgroundColor="#4a4a4a" isDarkBackground p={8} alignItems="flex-start" spacing={8}>
        <VStack>
          {" "}
          <Avatar size='2xl' src='/logo192.png'>
            {" "}{" "}
          </Avatar>
          <h1 style={{color: "#F7B600"}}></h1>
          <Heading>
            {" "}
            <h1 style={{textAlign: "center"}}>Welcome to the new IE2108 Tutorials</h1>
            <h1 style={{color: "#F7B600"}}>Please attempt them accordingly</h1>
            {" "}
          </Heading>
        </VStack>
        </FullScreenSection>
        {/* <Outlet /> */}
            
        </>
    );
}
export default Tutorials;