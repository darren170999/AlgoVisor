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
    hiddentestcases: {
        input: string;
        output: string;
    }[];
}
// Sample format for testcases in field: 
//  [ {"input": "inputValue1", "output": "outputValue1"},
//   {"input": "inputValue2", "output": "outputValue2"}]
function AdminTestcase(){
    const [createTestCaseFormData, setCreateTestCaseFormData] = useState<createTestCaseFormDataProps>({
        qnid: "",
        testcases: [{ input: "", output: "" }],
        hiddentestcases: [{ input: "", output: "" }],
    })
    const handleQnidForm = (event: { target: { name: any; value: any; };}) => {
        const {name, value} = event.target;
        setCreateTestCaseFormData((prevFormData) => ({...prevFormData, [name]:value})) 
    }
    const handleCreationForm = (index: number, event: { target: { name: any; value: any; }; }) => {
        const {name, value} = event.target;
        const updatedTestcases = [...createTestCaseFormData.testcases];
        updatedTestcases[index] = {
          ...updatedTestcases[index],
          [name]: value,
        };
        setCreateTestCaseFormData((prevFormData) => ({ ...prevFormData, testcases: updatedTestcases, }));
    }
    const handleHiddenCreationForm = (index: number, event: { target: { name: any; value: any; }; }) => {
        const {name, value} = event.target;
        const updatedTestcases = [...createTestCaseFormData.hiddentestcases];
        updatedTestcases[index] = {
          ...updatedTestcases[index],
          [name]: value,
        };
        setCreateTestCaseFormData((prevFormData) => ({ ...prevFormData, hiddentestcases: updatedTestcases, }));
    }
    const handleAddTestcase = () => {
        setCreateTestCaseFormData((prevFormData) => ({
          ...prevFormData,
          testcases: [...prevFormData.testcases, { input: "", output: "" }],
        }));
    };
    
    const handleRemoveTestcase = (index: number) => {
        const updatedTestcases = [...createTestCaseFormData.testcases];
        updatedTestcases.splice(index, 1);
    
        setCreateTestCaseFormData((prevFormData) => ({
          ...prevFormData,
          testcases: updatedTestcases,
        }));
    };
    const handleAddHiddenTestcase = () => {
        setCreateTestCaseFormData((prevFormData) => ({
          ...prevFormData,
          hiddentestcases: [...prevFormData.hiddentestcases, { input: "", output: "" }],
        }));
    };
    
    const handleRemoveHIddenTestcase = (index: number) => {
        const updatedTestcases = [...createTestCaseFormData.hiddentestcases];
        updatedTestcases.splice(index, 1);
    
        setCreateTestCaseFormData((prevFormData) => ({
          ...prevFormData,
          hiddentestcases: updatedTestcases,
        }));
    };
    const handleCreation = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
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
                // window.location.replace("/admin/testcase");
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
                        Create Test cases for IE2108
                    </Heading>
                    <br></br>
                    <form onSubmit={handleCreation}>
                        <FormControl>
                            <HStack paddingBottom="10px">
                                <FormLabel minW = "100px" >Qnid</FormLabel>
                                <Input type='string' name="qnid" value={createTestCaseFormData.qnid} onChange={handleQnidForm}/>
                            </HStack>
                            {createTestCaseFormData.testcases.map((testcase, index) => (
                            <VStack key={index} spacing={2}>
                                <HStack paddingBottom="10px">
                                    <FormLabel minW="100px">Input</FormLabel>
                                    <Input
                                        type="text"
                                        name="input"
                                        value={testcase.input}
                                        onChange={(e) => handleCreationForm(index, e)}
                                    />
                                    <FormLabel minW="100px">Output</FormLabel>
                                    <Input
                                        type="text"
                                        name="output"
                                        value={testcase.output}
                                        onChange={(e) => handleCreationForm(index, e)}
                                    />
                                    <Button onClick={() => handleRemoveTestcase(index)}>
                                    X
                                    </Button>
                                </HStack>
                            </VStack>
                            ))}
                            <Stack>
                            <Button type="button" onClick={handleAddTestcase}>
                                Add Test Case
                            </Button>
                            <br></br>
                            <Divider/>
                            <br></br>
                            </Stack>
                            {createTestCaseFormData.hiddentestcases.map((hiddentestcase, index) => (
                            <VStack key={index} spacing={2}>
                                <HStack paddingBottom="10px">
                                    <FormLabel minW="100px">Input</FormLabel>
                                    <Input
                                        type="text"
                                        name="input"
                                        value={hiddentestcase.input}
                                        onChange={(e) => handleHiddenCreationForm(index, e)}
                                    />
                                    <FormLabel minW="100px">Output</FormLabel>
                                    <Input
                                        type="text"
                                        name="output"
                                        value={hiddentestcase.output}
                                        onChange={(e) => handleHiddenCreationForm(index, e)}
                                    />
                                    <Button onClick={() => handleRemoveHIddenTestcase(index)}>
                                    X
                                    </Button>
                                </HStack>
                            </VStack>
                            ))}
                            <Stack>
                            <Button type="button" onClick={handleAddHiddenTestcase}>
                                Add Hidden Test Case
                            </Button>
                            </Stack>

                            
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