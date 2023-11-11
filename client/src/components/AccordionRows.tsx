import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";

type AccordionRowsProps = {
    name: string;
    sypnopsis: string;
    duration: string;
    status: string;
    videoSrc: string;
    videoDescription: string;
    materialSrc: string;
    materialDescription: string;
}

const AccordionRows = ({ name, sypnopsis, duration, status, videoSrc, videoDescription, materialSrc, materialDescription}: AccordionRowsProps) => {
  return (
    <AccordionItem>
        <AccordionButton>
        <Box as="span" flex='3' textAlign='left'>
            {name}
        </Box>
        <Box as="span" flex='3' textAlign='left'>
            {sypnopsis}
        </Box>
        <Box as="span" flex='3' textAlign='left'>
            {duration}
        </Box>
        <Box as="span" flex='3' textAlign='left'>
            {status}
        </Box>
        <AccordionIcon/>
        </AccordionButton>
        <AccordionPanel pb={4}>
            <VStack>
                <iframe width={"560px"} height={"315px"} src={videoSrc}
                title = {videoDescription} allowFullScreen></iframe>

            </VStack>
            Materials:
            <a href={materialSrc} download target="_blank" style={{ color: 'blue' }}> {materialDescription}</a>
        </AccordionPanel>
    </AccordionItem>
  );
};

export default AccordionRows;
