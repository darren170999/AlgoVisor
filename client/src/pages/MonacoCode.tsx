import { Box, Card, Grid, GridItem } from "@chakra-ui/react";
import Header from "../components/Header";
import MonacoEditor from "../components/MonacoEditor";
import { Outlet } from "react-router-dom";
import CodeQuestion from "../components/CodeQuestion";

function MonacoCode(){
    const data = [
        { id: 'T1Q1', name: 'Two Sum', description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', status: 'new', tags: 'basic' },
        // { id: 'T1Q2', name: 'ThreeSum', description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', status: 'completed', tags: 'advanced' },
        // Add more question data as needed
    ];
    return(
        <>
        {/* <Outlet/> */}
        <Header/>
        {/* <FullScreenSection isDarkBackground backgroundColor="#4a4a4a"> */}
        <Grid templateColumns="1fr 1fr" gap={4}>
        <GridItem>
            {/* <Card bg="white" p={8} h="100%">
            {data.id}
            </Card> */}
            {data.map((question) => (
            <CodeQuestion key={question.id} id ={question.id} status={question.status} tags={question.tags}
                description={question.description} name={question.name}/>
            ))}
        </GridItem>
        <GridItem>
            <MonacoEditor />
        </GridItem>
        </Grid>
        {/* </FullScreenSection> */}
        </>
    );
}
export default MonacoCode;