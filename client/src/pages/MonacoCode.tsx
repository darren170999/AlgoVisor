import { Box, Card, Grid, GridItem } from "@chakra-ui/react";
import Header from "../components/Header";
import MonacoEditor from "../components/MonacoEditor";

function MonacoCode(){
    return(
        <>
        <Header/>
        {/* <FullScreenSection isDarkBackground backgroundColor="#4a4a4a"> */}
        <Grid templateColumns="1fr 1fr" gap={4}>
        <GridItem>
            <Card bg="white" p={8} h="100%">
            Two Sum
            </Card>
            {/* <Box bg="white" p={4} h="100%">
            Two Sum
            </Box> */}
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