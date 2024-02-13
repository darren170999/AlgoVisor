import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, HStack, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import FullScreenSection from "../components/FullScreenSection";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import AccordionRows from "../components/AccordionRows";
type ItemType = {
    name: string;
    sypnopsis: string;
    duration: string;
    status: string;
    videoSrc: Blob;
    videoDescription: string;
    materialSrc: string;
    materialDescription: string;
  };
function Concepts(){
    const [items, setItems] = useState<ItemType[]>([]);
    const getCourses = async() => {
        // e.preventDefault();
        console.log("accessing");
        try{
            const response = await fetch("http://localhost:8080/courses", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if(response.ok){
                console.log(response);
                var res = await response.json();
                // console.log(res)
                setItems(res.data.data)
                
            }
        } catch {
            console.log("Failed")
        }
    }
    useEffect(()=>{
        getCourses()
    },[])
    return(
        <>
        <Header/>
        <FullScreenSection isDarkBackground alignItems="center" backgroundColor="#1a1f71">
        <br></br>
            <Card>
            <TableContainer minWidth={"1200px"} bgColor="#fffae5">
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