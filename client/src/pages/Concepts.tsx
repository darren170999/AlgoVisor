import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, HStack, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import FullScreenSection from "../components/FullScreenSection";
import Header from "../components/Header";
import { useState } from "react";
import AccordionRows from "../components/AccordionRows";

function Concepts(){
    // const [items, setItems] = useState([]);
    var items = [
        {
        name: "Week 01",
        sypnopsis: "Basics of DSA",
        duration: "3 hours",
        status: "Not Completed",
        videoSrc: "https://veed.io/view/e10da77d-e9da-488e-84f4-de3a302bcfa1",
        videoDescription: "Content for week 1",
        materialSrc: "https://entuedu-my.sharepoint.com/personal/siva0049_e_ntu_edu_sg/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fsiva0049%5Fe%5Fntu%5Fedu%5Fsg%2FDocuments%2FAttachments%2FEE2108%20Week%201%20Python%2Epdf&parent=%2Fpersonal%2Fsiva0049%5Fe%5Fntu%5Fedu%5Fsg%2FDocuments%2FAttachments&ct=1697378508132&or=OWA%2DNT&cid=ed5d5089%2Dedb1%2D782b%2D562a%2D9755f5384121&ga=1",
        materialDescription: "Week 1 Materials"
        },
        {
            name: "Week 02",
            sypnopsis: "More of DSA",
            duration: "3 hours",
            status: "Not Completed",
            videoSrc: "https://veed.io/view/e10da77d-e9da-488e-84f4-de3a302bcfa1",
            videoDescription: "Content for week 2",
            materialSrc: "https://entuedu-my.sharepoint.com/personal/siva0049_e_ntu_edu_sg/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fsiva0049%5Fe%5Fntu%5Fedu%5Fsg%2FDocuments%2FAttachments%2FEE2108%20Week%201%20Python%2Epdf&parent=%2Fpersonal%2Fsiva0049%5Fe%5Fntu%5Fedu%5Fsg%2FDocuments%2FAttachments&ct=1697378508132&or=OWA%2DNT&cid=ed5d5089%2Dedb1%2D782b%2D562a%2D9755f5384121&ga=1",
            materialDescription: "Week 2 Materials"
        }
]
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
            <Accordion allowToggle colorScheme="blue">
                {items.map((item) => (
                <AccordionRows 
                name={item.name} 
                sypnopsis={item.sypnopsis} 
                duration={item.duration} 
                status={item.status} 
                videoSrc={item.videoSrc} 
                videoDescription={item.videoDescription} 
                materialSrc={item.materialSrc} 
                materialDescription={item.materialDescription}/>
                ))}
            </Accordion>
            </Card> 
        </FullScreenSection>
    </>
    );
}
export default Concepts;