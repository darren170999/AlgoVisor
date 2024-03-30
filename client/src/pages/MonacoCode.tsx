import { Box, Card, Code, Grid, GridItem, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import MonacoEditor from "../components/MonacoEditor";
import { useParams } from "react-router-dom";
import CodeQuestion from "../components/CodeQuestion";
import { useEffect, useState } from "react";
import SuccessModal from "../components/SuccessModal";
import { QnType } from "../types/QnType";
import { TestCaseType } from "../types/TestCaseType";
import { RiOpenaiFill } from "react-icons/ri";
import { fetchAPI } from "../api/fetchAPI";
import { OpenAI } from "openai";
import { Models } from "openai/resources";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
function MonacoCode() {
    let { qnid } = useParams();
    const [question, setQuestion] = useState<QnType | null>(null);
    const [testcase, setTestCase] = useState<TestCaseType | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isChatGPTModal, setIsChatGPTModal] = useState<boolean>(false);
    const [messages, setMessages] = useState<string>();
    const [apiKey, setApiKey] = useState<string | null>(null);
    const getAdviceFromChatGPT = async (prompt:string, apiKey:string) => {
        try {
            const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });
    
            const requestBody = {
                model: "gpt-3.5-turbo-instruct", // Use a model that supports general completions
                prompt: prompt,
                max_tokens: 200,
            };
    
            const response = await openai.completions.create(requestBody); // Use general completions endpoint
            return response.choices[0].text;
        } catch (error) {
            console.error("Error fetching advice:", error);
            return null;
        }
    };
    
    useEffect(() => {
        async function fetchData() {
            try {
                const api = await fetchAPI();
                setApiKey(api);
            } catch (error) {
                console.error("Failed to fetch API key:", error);
            }
        }
        fetchData();
    }, []);
    
    // Example usage of getAdviceFromChatGPT
    const handleChatGPTIconClick = async () => {
        if(apiKey){
            const prompt = `Based on this question:\n${question?.description}\n\nExamples:\n${question?.examples}\n How can I write this code or improve on my solution?`;
            const advice = await getAdviceFromChatGPT(prompt, apiKey);
            setMessages(advice!)
        }
        setIsChatGPTModal(true)
    };
    const GetTestCase = async() => {
        try {
            const response = await fetch(`https://34.124.242.8:8080/testcase/${qnid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const res = await response.json();
                setTestCase(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch question:", error);
        }
    }

    const GetAQuestion = async () => {
        try {
            const response = await fetch(`https://34.124.242.8:8080/tutorials/code/${qnid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const res = await response.json();
                setQuestion(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch question:", error);
        }
    };

    const handleSuccess = () => {
        setSuccess(true);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCloseChatGPTModal = () => {
        setIsChatGPTModal(false);
    };

    const handleViewPerformance = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        GetAQuestion();
        GetTestCase();
    }, [qnid]);

    return (
        <>
            <Header />
            <Grid templateColumns="1fr 1fr" gap={4}>
                <GridItem>
                    {question ? (
                        <CodeQuestion
                            data = {question}
                            tc = {testcase}
                            successflag = {success}
                        />
                    ) : (
                        <p>Loading...</p>
                    )}
                </GridItem>
                <GridItem>
                    <Card>
                        <MonacoEditor 
                            tc ={testcase}
                            onSuccess={handleSuccess}/>
                    </Card>
                </GridItem>
            </Grid>
            <Box position="fixed" top={16} right={8}>
                <IconButton
                    aria-label="Open Modal"
                    icon={<RiOpenaiFill />}
                    isRound
                    size="lg"
                    onClick={handleChatGPTIconClick}
                />
            </Box>
            <Modal isOpen={isChatGPTModal} onClose={handleCloseChatGPTModal}>
                <ModalOverlay />
                <ModalContent bg="white" color="black" borderRadius="md">
                    <ModalHeader fontSize="xl" fontWeight="bold" bg="green.300" color="white">
                        Some Advice from a LLM like ChatGPT!
                    </ModalHeader>
                    <ModalCloseButton color="white" />
                    <ModalBody>
                        {messages && messages.split('\n\n').map((block, index) => (
                            <Box key={index} p={2} borderRadius="md" my={1}>
                                {block.trim().startsWith('```') ? (
                                    <Code fontSize="md" colorScheme="green" borderRadius="md" p={2} my={1}>
                                        {block.replace(/```/g, '')}
                                    </Code>
                                ) : (
                                    <Text>{block}</Text>
                                )}
                            </Box>
                        ))}
                    </ModalBody>
                </ModalContent>
            </Modal>

            <SuccessModal
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onViewPerformance={handleViewPerformance} 
            />
        </>
    );
}

export default MonacoCode;
