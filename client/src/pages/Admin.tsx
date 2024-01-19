import { useEffect, useState } from "react";
import FullScreenSection from "../components/FullScreenSection";
import { Button, Card, CardBody, CardFooter, Divider, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Stack, VStack } from "@chakra-ui/react";
import Header from "../components/Header";

type createQuestionFormDataProps = {
    name: string;
    description: string;
    status: string;
    tags: string;
    qnid: string;
}

function Accounts(){
    const [createQuestionFormData, setCreateQuestionFormData] = useState<createQuestionFormDataProps>({
        name: "",
        description: "",
        status: "new",
        tags: "",
        qnid: ""
    })

    const handleSignUpForm = (event: { target: { name: any; value: any; }; }) => {
        const {name, value} = event.target;
        setCreateQuestionFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleCreation = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(createQuestionFormData);
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
    };

    return(
        <>
        <Header/>
        <FullScreenSection backgroundColor="#1a1f71" isDarkBackground p={8} alignItems="flex-start" spacing={8}>
            <Card minW="xl">
                {<CardBody>
                    <Heading as="h1">
                        Create a question for IE2108
                    </Heading>
                    <br></br>
                    <form onSubmit={handleCreation}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input type='string' name="name" value={createQuestionFormData.name} onChange={handleSignUpForm}/>
                            <FormLabel>Description</FormLabel>
                            <Input type='textarea' name="description" value={createQuestionFormData.description} onChange={handleSignUpForm} />
                            <FormLabel>Tags</FormLabel>
                            <Input type='string' name="tags" value={createQuestionFormData.tags} onChange={handleSignUpForm} />
                            <FormLabel>qnid</FormLabel>
                            <Input type='string' name="qnid" value={createQuestionFormData.qnid} onChange={handleSignUpForm}/>
                        </FormControl>
                        <br></br>
                        <Stack>
                            <Button type='submit' >Create</Button>
                        </Stack>
                    </form>
                    
                </CardBody>}
            </Card>
        </FullScreenSection>

        </>
    );
}
export default Accounts;