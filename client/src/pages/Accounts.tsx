import { useEffect, useState } from "react";
import FullScreenSection from "../components/FullScreenSection";
import { Button, Card, CardBody, CardFooter, Divider, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Stack, Textarea, VStack, useStyleConfig, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import { loginFormDataProps } from "../types/loginFormDataProps";
import { signUpFormDataProps } from "../types/signUpFormDataProps";
import { subscriberFormDataProps } from "../types/subscriberFormDataProps";
// import { sendEmail } from "../helper/sendEmail";

function Accounts(){
    const [signUpFormData, setSignUpFormData] = useState<signUpFormDataProps>({
        name: "",
        password: "",
        title: "",
        email: "",
        userName: ""
    })
    const [subscriberFormData, setSubscriberFormData] = useState<subscriberFormDataProps>({
        email: ""
    })
    const [loginFormData, setLoginFormData] = useState<loginFormDataProps>({
        userName: "",
        password: ""
    })
    const [err, setErr] = useState<String>("");
    
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
            const response = await fetch("https://algovisor.onrender.com/user/login", {
                method: "POST",
                headers : {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginFormData),
            });
            if(response.ok){
                const data = await response.json();
                if(data.message === "Login successful"){
                    localStorage.setItem('user', "true");
                    localStorage.setItem('username', loginFormData.userName);
                    if(loginFormData.userName === "SuperAdmin"){
                        localStorage.setItem('isSuperAdmin', 'true');
                    }
                    setErr("");
                    window.location.replace("/home");
                } else {
                    // console.error("Invalid username or password");
                }
            } else {
                // console.error("Error");
                // setErr("Invalid username or password");
            }
        } catch (error) {
            // console.log("Dk wtf happen: ", error)
        }

        
    };
    const handleSignUp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setSubscriberFormData({
            email: signUpFormData.email
        })
        localStorage.setItem("email", signUpFormData.email)
        try{
            // if (!signUpFormData.email.endsWith('@e.ntu.edu.sg')) {
            //     throw Error("Please enter a valid NTU email")
            // }
            const response = await fetch("https://algovisor.onrender.com/user" , {
                    method: "POST",
                    headers : {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(signUpFormData),
                });
            if(response.ok){
                response.json().then((data) => {
                });
                setIsLogging(!isLogging);
                setErr("");
                try{
                    // console.log(subscriberFormData)
                    const response = await fetch("https://algovisor.onrender.com/subscriber" , {
                            method: "POST",
                            headers : {
                            "Content-Type": "application/json",
                            },
                            body: JSON.stringify(subscriberFormData),
                        });
                    if(response.ok){
                        response.json().then((data) => {
                        });
                    } else {
                    }
                } catch (err) {
                    // console.log("Dk wtf happen: ", err)
                }
            } else {
                setErr("Username or email has been used");
            }
        } catch (err) {
            // console.log("Dk wtf happen: ", err)
        }

        
    };
    //if false means sign up, This is for checking if the user wants to login or sign up
    const [isLogging, setIsLogging] = useState(true); 
    const handleToggle = () => {
        setIsLogging(!isLogging);
        setErr("");
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
                        {err && <Text color="red">{err}</Text>}
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
                        {err && <Text color="red">{err}</Text>}
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