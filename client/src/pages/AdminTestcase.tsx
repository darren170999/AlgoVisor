import { useEffect, useState } from "react";
import FullScreenSection from "../components/FullScreenSection";
import { Box, Button, Card, CardBody, CardFooter, Divider, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Stack, Textarea, VStack } from "@chakra-ui/react";
import Header from "../components/Header";

type createTestCaseFormDataProps = {
    qnid: string;
    testcases: {
        input: string;
        output: string;
    }[];
}
// Sample format for testcases in field: 
//  [ {"input": "inputValue1", "output": "outputValue1"},
//   {"input": "inputValue2", "output": "outputValue2"}]
function AdminTestcase(){
    // const [loading, setLoading] = useState(true);

    const [createTestCaseFormData, setCreateTestCaseFormData] = useState<createTestCaseFormDataProps>({
        qnid: "",
        testcases: []
    })
    const handleCreationForm = (event: { target: { name: any; value: any; }; }) => {
        const {name, value} = event.target;
        setCreateTestCaseFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
    const handleCreation = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Check if any of the fields are empty
        
        try{
            const response = await fetch("http://localhost:8080/testcase/create" , {
                method: "POST",
                headers : {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(createTestCaseFormData),
            });
            if(response.ok){
                console.log("Form data posted successfully!");
                response.json().then((data) => {
                    console.log(data);
                    window.location.replace("/admin");
                });
            } else {
                console.log(response);
                window.location.replace("/admin/testcase");
            }
        } catch (err) {
            console.log("Dk wtf happen: ", err)
        }     
    };

    return(
        <>
        <Header/>
        <FullScreenSection backgroundColor="#1a1f71" isDarkBackground p={8} alignItems="flex-start" spacing={8}>
            <Card minW="xl">
                <CardBody>
                    <Heading as="h1">
                        Create a Test case for IE2108
                    </Heading>
                    <br></br>
                    <form onSubmit={handleCreation}>
                        <FormControl>
                            <HStack paddingBottom="10px">
                                <FormLabel minW = "100px" >Qnid</FormLabel>
                                <Input type='string' name="qnid" value={createTestCaseFormData.qnid} onChange={handleCreationForm}/>
                            </HStack>
                            <HStack paddingBottom="10px">
                                <FormLabel minW="100px">Test Cases</FormLabel>
                                <Textarea
                                    name="testcases"
                                    value={JSON.stringify(createTestCaseFormData.testcases, null, 2)} // Indent for better readability
                                    onChange={(e) => {
                                    try {
                                        console.log(createTestCaseFormData)
                                        const parsedTestCases = JSON.parse(e.target.value);
                                        setCreateTestCaseFormData((prevFormData) => ({
                                        ...prevFormData,
                                        testcases: Array.isArray(parsedTestCases) ? parsedTestCases : [],
                                        }));
                                    } catch (error) {
                                        console.error("Invalid JSON format:", error);
                                    }
                                    }}
                                />
                            </HStack>

                            
                        </FormControl>
                        <br></br>
                        <Stack>
                            <Button type='submit' color="black" >Create</Button>
                        </Stack>
                    </form>
                    
                </CardBody>
            </Card>
        </FullScreenSection>

        </>
    );
}
export default AdminTestcase;