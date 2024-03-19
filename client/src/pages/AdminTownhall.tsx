import { useState } from "react";
import { Box, Switch, Card, Heading, CardBody, HStack } from "@chakra-ui/react";
import Header from "../components/Header";
import FullScreenSection from "../components/FullScreenSection";

function AdminTownhall() {
    const [showTownhall, setShowTownhall] = useState(localStorage.getItem("showTownhall") === "true");
    const [showMeets, setShowMeets] = useState(localStorage.getItem("showMeets") === "true");
    const handleToggleTownhall = () => {
        const newValue = !showTownhall;
        setShowTownhall(newValue);
        localStorage.setItem("showTownhall", newValue.toString());
    };
    const handleToggleMeets = () => {
        const newValue = !showMeets;
        setShowMeets(newValue);
        localStorage.setItem("showMeets", newValue.toString());
    };

    return (
        <>
            <Header />
            <FullScreenSection backgroundColor="#1a1f71" isDarkBackground p={8} alignItems="flex-start" spacing={8}>
                <Card minW="xl">
                    <CardBody>
                        <Heading as="h1">
                            Open or close the VR rooms
                        </Heading>
                        <HStack spacing={4} align="center">
                            <Box>
                                <label>Show Townhall</label><br />
                                <Switch isChecked={showTownhall} onChange={handleToggleTownhall} colorScheme="red" size="lg" />
                            </Box>
                            <Box>
                                <label>Show Meets</label><br />
                                <Switch isChecked={showMeets} onChange={handleToggleMeets} colorScheme="red" size="lg" />
                            </Box>
                            {/* <Box>
                                <label>Toggle 3</label><br />
                                <Switch isChecked={false} onChange={() => { }} colorScheme="red" size="lg" />
                            </Box> */}
                        </HStack>
                    </CardBody>
                </Card>
            </FullScreenSection>
        </>
    );
}

export default AdminTownhall;
