import { useEffect, useState } from "react";
import FullScreenSection from "../components/FullScreenSection";
import { Button, Card, CardBody, CardFooter, Divider, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Stack, VStack } from "@chakra-ui/react";
import Header from "../components/Header";

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
        try{
            const response = await fetch("http://localhost:8080/user/login", {
                method: "POST",
                headers : {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginFormData),
            });
            if(response.ok){
                // console.log("Logged in successfully!"); 
                
                const data = await response.json();
                if(data.message === "Login successful"){
                    localStorage.setItem('user', "true");
                    localStorage.setItem('username', loginFormData.userName);
                    if(loginFormData.userName === "SuperAdmin"){
                        localStorage.setItem('isSuperAdmin', 'true');
                    }
                    // console.log(localStorage);
                    window.location.replace("/home");
                } else {
                    console.log(data)
                    console.error("Invalid username or password");
                    // You can add logic here to display an error message to the user
                }
            } else {
                console.error("Error")
            }
        } catch (error) {
            console.log("Dk wtf happen: ", error)
        }

        
    };
    const handleSignUp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(signUpFormData);
        try{
            // if (!signUpFormData.email.endsWith('@e.ntu.edu.sg')) {
            //     throw Error("Please enter a valid NTU email")
            // }
            const response = await fetch("http://localhost:8080/user" , {
                    method: "POST",
                    headers : {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(signUpFormData),
                });
            if(response.ok){
            // console.log("Form data posted successfully!");
            response.json().then((data) => {
                console.log(data);
            });
            setIsLogging(!isLogging);
            } else {
            console.log(response);
            window.location.replace("/accounts");
            }
        } catch (err) {
            console.log("Dk wtf happen: ", err)
          }
        
    };
    //if false means sign up, This is for checking if the user wants to login or sign up
    const [isLogging, setIsLogging] = useState(true); 
    const handleToggle = () => {
        setIsLogging(!isLogging);
    }

    return(
        <>
        <Header/>
        <FullScreenSection backgroundColor="#1a1f71" isDarkBackground p={8} alignItems="flex-start" spacing={8}>
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
                            <Button type='submit' >Sign Up</Button>
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