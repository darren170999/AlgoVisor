import { useState } from "react";
import { Box, Text, CircularProgress } from "@chakra-ui/react";
import Header from "../components/Header";
import townHallUtil from "../util/TownHallUtil";

function TownHall() {
    const townhallUrl = "townhall";
    const townhall = townHallUtil[townhallUrl];
    const meetsUrl = "meets";
    const meets = townHallUtil[meetsUrl];

    const [townhallLoading, setTownhallLoading] = useState(true);
    const [meetsLoading, setMeetsLoading] = useState(true);

    const showTownhall = localStorage.getItem("showTownhall") === "true";
    const showMeets = localStorage.getItem("showMeets") === "true";

    const handleTownhallLoad = () => {
        setTownhallLoading(false);
    };

    const handleMeetsLoad = () => {
        setMeetsLoading(false);
    };

    return (
        <>
            <Header />
            
            {showTownhall ? (
                <Box position="relative">
                    {townhallLoading && (
                        <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                        >
                            <CircularProgress isIndeterminate color="blue.300" />
                        </Box>
                    )}
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="50px" 
                        fontFamily="sans-serif"
                        fontSize="3xl" 
                        fontWeight="bold"
                    >
                        <Text>Town Hall</Text>
                    </Box>
                    <iframe 
                        src={townhall}
                        style={{ width: '100%', height: '768px', padding: '50px' }} 
                        allow="microphone; camera; vr; speaker;"
                        onLoad={handleTownhallLoad}
                    />
                </Box>
            ) : (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100vh"
                    fontFamily="sans-serif"
                    fontSize="2xl"
                    fontWeight="bold"
                >
                    Townhall is under renovation. We'll be back soon!
                </Box>
            )}
            {showMeets ? (
                <Box position="relative">
                    {meetsLoading && (
                        <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                        >
                            <CircularProgress isIndeterminate color="blue.300" />
                        </Box>
                    )}
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="50px"
                        fontFamily="sans-serif"
                        fontSize="3xl"
                        fontWeight="bold"
                    >
                        <Text>Meets</Text>
                    </Box>
                    <iframe 
                        src={meets}
                        style={{ width: '100%', height: '768px', padding: '50px' }} 
                        allow="microphone; camera; vr; speaker;"
                        onLoad={handleMeetsLoad}
                    />
                </Box>
            ) : (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100vh"
                    fontFamily="sans-serif"
                    fontSize="2xl"
                    fontWeight="bold"
                >
                    Meets is under renovation. We'll be back soon!
                </Box>
            )}
        </>
    );
}

export default TownHall;
