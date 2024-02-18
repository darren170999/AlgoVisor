import FullScreenSection from "../components/FullScreenSection";
import { Outlet } from 'react-router-dom';
import Header from "../components/Header";
import { Text, Avatar, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, VStack, HStack, Box } from "@chakra-ui/react";
import AccordionRows from "../components/AccordionRows";
import TutorialQuestion from "../components/TutorialQuestion";
import { useEffect, useState } from "react";
type QnType = {
  name: string;
  description:string;
  status: string;
  tags: string;
  qnid: string;
};
type saveAttemptDataProps = {
  attempt: string;
  language: number;
  qnid: string;
  status: string;
  username: string;
  speed: number;
}
function Tutorials(){
  //PUT IN DB, Call everything in Tutorials one time and filter. Status is all new. 
  const [questions, setQuestions] = useState<QnType[]>([]);
  const [completedQns, setCompletedQns] = useState<string[]>([]);
  let username = localStorage.getItem("username");
  const getAttempts = async() =>{
    try {
      const response = await fetch(`http://localhost:8080/tutorials/code/check/${username}`)
      if(response.ok){
        const res = await response.json();
        const result: saveAttemptDataProps[] = res.data.data;
        const completedQnsIds = result.filter(attempt => attempt.status === "Completed")
        .map(completedAttempt => completedAttempt.qnid);
        console.log(completedQnsIds)
        setCompletedQns(completedQnsIds);

      }
    } catch (error) {
      console.log("Failed")
    }
  }
  useEffect(()=>{
    getAttempts();

  },[])

  const getQuestions = async() => {
    console.log("accessing");
    try{
        const response = await fetch("http://localhost:8080/tutorials", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if(response.ok){
            // console.log(response);
            var res = await response.json();
            setQuestions(res.data.data)
            
        }
    } catch {
        console.log("Failed")
    }
  }
  useEffect(()=>{
      getQuestions()
      console.log(questions)
  },[])

  const appropriateTabs = (tabIndex: number) => {
    const tabName = `Tut${tabIndex + 1}`;
    return questions.filter((question) => question.tags === tabName)
    .map((question)=> {
      const boolCompleted = completedQns.includes(question.qnid);
      return(
        <TutorialQuestion
        key={question.qnid}
        qnid={question.qnid}
        status={question.status}
        tags={question.tags}
        description={question.description}
        name={question.name}
        boolcompleted={boolCompleted}/>
      );
    });
  }

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
      <Tabs variant='enclosed' color={"yellow"} maxWidth=''>
        <TabList>
          {[...Array(12).keys()].map((index) => (
            <Tab key={index}>Tutorial {index + 1}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {[...Array(12).keys()].map((index) => (
                <TabPanel key={index} className={`Tut${index + 1}`}>
                  <Box overflowX="auto" w="100%" maxWidth="900px">
                    <HStack spacing={4} style={{ flexWrap: "nowrap" }}>
                      {appropriateTabs(index)}
                    </HStack>
                  </Box>
                </TabPanel>
              ))}
        </TabPanels>
      </Tabs>
      </VStack>
      </FullScreenSection>
      </>
  );
}
export default Tutorials;