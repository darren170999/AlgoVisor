import { useEffect, useState } from "react";
import FullScreenSection from "../components/FullScreenSection";
import { Box, Button, Card, CardBody, CardFooter, Divider, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Stack, Textarea, VStack } from "@chakra-ui/react";
import Header from "../components/Header";
import { StringLiteral } from "typescript";
import { stringify } from "querystring";

type createCourseFormDataProps = {
    duration: string;
    materialDescription: string;
    materialSrc: string;
    name: string;
    status: string;
    sypnopsis: string;
    videoDescription: string;
    // videoSrc : File | null;
}

type createVideoFormDataProps = {
    videoSrc : File | null;
}

function AdminCourse(){
    const [createCourseFormData, setCreateCourseFormData] = useState<createCourseFormDataProps>({
        duration: "",
        materialDescription: "",
        materialSrc: "",
        name: "",
        status: "",
        sypnopsis: "",
        videoDescription: "",
    })
    const [createVideoFormData, setCreateVideoFormData] = useState<createVideoFormDataProps>({
        videoSrc: null,
    })
    const [file, setFile] = useState<File | null>(null);
    const [filename, setFilename] = useState('');
    const [isEmpty, setIsEmpty] = useState<boolean>(true);
    const [tagsValidationMessage, setTagsValidationMessage] = useState<string | null>(null);
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
        setCreateCourseFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        if (Object.values({ ...createCourseFormData}).some((value) => value === "")) {
            setIsEmpty(true);
        } else {
            setIsEmpty(false);
        }
        console.log(createCourseFormData)
    }
    
    const handleCreation = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Create a new FormData object
        // const formData = new FormData();

        // // Append text data to the FormData object
        // Object.entries(createCourseFormData).forEach(([key, value]) => {
        //     if(key != "videoSrc"){
        //         formData.append(key, value as string);
        //     }
        // });
        // console.log(formData)
        // Append the file to the FormData object
        // if (createCourseFormData.videoSrc) {
        //     formData.append("videoSrc", createCourseFormData.videoSrc);
        // }
        try{
            
            const response = await fetch("http://localhost:8080/course/create", {
                method: "POST",
                body: JSON.stringify(createCourseFormData),
                headers: {
                    'Content-Type': 'application/json'
                }
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
    const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setCreateVideoFormData((prevFormData) => ({ ...prevFormData, videoSrc: file }));
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        setFile(selectedFile);
    };
    
    const handleFilenameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilename(event.target.value);
    };
    

    const handleVideoUpload = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(file)
        console.log(filename)
        if (!file || !filename) {
        alert('Please select a file and enter a filename.');
        return;
        }

        const formData = new FormData();
        formData.append('videoSrc', file);
        formData.append('filename', filename);
        try {
            const response = await fetch("http://localhost:8080/course/create/video", {
                method: "POST",
                body: formData,
            });
            if(response.ok){
                console.log("Video uploaded successfully!");
                // Optionally handle response data here
            } else {
                console.log(response);
            }
        } catch (err) {
            console.log("Error:", err);
        }
    };

    return(
        <>
        <Header/>
        <FullScreenSection backgroundColor="#1a1f71" isDarkBackground p={8} alignItems="flex-start" spacing={8}>
            <Card minW="xl">
                <CardBody>
                    <Heading as="h1">
                        Create a Course for Concepts
                    </Heading>
                    <br></br>
                    <form onSubmit={handleCreation}>
                        <FormControl>
                            <HStack paddingBottom="10px">
                                <FormLabel minW = "100px" >Course Name</FormLabel>
                                <Input type='string' name="name" value={createCourseFormData.name} onChange={handleCreationForm}/>
                            </HStack>
                            <HStack paddingBottom="10px">
                                <FormLabel minW = "100px" >Duration</FormLabel>
                                <Input type='string' name="duration" value={createCourseFormData.duration} onChange={handleCreationForm}/>
                            </HStack>
                            <HStack paddingBottom="10px">
                                <FormLabel minW = "100px" >Description</FormLabel>
                                <Textarea name="materialDescription" value={createCourseFormData.materialDescription} onChange={handleCreationForm}/>
                            </HStack>
                            <HStack paddingBottom="10px">
                                <FormLabel minW = "100px" >Material's Link</FormLabel>
                                <Input type='string' name="materialSrc" value={createCourseFormData.materialSrc} onChange={handleCreationForm}/>
                            </HStack>
                            <HStack paddingBottom="10px">
                                <FormLabel minW = "100px" >Status</FormLabel>
                                <Input type='string' name="status" value={createCourseFormData.status} onChange={handleCreationForm}/>
                            </HStack>
                            <HStack paddingBottom="10px">
                                <FormLabel minW = "100px">Sypnopsis</FormLabel>
                                <Textarea name="sypnopsis" value={createCourseFormData.sypnopsis} onChange={handleCreationForm} />
                            </HStack>
                            <HStack paddingBottom="10px">
                                <FormLabel minW = "100px">Video Description</FormLabel>
                                <Textarea name="videoDescription" value={createCourseFormData.videoDescription} onChange={handleCreationForm} />
                            </HStack>
                        </FormControl>
                        <br></br>
                        {(!isEmpty) ?
                        (<Stack>
                            <Button type='submit' color="black" >Create</Button>
                        </Stack>) : <Stack><Button color="gray"> Create</Button></Stack>}
                    </form>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <form onSubmit={handleVideoUpload}>
                                <FormControl>
                                    <HStack paddingBottom="10px">
                                        <FormLabel minW = "100px">Upload Video</FormLabel>
                                        <Input type='file' name="file" onChange={handleFileChange} /> 
                                        {/* name="videoSrc" accept="video/mp4" formEncType="multipart/form-data" */}
                                    </HStack>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Filename</FormLabel>
                                    <Input type="text" name = "filename" value={filename} onChange={handleFilenameChange} />
                                </FormControl>
                                <br></br>
                                <Button type="submit">Upload</Button>
                            </form>
                        </CardBody>
                    </Card>
                    
        </FullScreenSection>

        </>
    );
}
export default AdminCourse;