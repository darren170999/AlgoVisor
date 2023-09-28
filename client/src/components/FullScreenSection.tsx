import * as React from "react";
import { VStack } from "@chakra-ui/react";
import Footer from "./Footer";
import Header from "./Header";

type FullScreenSectionProps = {
  children: React.ReactNode;
  isDarkBackground: boolean;
  [key: string] : any;
}

const FullScreenSection = ({ children, isDarkBackground, ...boxProps }: FullScreenSectionProps) => {
  return (
    <>
      <Header/>
      <VStack
      backgroundColor={boxProps.backgroundColor}
      color={isDarkBackground ? "white" : "black"}
      >
      <VStack maxWidth="980px" minHeight="100vh" {...boxProps}>
          {children}
      </VStack>
      </VStack>
      <Footer/>
    </>
  );
};

export default FullScreenSection;
