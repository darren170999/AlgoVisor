import { Box, Flex, Text } from '@chakra-ui/react';

const PathLegend = () => {
  return (
    <Flex marginLeft="60px" >
      <Box width="20px" height="20px" backgroundColor="#da8d00" marginRight="5px"></Box>
      <Text color={'white'}>Wall Node</Text>
      <Box width="20px" height="20px" backgroundColor="#b3b000" marginLeft="20px" marginRight="5px"></Box>
      <Text color={'white'}>Weak Wall</Text>
      <Box width="20px" height="20px" backgroundColor="blue" marginLeft="20px" marginRight="5px"></Box>
      <Text color={'white'}>Source Node</Text>
      <Box width="20px" height="20px" backgroundColor="black" marginLeft="20px" marginRight="5px"></Box>
      <Text color={'white'}>Dest Node</Text>
      <Box width="20px" height="20px" backgroundColor="#670009" marginLeft="20px" marginRight="5px"></Box>
      <Text color={'white'}>Path Explored</Text>
      <Box width="20px" height="20px" backgroundColor="#c5c6c7" marginLeft="20px" marginRight="5px"></Box>
      <Text color={'white'}>Optimal Path</Text>
    </Flex>
  );
};

export default PathLegend;
