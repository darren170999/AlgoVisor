import { useEffect, useState } from "react";
import FullScreenSection from "../components/FullScreenSection";
import { Box, Button, Card, CardBody, CardFooter, Divider, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Stack, Textarea, VStack, Select } from "@chakra-ui/react";
import Header from "../components/Header";
import axios from "axios";
import { fetchAllQuestions } from "../api/fetchAllQuestions";
import { fetchAllTestcases } from "../api/fetchAllTestcases";
import { TestCaseType } from "../types/TestCaseType";
import { deleteQuestion } from "../api/deleteQuestion";
import { deleteTestcase } from "../api/deleteTestcase";

function AdminDelete() {
    const [selectedItem1, setSelectedItem1] = useState("");
    const [selectedItem2, setSelectedItem2] = useState("");
    const [testcaseOptions, setTestcaseOptions] = useState([]);
    const [questionOptions, setQuestionOptions] = useState([]);
    const [options, setOptions] = useState([]);
    // const [dataList, setDataList] = useState<TestCaseType[]>([]);
    const [isChosen, setIsChosen] = useState(false);
    useEffect(() => {
        // Fetch test cases data
        fetchAllTestcases()
        .then(data => {
            const res = data.data;
            const qnidList = res.map((item: {qnid:number}) => item.qnid)
            setTestcaseOptions(qnidList)
        })
        .catch(error => {
            console.error("Error fetching questions:", error);
        });

        // Fetch questions data
        fetchAllQuestions()
        .then(data => {
            const res = data.data;
            const qnidList = res.map((item: {qnid:number}) => item.qnid)
            setQuestionOptions(qnidList);
        })
        .catch(error => {
            console.error("Error fetching questions:", error);
        });
        console.log(testcaseOptions)
        console.log(questionOptions)
    }, []);
    useEffect(()=>{
        if(selectedItem1 === "question"){
            setOptions(questionOptions)
            setIsChosen(true);
        } else if(selectedItem1 === "testcase"){
            setOptions(testcaseOptions);
            setIsChosen(true);
        }
    },[selectedItem1])
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedItem1 === "question") {
            await deleteQuestion(parseInt(selectedItem2));
            // Handle success or failure
        } else if (selectedItem1 === "testcase") {
            await deleteTestcase(parseInt(selectedItem2));
            // Handle success or failure
        }
        window.location.replace("/admin");
    };
    return (
        <>
            <Header />
            <FullScreenSection backgroundColor="#1a1f71" isDarkBackground p={8} alignItems="flex-start" spacing={8}>
                <Card minW="xl">
                    <CardBody>
                        <Heading as="h1">
                            Deletion
                        </Heading>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <FormControl>
                                <FormLabel>What must go?</FormLabel>
                                <Select value={selectedItem1} onChange={(e) => setSelectedItem1(e.target.value)}>
                                    <option value="default">Please Choose</option>
                                    <option value="testcase">TestCase</option>
                                    <option value="question">Question</option>
                                </Select>
                            </FormControl>
                            <br />
                            {selectedItem1 && (
                                <FormControl>
                                    <FormLabel>Qnid</FormLabel>
                                    <Select value={selectedItem2} onChange={(e) => setSelectedItem2(e.target.value)}>
                                        <option value="defaultOption">Please Choose</option>
                                        {options.map(option => (
                                            <option value={option}>{option}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                            <br />
                            {selectedItem1 && selectedItem2 && <Stack>
                                <Button type='submit' color="black">Delete</Button>
                            </Stack>}
                        </form>
                    </CardBody>
                </Card>
            </FullScreenSection>
        </>
    );
}

export default AdminDelete;
