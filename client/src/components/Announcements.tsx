import React, { useState, useEffect } from "react";
import { Image, AspectRatio } from "@chakra-ui/react";

interface Announcements {
  images: string[]; // Array of image URLs
}

const Announcements: React.FC<Announcements> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <AspectRatio maxW="100vw" maxH="300px">
      <Image src={images[currentImageIndex]} />
    </AspectRatio>
  );
};

export default Announcements;
