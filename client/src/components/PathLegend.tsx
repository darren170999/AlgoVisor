import { Box, Flex, Text } from '@chakra-ui/react';

const PathLegend = () => {
  return (
    <Flex marginLeft="60px" >
      <Box width="20px" height="20px" backgroundColor="#da8d00" marginRight="5px"></Box>
      <Text color={'white'}>Wall Node</Text>
      <Box width="20px" height="20px" backgroundColor="#b3b000" marginLeft="20px" marginRight="5px"></Box>
      <Text color={'white'}>Weak Wall</Text>
      <Box width="20px" height="20px" backgroundColor="red" marginLeft="20px" marginRight="5px"></Box>
      <Text color={'white'}>Pivot</Text>
    </Flex>
  );
};

export default PathLegend;
