import { Box, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import townHallUtil from "../util/TownHallUtil";

function TownHall() {
    const townhallUrl = "townhall";
    const townhall = townHallUtil[townhallUrl];
    const meetsUrl = "meets";
    const meets = townHallUtil[meetsUrl];

    const showTownhall = localStorage.getItem("showTownhall") === "true";
    const showMeets = localStorage.getItem("showMeets") === "true";

    return (
        <>
            <Header />
            
            {showTownhall ? (
                <>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="50px" // Adjust the height as needed
                        fontFamily="sans-serif"
                        fontSize="3xl" // Adjust the font size as needed
                        fontWeight="bold"
                    >
                        <Text>Town Hall</Text>
                    </Box>
                    <iframe 
                        src={townhall}
                        style={{ width: '100%', height: '768px', padding: '50px' }} 
                        allow="microphone; camera; vr; speaker;"
                    />
                </>
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
                <>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="50px" // Adjust the height as needed
                        fontFamily="sans-serif"
                        fontSize="3xl" // Adjust the font size as needed
                        fontWeight="bold"
                    >
                        <Text>Meets</Text>
                    </Box>
                    <iframe 
                        src={meets}
                        style={{ width: '100%', height: '768px', padding: '50px' }} 
                        allow="microphone; camera; vr; speaker;"
                    />
                </>
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
