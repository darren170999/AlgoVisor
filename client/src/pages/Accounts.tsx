import { useState } from "react";
import FullScreenSection from "../components/FullScreenSection";
import { Button, Card, CardBody, CardFooter, Divider, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Stack, VStack } from "@chakra-ui/react";

type signUpFormDataProps = {
    name: string;
    password: string;
    title: string;
    email: string;
    userName: string;
}
type loginFormDataProps = {
    userName: string;
    password: string;
}

function Accounts(){
    const [signUpFormData, setSignUpFormData] = useState<signUpFormDataProps>({
        name: "",
        password: "",
        title: "",
        email: "",
        userName: ""
    })
    const [loginFormData, setLoginFormData] = useState<loginFormDataProps>({
        userName: "",
        password: ""
    })
    const handleLoginForm = (event: { target: { name: any; value: any; }; }) => {
        const {name, value} = event.target;
        setLoginFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleSignUpForm = (event: { target: { name: any; value: any; }; }) => {
        const {name, value} = event.target;
        setSignUpFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log("Logging in");
        console.log(loginFormData);
        try{
            const response = await fetch("https://localhost:8080/")
        } catch {

        }

        
    };
    const handleSignUp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log("Signed up");
        console.log(signUpFormData);
        
    };
    const [isLogging, setIsLogging] = useState(true); //if false means sign up
    const handleToggle = () => {
        // console.log(isLogging);
        setIsLogging(!isLogging);
    }

    return(
        <>
        <FullScreenSection backgroundColor="#fc7313" isDarkBackground p={8} alignItems="flex-start" spacing={8}>
            <Card maxW="sm">
                {isLogging && <CardBody>
                    <Heading as="h1">
                        Login
                    </Heading>
                    <br></br>
                    <form onSubmit={handleLogin}>

                        <FormControl>
                            <FormLabel>User Name</FormLabel>
                            <Input type='string' name="userName" value={loginFormData.userName} onChange={handleLoginForm}/>
                            
                            <FormLabel>Password</FormLabel>
                            <Input type='password' name="password" value={loginFormData.password} onChange={handleLoginForm} />
                            

                        </FormControl>
                        <br></br>
                        <Stack>
                            <Button type='submit'>Login</Button>
                        </Stack>
                    </form>
                    
                </CardBody>}
                {!isLogging && <CardBody>
                    <Heading as="h1">
                        Sign Up
                    </Heading>
                    <br></br>
                    <form onSubmit={handleSignUp}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input type='string' name="name" value={signUpFormData.name} onChange={handleSignUpForm}/>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' name="password" value={signUpFormData.password} onChange={handleSignUpForm} />
                            <FormLabel>Title</FormLabel>
                            <Input type='string' name="title" value={signUpFormData.title} onChange={handleSignUpForm} />
                            <FormLabel>Email</FormLabel>
                            <Input type='email' name="email" value={signUpFormData.email} onChange={handleSignUpForm} />
                            <FormLabel>User Name</FormLabel>
                            <Input type='string' name="userName" value={signUpFormData.userName} onChange={handleSignUpForm}/>
                        </FormControl>
                        <br></br>
                        <Stack>
                            <Button type='submit'>Sign Up</Button>
                        </Stack>
                    </form>
                    
                </CardBody>}
                <Divider/>  
                <CardFooter>   
                    {isLogging && <Stack>
                        <Button variant={"ghost"} colorScheme={"blue"} onClick={handleToggle}>
                            New to Algo Visual? Sign Up here!
                        </Button>
                    </Stack>}
                    {!isLogging && <Stack>
                        <Button variant={"ghost"} colorScheme={"blue"} onClick={handleToggle}>
                            Already have an account? Login!
                        </Button>
                    </Stack>}
                </CardFooter>  
            </Card>
        </FullScreenSection>

        </>
    );
}
export default Accounts;