import { Text, Box, Grid, GridItem, Avatar, Img, HStack } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import Footer from "../components/Footer";

function HomeLoggedIn() {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showSecondSection, setShowSecondSection] = useState(false); // State to track whether to show the second section
  const [showThirdSection, setShowThirdSection] = useState(false); // State to track whether to show the third section
  const secondSectionRef = useRef<HTMLDivElement>(null); // Ref for the second section
  const thirdSectionRef = useRef<HTMLDivElement>(null); // Ref for the third section
  const username = localStorage.getItem("username");

  useEffect(() => {
    // Start animation when component mounts
    setAnimationStarted(true);
  }, []);

  useEffect(() => {
    // Observer function to handle intersection for the second section
    const handleIntersectionSecond = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShowSecondSection(true); // Start animation when second section comes into view
        }
      });
    };

    // Create intersection observer for the second section
    const observerSecond = new IntersectionObserver(handleIntersectionSecond, {
      threshold: 0.5 // Trigger when half of the target is visible
    });

    // Observe the second section
    if (secondSectionRef.current) {
      observerSecond.observe(secondSectionRef.current);
    }

    // Observer function to handle intersection for the third section
    const handleIntersectionThird = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShowThirdSection(true); // Start animation when third section comes into view
        }
      });
    };

    // Create intersection observer for the third section
    const observerThird = new IntersectionObserver(handleIntersectionThird, {
      threshold: 0.5 // Trigger when half of the target is visible
    });

    // Observe the third section
    if (thirdSectionRef.current) {
      observerThird.observe(thirdSectionRef.current);
    }

    // Cleanup
    return () => {
      observerSecond.disconnect(); // Disconnect observer for second section when component unmounts
      observerThird.disconnect(); // Disconnect observer for third section when component unmounts
    };
  }, []);

  return (
    <>
      <Grid templateColumns="1fr 1fr" gap={0} height="100vh" background="#1a1f71">
        <GridItem>
          <Box
            className={`picture ${animationStarted ? "slide-in" : ""}`}
            position="relative"
            height="50%"
            width="50%"
            overflow="hidden"
          >
            <Box
              className="picture-content"
              position="absolute"
              left={animationStarted ? "0%" : "-100%"}
              top="0"
              width="100%"
              height="100%"
              transition="left 1s ease-in-out"
            >
              <Img
                borderRadius='full'
                boxSize='300px'
                src='logo512.png'
                alt='Dan Abramov'
              />
            </Box>
          </Box>
        </GridItem>
        <GridItem>
          <Box
            className={`words ${animationStarted ? "slide-in" : ""}`}
            position="relative"
            height="100%"
            width="100%"
            overflow="hidden"
          >
            <Box
              className="words-content"
              position="absolute"
              right={animationStarted ? "0%" : "-100%"}
              top="50%"
              transform="translateY(-50%)"
              width="100%"
              height="100%"
              transition="right 1s ease-in-out"
            >
              <Text fontSize="5xl" color="black" fontWeight="bold" fontFamily={"arial"}>
                Welcome to Algovisor,
              </Text>
              <Text fontSize="5xl" color="white" fontWeight="bold" fontFamily={"arial"}>
                {username}
              </Text>
            </Box>
          </Box>
        </GridItem>
      </Grid>

      <Grid ref={secondSectionRef} templateColumns="1fr 1fr" gap={0} height="100vh" background="#fcc015">
        <GridItem>
          <Box
            className={`words ${showSecondSection ? "slide-in" : ""}`}
            position="relative"
            height="100%"
            width="100%"
            overflow="hidden"
          >
            <Box
              className="words-content"
              position="absolute"
              left={showSecondSection ? "0%" : "100%"}
              top="50%"
              transform="translateY(-50%)"
              width="100%"
              height="100%"
              transition="left 1s ease-in-out"
            >
              <Text fontSize="5xl" color="black" fontWeight="bold" fontFamily={"arial"}>
                Welcome to Algovisor {username},
              </Text>
            </Box>
          </Box>
        </GridItem>
        {/* Picture */}
        <GridItem>
          <Box
            className={`picture ${showSecondSection ? "slide-in" : ""}`}
            position="relative"
            height="50%"
            width="50%"
            overflow="hidden"
          >
            <Box
              className="picture-content"
              position="absolute"
              right={showSecondSection ? "0%" : "100%"}
              top="0"
              width="100%"
              height="100%"
              transition="right 1s ease-in-out"
            >
              <img
                src="https://bit.ly/dan-abramov"
                alt="Dan Abramov"
                style={{ width: "100%", height: "100%", objectFit: "cover", margin: "" }}
              />
            </Box>
          </Box>
        </GridItem>
      </Grid>

      <Grid ref={thirdSectionRef} templateColumns="1fr 1fr" gap={0} height="100vh" background="#1a1f71">
        <GridItem>
          <Box
            className={`picture ${showThirdSection ? "slide-in" : ""}`}
            position="relative"
            height="50%"
            width="50%"
            overflow="hidden"
          >
            <Box
              className="picture-content"
              position="absolute"
              left={showThirdSection ? "0%" : "-100%"}
              top="0"
              width="100%"
              height="100%"
              transition="left 1s ease-in-out"
            >
              <img
                src="https://bit.ly/dan-abramov"
                alt="Dan Abramov"
                style={{ width: "100%", height: "100%", objectFit: "cover", margin: "" }}
              />
            </Box>
          </Box>
        </GridItem>
        {/* Words */}
        <GridItem>
          <Box
            className={`words ${showThirdSection ? "slide-in" : ""}`}
            position="relative"
            height="100%"
            width="100%"
            overflow="hidden"
          >
            <Box
              className="words-content"
              position="absolute"
              right={showThirdSection ? "0%" : "-100%"}
              top="50%"
              transform="translateY(-50%)"
              width="100%"
              height="100%"
              transition="right 1s ease-in-out"
            >
              <Text fontSize="5xl" color="black" fontWeight="bold" fontFamily={"arial"}>
                Welcome to Algovisor {username},
              </Text>
            </Box>
          </Box>
        </GridItem>
      </Grid>
      <Footer/>
    </>
  );
}

export default HomeLoggedIn;
