import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Avatar, Box, Center, HStack,Text } from '@chakra-ui/react';

function MyCarousel() {
  return (
    <>
    <HStack bgColor="#1a1f71" padding={10} >
        <Text fontSize="4xl" color="white" fontWeight="bold" fontFamily={"sans-serif"}>
          AlgoVisor is powered by the following technologies
        </Text>
      </HStack>
    <HStack paddingTop={10} bgColor="#1a1f71" height="50vh">
      <Carousel
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        transitionTime={3000}
      >
        <Box>
          <Avatar src="https://bit.ly/43Uwykm" size={"2xl"} margin={10}/>
          <Avatar src="https://bit.ly/3z5fpWF" size={"2xl"} margin={10}/>
          <Avatar src="https://bit.ly/3oxJjRx" size={"2xl"} margin={10}/>
          <Avatar src="https://images.opencollective.com/formik/7ba0331/logo/256.png" size={"2xl"} margin={10}/>
          <Avatar src="https://cdn.dribbble.com/users/22018/screenshots/2456036/d3.png" size={"2xl"} margin={10}/>
          <Avatar src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo-shadow.png" size={"2xl"} margin={10}/>
        </Box>
        <Box>
          <Avatar src="https://avatars.githubusercontent.com/u/15729372?s=280&v=4" size={"2xl"} margin={10}/>
          <Avatar src="https://bit.ly/3N36qh0" size={"2xl"} margin={10}/>
          <Avatar src="https://cdn4.iconfinder.com/data/icons/redis-2/1451/Untitled-2-512.png" size={"2xl"} margin={10}/>
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkyKmh_BeC1z6qT3SjnN94f-a8sy6Ksb-mqqKkcunW3g&s" size={"2xl"} margin={10}/>
          <Avatar src="https://repository-images.githubusercontent.com/80240424/eb91a080-3436-11eb-9ce2-99abfddd6673" size={"2xl"} margin={10}/>
          <Avatar src="https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/267_Python-512.png" size={"2xl"} margin={10}/>
        </Box>
        <Box>
          <Avatar src="https://webimages.mongodb.com/_com_assets/cms/kuzt9r42or1fxvlq2-Meta_Generic.png" size={"2xl"} margin={10}/>
          <Avatar src="https://static-00.iconduck.com/assets.00/openai-icon-505x512-pr6amibw.png" size={"2xl"} margin={10}/>
          <Avatar src="https://logowik.com/content/uploads/images/twilio2236.jpg" size={"2xl"} margin={10}/>
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWhd7wqbjECoyXcsnkCWMQoUb2A0PHzhAgbt8EdFTe-w&s" size={"2xl"} margin={10}/>
        </Box>
      </Carousel>
    </HStack>
    </>
  );
}

export default MyCarousel;
