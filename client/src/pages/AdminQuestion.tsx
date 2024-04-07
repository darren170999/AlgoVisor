import { useEffect, useState } from "react";
import FullScreenSection from "../components/FullScreenSection";
import { Box, Button, Card, CardBody, CardFooter, Divider, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Stack, Textarea, VStack } from "@chakra-ui/react";
import Header from "../components/Header";
import { createTutorial } from "../api/createTutorialQuestion";
import { sendQuestionNotifications } from "../api/sendQuestionNotifications";

type createQuestionFormDataProps = {
    name: string;
    description: string;
    examples: string;
    constraints: string;
    status: string;
    tags: string;
    qnid: string;
}

function AdminQuestion(){
    const [loading, setLoading] = useState(true);
    const [lastQnID, setLastQnID] = useState<string | null>(null);
    // const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const callDB = async() => {
        try{
            const response = await fetch("https://algovisor.onrender.com/tutorials" , {
                method: "GET",
                headers : {
                "Content-Type": "application/json",
                },
            });
            if(response.ok){
                const data = await response.json();
                const latestQnID = data.data.data.length + 1;
                setLastQnID(latestQnID.toString());
            } else {
            }
        } catch (err) {
        } finally {
            setLoading(false);  // Set loading to false regardless of success or failure
        }     
    };

    useEffect(() => {
        callDB();
    }, []);
    useEffect(() => {
        setCreateQuestionFormData((prevFormData) => ({ ...prevFormData, qnid: lastQnID || "" }));
      }, [lastQnID]);

    const [createQuestionFormData, setCreateQuestionFormData] = useState<createQuestionFormDataProps>({
        name: "",
        description: "",
        examples: "",
        constraints: "",
        status: "new",
        tags: "",
        qnid: lastQnID!,
    })
    const [tagsValidationMessage, setTagsValidationMessage] = useState<string | null>(null);
    const [isEmpty, setIsEmpty] = useState<boolean>(true);
    const validateTags = (event: { target: { value: string } }) => {
        const { value } = event.target;
        const regex = /^Tut\d+$/;
        if (regex.test(value)) {
            setTagsValidationMessage("Valid format");
        } else {
            setTagsValidationMessage("Invalid format");
        }
    }
    // console.log(createQuestionFormData)
    const handleCreationForm = (event: { target: { name: any; value: any; }; }) => {
        const {name, value} = event.target;
        if(name==="tags"){
            validateTags({target: {value}})
        }
        setCreateQuestionFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        if (Object.values({ ...createQuestionFormData, qnid: lastQnID || "" }).some((value) => value === "")) {
            setIsEmpty(true);
        } else {
            setIsEmpty(false);
        }
    }
    // console.log(isEmpty)
    const handleCreation = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // console.log(isEmpty);
        // Check if any of the fields are empty
        if (tagsValidationMessage === "Valid format") {
            try {
                const response = await createTutorial(createQuestionFormData);
                // Check if a new question was created
                if (response && response.data) {
                    const send = await sendQuestionNotifications();
                    // setCreateQuestionFormData({
                    //     name: "",
                    //     description: "",
                    //     examples: "",
                    //     constraints: "",
                    //     status: "new",
                    //     tags: "",
                    //     qnid: lastQnID!,
                    // })
                }
                window.location.replace("/admin");
            } catch (err) {
                window.location.replace("/admin/question");
            }
        } else {
            // console.log("Not working");
        }
    };
    

    return(
        <>
        <Header/>
        <FullScreenSection backgroundColor="#1a1f71" isDarkBackground p={8} alignItems="flex-start" spacing={8}>
            <Card minW="xl">
                {loading? (<div>loading</div>) :<CardBody>
                    <Heading as="h1">
                        Create a question for Algo Code
                    </Heading>
                    <br></br>
                    <form onSubmit={handleCreation}>
                        <FormControl>
                            <HStack paddingBottom="10px">
                                <FormLabel minW = "100px" >Name</FormLabel>
                                <Input type='string' name="name" value={createQuestionFormData.name} onChange={handleCreationForm}/>
                            </HStack>
                            <HStack paddingBottom="10px">
                                <FormLabel minW = "100px">Description</FormLabel>
                                <Textarea name="description" value={createQuestionFormData.description} onChange={handleCreationForm} />
                            </HStack>
                            <HStack paddingBottom="10px">
                                <FormLabel minW = "100px">Examples</FormLabel>
                                <Textarea name="examples" value={createQuestionFormData.examples} onChange={handleCreationForm} />
                            </HStack>
                            <HStack paddingBottom="10px">
                                <FormLabel minW = "100px">Constraints</FormLabel>
                                <Textarea name="constraints" value={createQuestionFormData.constraints} onChange={handleCreationForm} />
                            </HStack>
                            <VStack>
                                <HStack >
                                    <FormLabel minW = "100px">Tags</FormLabel>
                                    <Input type='string' name="tags" placeholder="eg. Tut2" 
                                    value={createQuestionFormData.tags} onChange={handleCreationForm} onBlur={validateTags}/>
                                    <FormLabel minW = "100px">qnid</FormLabel>
                                    <Input type='string' color="ghost" name="qnid" value={lastQnID!}/>
                                </HStack>
                            </VStack>
                            {tagsValidationMessage && (
                                <FormHelperText color={tagsValidationMessage === "Valid format" ? "green" : "red"}>
                                    {tagsValidationMessage}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <br></br>
                        {(tagsValidationMessage === "Valid format" && !isEmpty) ?
                        (<Stack>
                            <Button type='submit' color="black" >Create</Button>
                        </Stack>) : <Stack><Button color="gray"> Create</Button></Stack>}
                    </form>
                    
                </CardBody>}
            </Card>
        </FullScreenSection>

        </>
    );
}
export default AdminQuestion;
