import React, { useEffect, useState } from "react";
import { ChakraProvider, Box, Text } from "@chakra-ui/react";
import Header from "../components/Header";

function Home() {
  const [isShow, setIsShow] = useState<boolean>(true);
  const [displayText, setDisplayText] = useState<string>("");

  useEffect(() => {
    const check = localStorage.getItem("user");
    setIsShow(check === "false");

    if (check === "false") {
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
  }, []);

  return (
    <ChakraProvider>
      <Header />
      <Box position="relative">
        {isShow && (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "0px",
              paddingBottom: "56.250%",
              margin: "0",
            }}
          >
            <iframe
              allow="fullscreen;autoplay"
              allowFullScreen
              height="100%"
              src="https://staging.streamable.com/e/kk68s5?autoplay=1&muted=1&nocontrols=1"
              width="100%"
              style={{
                border: "none",
                width: "100%",
                height: "100%",
                position: "absolute",
                left: "0px",
                top: "0px",
                overflow: "hidden",
              }}
            ></iframe>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1,
              }}
            ></div>
          </div>
        )}
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
      </Box>
    </ChakraProvider>
  );
}

export default Home;
