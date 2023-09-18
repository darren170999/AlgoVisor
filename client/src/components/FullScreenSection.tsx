import * as React from "react";
import { VStack } from "@chakra-ui/react";

type FullScreenSectionProps = {
  children: React.ReactNode;
  isDarkBackground: boolean;
  [key: string] : any;
}

const FullScreenSection = ({ children, isDarkBackground, ...boxProps }: FullScreenSectionProps) => {
  return (
    <>
        <VStack
        backgroundColor={boxProps.backgroundColor}
        color={isDarkBackground ? "white" : "black"}
        >
        <VStack maxWidth="980px" minHeight="100vh" {...boxProps}>
            {children}
        </VStack>
        </VStack>
    </>
  );
};

export default FullScreenSection;
