import { Text, Box, Grid, GridItem } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

const SecondSection = ({ setShowSecondSection, username }: { setShowSecondSection: React.Dispatch<React.SetStateAction<boolean>>; username: string | null }) => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const secondSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAnimationStarted(true);
  }, []);

  useEffect(() => {
    const handleIntersectionSecond = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShowSecondSection(true);
        }
      });
    };

    const observerSecond = new IntersectionObserver(handleIntersectionSecond, {
      threshold: 0.5
    });

    if (secondSectionRef.current) {
      observerSecond.observe(secondSectionRef.current);
    }

    return () => {
      observerSecond.disconnect();
    };
  }, []);

  return (
    <Grid ref={secondSectionRef} templateColumns="1fr 1fr" gap={0} height="100vh" background="#1a1f71">
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
            left={animationStarted ? "0%" : "100%"}
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
            right={animationStarted ? "0%" : "100%"}
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
  );
};

export default SecondSection;
