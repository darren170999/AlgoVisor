import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, VStack } from "@chakra-ui/react";

type AccordionRowsStandardProps = {
    name: string;
    sypnopsis: string;
    duration: string;
    status: string;
    videoSrc: string; // Use URL for video source
    videoDescription: string;
    materialSrc: string;
    materialDescription: string;
}

const AccordionRowsStandard = ({ name, sypnopsis, duration, status, videoSrc, videoDescription, materialSrc, materialDescription}: AccordionRowsStandardProps) => {
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
                <iframe
                    src={videoSrc}
                    // frameBorder="0"
                    allowFullScreen
                    style={{ width: '100%', height: 'auto' }}
                ></iframe>
                </VStack>
                Materials:
                <a href={materialSrc} download target="_blank" style={{ color: 'blue' }}> {materialDescription}</a>
            </AccordionPanel>
        </AccordionItem>
    );
};

export default AccordionRowsStandard;
