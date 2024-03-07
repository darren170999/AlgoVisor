import React, { useEffect, useState } from "react";
import { ChakraProvider, Box, Text } from "@chakra-ui/react";
import Header from "../components/Header";

function Home() {
  const [isShow, setIsShow] = useState<boolean>(true)
  useEffect(() => {
    const check = localStorage.getItem("user");
    setIsShow(check === "false");
  }, []);
  return (
    <ChakraProvider>
      <Header />
      <Box position="relative">
      {isShow && <div style={{ position: "relative", width: "100%", height: "0px", paddingBottom: "56.250%" }}>
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
            // backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          ></iframe>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
              zIndex: 1,
            }}
            ></div>
        </div>}
        <Box
          position="absolute"
          top="20%"
          left="30%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          zIndex={2}
        >
          <Text fontSize="5xl" color="white" fontWeight="bold" fontFamily={"arial"}>
            welcome to algovisor
          </Text>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Home;
