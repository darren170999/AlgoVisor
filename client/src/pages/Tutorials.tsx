import FullScreenSection from "../components/FullScreenSection";
import { Outlet } from 'react-router-dom';
import Header from "../components/Header";
import { Text, Avatar, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, VStack, HStack, Box } from "@chakra-ui/react";
import AccordionRows from "../components/AccordionRows";
import TutorialQuestion from "../components/TutorialQuestion";
function Tutorials(){
    //PUT IN DB, Call everything in Tutorials one time and filter. Status is all uncompleted. 
    const data = [
        { id: 'T1Q1', name: 'TwoSum', description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', status: 'new', tags: 'basic' },
        { id: 'T1Q2', name: 'ThreeSum', description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', status: 'completed', tags: 'advanced' },
        { id: 'T1Q2', name: 'ThreeSum', description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', status: 'completed', tags: 'advanced' },
        { id: 'T1Q2', name: 'ThreeSum', description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', status: 'completed', tags: 'advanced' },
        // Add more question data as needed
      ];
    return(
        <>
        <Header></Header>
        <FullScreenSection backgroundColor="#1a1f71" alignItems="center" flex-direction="row"
        isDarkBackground p={8}  spacing={8}>
        <VStack>
          {" "}
          <Avatar size='2xl' src='/logo192.png'>
            {" "}{" "}
          </Avatar>
          <h1 style={{color: "#F7B600"}}></h1>
          <Heading>
            {" "}
            <h1 style={{textAlign: "center"}}>Welcome to the new IE2108 Tutorials</h1>
            <h1 style={{color: "#F7B600"}}>Please attempt them every week</h1>
            {" "}
          </Heading>
        </VStack>
        <VStack>
        <Tabs variant='enclosed' color={"yellow"}>
            <TabList>
                <Tab>Tut 1</Tab>
                <Tab>Tut 2</Tab>
                <Tab>Tut 3</Tab>
                <Tab>Tut 4</Tab>
                <Tab>Tut 5</Tab>
                <Tab>Tut 6</Tab>
                <Tab>Tut 7</Tab>
                <Tab>Tut 8</Tab>
                <Tab>Tut 9</Tab>
                <Tab>Tut 10</Tab>
                <Tab>Tut 11</Tab>
                <Tab>Tut 12</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box overflowX='auto' w= '100%' maxWidth='900px'> 
                  <HStack spacing={4}  style={{ flexWrap: 'nowrap' }}>
                  {data.map((question) => (
                      <TutorialQuestion key={question.id} id ={question.id} status={question.status} tags={question.tags}
                      description={question.description} name={question.name}/>
                  ))}
                  </HStack>                 
                </Box>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
        </Tabs>
        </VStack>
        </FullScreenSection>
        </>
    );
}
export default Tutorials;