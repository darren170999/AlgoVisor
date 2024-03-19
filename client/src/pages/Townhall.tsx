import { Box, Text } from "@chakra-ui/react";
import Header from "../components/Header";

// Assuming you have an array of URLs stored in another file
import townHallUtil from "../util/TownHallUtil";

function TownHall(){
    // Selecting the URL based on some condition, like an index
    const selectedUrlIndex = "careerFair"; // Change this index based on your condition
    const selectedUrl = townHallUtil[selectedUrlIndex];

    return(
        <>
            <Header/>
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
                src={selectedUrl}
                style={{ width: '100%', height: '768px', padding: '50px' }} 
                allow="microphone; camera; vr; speaker;"
            >
            </iframe>
        </>
    );
}
export default TownHall;
