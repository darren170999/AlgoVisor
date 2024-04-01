import React, { useEffect, useState } from "react";
import { ChakraProvider, Box, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import HomeLoggedIn from "./HomeLoggedIn";
import IntroComponent from "../components/IntroComponent";
import Announcements from "../components/Announcements";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>("");
  useEffect(() => {
    const check = localStorage.getItem("user");
    setIsLoggedIn(check==="true");

    if (isLoggedIn!) {
      const text = "Welcome to algovisor";
      let index = 0;
      const intervalId = setInterval(() => {
        setDisplayText(text.slice(0, index));
        index++;
        if (index > text.length) {
          clearInterval(intervalId);
          setDisplayText(prev => prev + "|"); // Add cursor after completion
        }
      }, 200);
    }
  }, [isLoggedIn]);

  return (
    <ChakraProvider>
      <Header />
      <Box position="relative">
        {isLoggedIn ? (
          <>
            <HomeLoggedIn/>
          </>
        ) : 
        <>
          <IntroComponent/>
            <Box
            position="absolute"
            top="20%"
            left="30%"
            transform="translate(-50%, -50%)"
            textAlign="center"
            zIndex={2}
              >
                <Text fontSize="5xl" color="white" fontWeight="bold" fontFamily={"arial"}>
                  {displayText}
                </Text>
            </Box>
        </>}
        
      </Box>
    </ChakraProvider>
  );
}

export default Home;
