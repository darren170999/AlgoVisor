import { Box, Card, Grid, GridItem, IconButton, Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import Header from "../components/Header";
import MonacoEditor from "../components/MonacoEditor";
import { useParams } from "react-router-dom";
import CodeQuestion from "../components/CodeQuestion";
import { useEffect, useState } from "react";
import SuccessModal from "../components/SuccessModal";
import { QnType } from "../types/QnType";
import { TestCaseType } from "../types/TestCaseType";
import { RiOpenaiFill } from "react-icons/ri";
import OpenAI from "openai";
function MonacoCode() {
    let { qnid } = useParams();
    const [question, setQuestion] = useState<QnType | null>(null);
    const [testcase, setTestCase] = useState<TestCaseType | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isChatGPTModal, setIsChatGPTModal] = useState<boolean>(false);
    const [advice, setAdvice] = useState<string>("");
    const openai = new OpenAI({
        apiKey: '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'
    });
    
      const getAdviceFromChatGPT = async (prompt: string) => {
        try {
            const response = await fetch("https://api.openai.com/v1/engines/davinci/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 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" // Replace with your OpenAI API key
                },
                body: JSON.stringify({
                    prompt: prompt,
                    max_tokens: 50 // Maximum number of tokens to generate in the response
                })
            });

            if (response.ok) {
                const data = await response.json();
                setAdvice(data.choices[0].text.trim()); // Set the advice received from API
            } else {
                console.error("Failed to get advice:", response.status);
            }
        } catch (error) {
            console.error("Error fetching advice:", error);
        }
    };
    const handleChatGPTIconClick = () => {
        setIsChatGPTModal(true);
        // Call the function to fetch advice when the icon is clicked
        const prompt = `${question?.name}\n\n${question?.description}\n\nExamples:\n${question?.examples}`;
        getAdviceFromChatGPT(prompt);
    };
    const GetTestCase = async() => {
        try {
            const response = await fetch(`http://localhost:8080/testcase/${qnid}`, {
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
            const response = await fetch(`http://localhost:8080/tutorials/code/${qnid}`, {
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
        console.log("Solution passed!");
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
        // Navigate to performance page or perform any action you want
        console.log("View Performance clicked");
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
                <ModalContent bg="green.200">
                    <ModalBody>
                        Give some advice
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
