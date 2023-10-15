import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, HStack, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import FullScreenSection from "../components/FullScreenSection";
import Header from "../components/Header";
import { useState } from "react";

function Concepts(){
    const [items, setItems] = useState([]);
    var item = {
        Name: "Week 01",
        Sypnopsis: "Basics of DSA",
        Duration: "3 hours",
        Status: "Not Completed",
        videoSrc: "https://veed.io/view/e10da77d-e9da-488e-84f4-de3a302bcfa1",
        materialSrc: "https://entuedu-my.sharepoint.com/personal/siva0049_e_ntu_edu_sg/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fsiva0049%5Fe%5Fntu%5Fedu%5Fsg%2FDocuments%2FAttachments%2FEE2108%20Week%201%20Python%2Epdf&parent=%2Fpersonal%2Fsiva0049%5Fe%5Fntu%5Fedu%5Fsg%2FDocuments%2FAttachments&ct=1697378508132&or=OWA%2DNT&cid=ed5d5089%2Dedb1%2D782b%2D562a%2D9755f5384121&ga=1"
    }
    return(
        <>
        <Header/>
        <FullScreenSection isDarkBackground alignItems="center" backgroundColor="#4a4a4a">
        <br></br>
            <Card>
            <TableContainer minWidth={"1200px"}>
                <Table variant='striped'>
                    <Thead>
                    <Tr alignContent={"center"}>
                        <Th>Name</Th>
                        <Th>Sypnopsis</Th>
                        <Th>Duration</Th>
                        <Th>Status</Th>
                    </Tr>
                    </Thead>
                </Table>
            </TableContainer>
            {/* Everything in this have to be saved in the DB */}
            {}
            <Accordion allowToggle>
                <AccordionItem>
                    <AccordionButton>
                    <Box as="span" flex='3' textAlign='left'>
                        {item.Name}
                    </Box>
                    <Box as="span" flex='3' textAlign='left'>
                        {item.Sypnopsis}
                    </Box>
                    <Box as="span" flex='3' textAlign='left'>
                        {item.Duration}
                    </Box>
                    <Box as="span" flex='3' textAlign='left'>
                        {item.Status}
                    </Box>
                    <AccordionIcon/>
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <VStack>
                            <iframe width={"560px"} height={"315px"} src={item.videoSrc}
                            title = "Content for Week 01" allowFullScreen></iframe>

                        </VStack>
                        Materials:
                        <a href={item.materialSrc} download target="_blank" style={{ color: 'blue' }}> Week 1 Material</a>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            </Card> 
        </FullScreenSection>
    </>
    );
}
export default Concepts;