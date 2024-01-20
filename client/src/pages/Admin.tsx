import { useEffect, useState } from "react";
import FullScreenSection from "../components/FullScreenSection";
import { Box, Button, Card, CardBody, CardFooter, Divider, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Stack, Textarea, VStack } from "@chakra-ui/react";
import Header from "../components/Header";

type createQuestionFormDataProps = {
    name: string;
    description: string;
    status: string;
    tags: string;
    qnid: string;
}

function Admin(){
    const [loading, setLoading] = useState(true);
    const [lastQnID, setLastQnID] = useState<string | null>(null);
    const callDB = async() => {
        try{
            const response = await fetch("http://localhost:8080/tutorials" , {
                method: "GET",
                headers : {
                "Content-Type": "application/json",
                },
            });
            if(response.ok){
                const data = await response.json();
                console.log(data);
                const latestQnID = data.data.data.length + 1;
                console.log(latestQnID);
                setLastQnID(latestQnID.toString());
            } else {
                console.log(response);
            }
        } catch (err) {
            console.log("Error:", err);
        } finally {
            setLoading(false);  // Set loading to false regardless of success or failure
        }     
    };

    useEffect(() => {
        callDB();
        // console.log(lastQnID)
    }, []);
    useEffect(() => {
        // Update the qnid in createQuestionFormData whenever lastQnID changes
        setCreateQuestionFormData((prevFormData) => ({ ...prevFormData, qnid: lastQnID || "" }));
      }, [lastQnID]);

    const [createQuestionFormData, setCreateQuestionFormData] = useState<createQuestionFormDataProps>({
        name: "",
        description: "",
        status: "new",
        tags: "",
        qnid: lastQnID!,
    })
    const [tagsValidationMessage, setTagsValidationMessage] = useState<string | null>(null);
    // const [emptyFieldsValidationMessage, setEmptyFieldsValidationMessage] = useState<boolean>(true);
    const validateTags = (event: { target: { value: string } }) => {
        const { value } = event.target;
        const regex = /^Tut\d+$/;
        if (regex.test(value)) {
            setTagsValidationMessage("Valid format");
        } else {
            setTagsValidationMessage("Invalid format");
        }
    }

    const handleCreationForm = (event: { target: { name: any; value: any; }; }) => {
        const {name, value} = event.target;
        if(name==="tags"){
            validateTags({target: {value}})
        }
        setCreateQuestionFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        console.log(createQuestionFormData);
    }

    const handleCreation = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // console.log(createQuestionFormData);
        
        if(tagsValidationMessage === "Valid format" ){
            try{
                const response = await fetch("http://localhost:8080/tutorials/code/create" , {
                    method: "POST",
                    headers : {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(createQuestionFormData),
                });
                if(response.ok){
                    console.log("Form data posted successfully!");
                    response.json().then((data) => {
                        console.log(data);
                    });
                } else {
                    console.log(response);
                    window.location.replace("/admin");
                }
            } catch (err) {
                console.log("Dk wtf happen: ", err)
            }     

        } else {
            console.log("Not working")
        }
    };

    return(
        <>
        <Header/>
        <FullScreenSection backgroundColor="#1a1f71" isDarkBackground p={8} alignItems="flex-start" spacing={8}>
            <Card minW="xl">
                {loading? (<div>loading</div>) :<CardBody>
                    <Heading as="h1">
                        Create a question for IE2108
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
                        {tagsValidationMessage === "Valid format"?<Stack>
                            <Button type='submit' color="black" >Create</Button>
                        </Stack> : <Stack><Button color="gray"> Create</Button></Stack>}
                    </form>
                    
                </CardBody>}
            </Card>
        </FullScreenSection>

        </>
    );
}
export default Admin;