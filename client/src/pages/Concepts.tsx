import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, HStack, Heading, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import FullScreenSection from "../components/FullScreenSection";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import AccordionRows from "../components/AccordionRows";
import AccordionRowsStandard from "../components/AccordionRowsStandard";
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
  type staticItemType = {
    name: string;
    sypnopsis: string;
    duration: string;
    status: string;
    videoSrc: string;
    videoDescription: string;
    materialSrc: string;
    materialDescription: string;
  };
function Concepts(){
    const [staticItems, setStaticItems] = useState<staticItemType[]>([]);
    const getStaticCourses = async() => {
        try{
            const response = await fetch("https://algovisor.onrender.com/staticcourses", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if(response.ok){
                var res = await response.json();
                setStaticItems(res.data.data)
                
            }
        } catch {
        }
    }
    const [items, setItems] = useState<ItemType[]>([]);
    const getCourses = async() => {
        try{
            const response = await fetch("https://algovisor.onrender.com/courses", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if(response.ok){
                var res = await response.json();
                setItems(res.data.data)
                
            }
        } catch {
        }
    }
    useEffect(()=>{
        getCourses()
        getStaticCourses()
    },[])
    return(
        <>
        <Header/>
        <FullScreenSection isDarkBackground alignItems="center" backgroundColor="#1a1f71">
        <br></br>
            <>
                <Box textAlign="center" mb={4}>
                    <Heading as="h2" size="lg" color="white">Data Structures & Algorithms Fundamentals</Heading>
                </Box>
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

                <Accordion allowToggle colorScheme="blue">

                    {staticItems
                        .filter(staticItem => staticItem.videoDescription === "DSA")          
                        .map((staticitem) => (
                            <AccordionRowsStandard 
                                name={staticitem.name} 
                                sypnopsis={staticitem.sypnopsis} 
                                duration={staticitem.duration} 
                                status={staticitem.status} 
                                videoSrc={staticitem.videoSrc} 
                                videoDescription={staticitem.videoDescription} 
                                materialSrc={staticitem.materialSrc} 
                                materialDescription={staticitem.materialDescription}
                            />
                    ))}
                </Accordion>
                </Card>
            </>
            <>
                <Box textAlign="center" mb={4}>
                    <Heading as="h2" size="lg" color="white">Computer Science Fundamentals</Heading>
                </Box>
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

                <Accordion allowToggle colorScheme="blue">

                {staticItems
                    .filter(staticItem => staticItem.videoDescription === "CS")          
                    .map((staticitem) => (
                        <AccordionRowsStandard 
                            name={staticitem.name} 
                            sypnopsis={staticitem.sypnopsis} 
                            duration={staticitem.duration} 
                            status={staticitem.status} 
                            videoSrc={staticitem.videoSrc} 
                            videoDescription={staticitem.videoDescription} 
                            materialSrc={staticitem.materialSrc} 
                            materialDescription={staticitem.materialDescription}
                        />
                ))}
                </Accordion>
                </Card>
            </>
            <Box textAlign="center" mb={4}>
                <Heading as="h2" size="lg" color="white">EEE Fundamentals</Heading>
            </Box>
            <Card>
            <TableContainer minWidth={"1200px"} bgColor="#fffae5">
                <Table variant='striped'>
                {/* <TableCaption> ** NEW Content in Algo Concepts</TableCaption> */}
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
            <Accordion allowToggle colorScheme="blue">
                <AccordionRowsStandard
                name={"name"} 
                sypnopsis={"sypnopsis"} 
                duration={"duration"} 
                status={"status"} 
                videoSrc={"https://www.veed.io/view/7ef1675b-2dcd-4683-acc3-a282578895e3?panel=share"} 
                videoDescription={"videoDescription"} 
                materialSrc={"materialSrc"} 
                materialDescription={"materialDescription"}/>
            </Accordion>
            </Card> 
            {items.length > 0 ? <>
            <Box textAlign="center" mb={4}>
                    <Heading as="h2" size="lg" color="white">New* Courses</Heading>
                </Box>
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
            </> : <></>}
        </FullScreenSection>
    </>
    );
}
export default Concepts;