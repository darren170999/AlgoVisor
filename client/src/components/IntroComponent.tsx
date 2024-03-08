import { Text, Input, Tr, Td, Button, ChakraProvider, Tbody, Grid, GridItem, HStack, TableContainer, Accordion, AccordionItem } from "@chakra-ui/react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { start } from "repl";
import { CloseIcon, Icon } from "@chakra-ui/icons";

function IntroComponent() {

  return (
    <>
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
    </>
  );
}

export default IntroComponent;
