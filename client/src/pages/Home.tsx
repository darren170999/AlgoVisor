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
    setIsLoggedIn(check === "true");
  
    const text = "Algo Visor - Build your future here";
    let index = 0;
    const intervalId = setInterval(() => {
      if (index >= text.length * 2) {
        index = 0; // Reset index to keep blinking
      }
      setDisplayText(text.slice(0, index) + (index % 2 === 0 ? "|" : " "));
      index++;
    }, 200);
  
    return () => clearInterval(intervalId); // Cleanup function
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
            top="30%"
            left="40%"
            transform="translate(-50%, -50%)"
            textAlign="justify"
            zIndex={2}
            paddingTop={"100px"}
              >
                <Text fontSize="5xl" color="white" fontWeight="bold" fontFamily={"IBM plex sans"} paddingBottom={"50px"}>
                  {displayText}
                </Text>
                <Text fontSize="3xl" color="white" fontWeight="bold" fontFamily={"Plex Sans TEXT 400"}>
                  NTU's very own version of a coding platform for interview practice, virtual lessons and many other life long learning endeavours.
                </Text>
            </Box>
        </>}
        
      </Box>
    </ChakraProvider>
  );
}

export default Home;
