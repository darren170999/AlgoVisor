import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
import { Box } from '@chakra-ui/react'; // Import Chakra UI components as needed

function MyCarousel() {
  return (
    <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} interval={3000}>
      <Box>
        <img src="https://via.placeholder.com/600x400" alt="Slide 1" />
      </Box>
      <Box>
        <img src="https://via.placeholder.com/600x400" alt="Slide 2" />
      </Box>
      <Box>
        <img src="https://via.placeholder.com/600x400" alt="Slide 3" />
      </Box>
    </Carousel>
  );
}

export default MyCarousel;
