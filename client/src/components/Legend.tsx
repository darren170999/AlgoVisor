import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const Legend = () => {
  return (
    <Flex >
      <Box width="20px" height="20px" backgroundColor="gray" marginRight="5px"></Box>
      <Text color={'white'}>Sorted List</Text>
      <Box width="20px" height="20px" backgroundColor="white" marginLeft="20px" marginRight="5px"></Box>
      <Text color={'white'}>Unsorted List</Text>
      <Box width="20px" height="20px" backgroundColor="red" marginLeft="20px" marginRight="5px"></Box>
      <Text color={'white'}>Pivot</Text>
    </Flex>
  );
};

export default Legend;
