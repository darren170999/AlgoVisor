import { Text, Box, Grid, GridItem, Avatar, Img, HStack } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import Footer from "../components/Footer";
import { SiVisualstudio, SiVisualstudiocode } from "react-icons/si";
import { GiWhiteBook, GiBlackBook } from "react-icons/gi";
import { FaRegFileCode, FaFileCode } from "react-icons/fa6";
import MyCarousel from "../components/MyCarousel";
function HomeLoggedIn() {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showSecondSection, setShowSecondSection] = useState(false); // State to track whether to show the second section
  // const [showThirdSection, setShowThirdSection] = useState(false); // State to track whether to show the third section
  const secondSectionRef = useRef<HTMLDivElement>(null); // Ref for the second section
  // const thirdSectionRef = useRef<HTMLDivElement>(null); // Ref for the third section
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
    // const handleIntersectionThird = (entries: IntersectionObserverEntry[]) => {
    //   entries.forEach(entry => {
    //     if (entry.isIntersecting) {
    //       setShowThirdSection(true); // Start animation when third section comes into view
    //     }
    //   });
    // };

    // Create intersection observer for the third section
    // const observerThird = new IntersectionObserver(handleIntersectionThird, {
    //   threshold: 0.5 // Trigger when half of the target is visible
    // });

    // // Observe the third section
    // if (thirdSectionRef.current) {
    //   observerThird.observe(thirdSectionRef.current);
    // }

    // Cleanup
    return () => {
      observerSecond.disconnect(); // Disconnect observer for second section when component unmounts
      // observerThird.disconnect(); // Disconnect observer for third section when component unmounts
    };
  }, []);

  return (
    <>
      <Grid templateColumns="2fr 1fr" gap={0} height="80vh" background="#1a1f71">
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
              padding="50px"
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
                <Text fontSize="3xl" color="white" fontWeight="bold" fontFamily={"sans-serif"}>
                  Welcome to AlgoVisor,
                </Text>
                <Text fontSize="3xl" color="#fcc015" fontWeight="bold" fontFamily={"sans-serif"} marginLeft="10px">
                  {username}
                </Text>
              </Box>
              <Text fontSize="3xl" color="white" fontWeight="bold" fontFamily={"sans-serif"}   textAlign="justify" >
                Algo Visor, is a one stop lifelong learning platform for free!. Here, you can hang out in private meeting rooms, 
                learn more about algorithms, revisit  school materials, try coding practices, attend orientations and so much more!
              </Text>
            </Box>
          </Box>
        </GridItem>

        <GridItem>
          <Box
            className={`picture ${animationStarted ? "slide-in" : ""}`}
            position="relative"
            height="100%"
            width="100%"
            overflow="hidden"
          >
            <Box
              className="picture-content"
              position="absolute"
              left={animationStarted ? "0%" : "-100%"}
              top="5"
              width="100%"
              height="100%"
              transition="left 1s ease-in-out"
              padding={30}
              display="grid"
              gridTemplateColumns="repeat(2, 1fr)"
              gridTemplateRows="repeat(2, 1fr)"
              gap={4} // Adjust gap as needed
            >

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
              >
                <SiVisualstudio size={200} color={"white"} />
                <Box
                  display="flex"
                  alignItems="baseline"
                  justifyContent="flex-end"
                  width="100%"
                  height="100%"
                >
                  <GiWhiteBook size={100} color={"white"} />
                </Box>
              <Box
                display="flex"
                alignItems="end"
                justifyContent="center"
                width="100%"
                height="100%"
              >
                <FaRegFileCode size={100} color={"white"} />
              </Box>
              </Box>
            </Box>
          </Box>
        </GridItem>


      </Grid>

      <Grid ref={secondSectionRef} templateColumns="1fr 2fr" gap={0} height="80vh" background="#fcc015">
        <GridItem>
          <Box
            className={`picture ${showSecondSection ? "slide-in" : ""}`}
            position="relative"
            height="100%"
            width="100%"
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
              padding="50px"
            >
              <Avatar
                src="https://dsohjh.com/avatar.png"
                size='3xl'
              />
            </Box>
          </Box>
        </GridItem>
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
              padding="50px"
            >
             <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
                <Text fontSize="4xl" color="white" fontWeight="bold" fontFamily={"sans-serif"}>
                  Learn 
                </Text>
                <Text fontSize="4xl" color="#1a1f71" fontWeight="bold" fontFamily={"sans-serif"} marginLeft="10px">
                  Together - 
                </Text>
                <Text fontSize="4xl" color="white" fontWeight="bold" fontFamily={"sans-serif"} marginLeft="10px">
                  Grow 
                </Text>
                <Text fontSize="4xl" color="#1a1f71" fontWeight="bold" fontFamily={"sans-serif"} marginLeft="10px">
                  Together  
                </Text>
              </Box>
              <Text fontSize="3xl" color="#1a1f71" fontWeight="bold" fontFamily={"sans-serif"}>
                 Developed by Nanyang Technological University, School of Electrical and Electronic Engineering.
                 Project is helmed by Dr. Michelle Shao XuGuang, Assistant Chair (Lifelong learning) and Senior Lecturer at NTU.
              </Text>
            </Box>
          </Box>
        </GridItem>
      </Grid>

      {/* <Grid ref={thirdSectionRef} templateColumns="1fr 1fr" gap={0} height="100vh" background="#1a1f71">
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
              padding={20}
            >
              <Avatar
                src="https://bit.ly/dan-abramov"
                size="2xl"
              /> 
            </Box>
          </Box>
        </GridItem>
        <GridItem>
          <Box
            className={`words ${showThirdSection ? "slide-in" : ""}`}
            position="relative"
            height="100%"
            width="100%"
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
              padding={20}
            >
              <Avatar
                src="https://bit.ly/dan-abramov"
                size={"2xl"}
              />
            </Box>
          </Box>
        </GridItem>
      </Grid> */}
      <MyCarousel/>
      <Footer/>
    </>
  );
}

export default HomeLoggedIn;
