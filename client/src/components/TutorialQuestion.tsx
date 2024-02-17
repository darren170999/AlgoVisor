import { Card, CardBody, Heading, Text, Button, ButtonGroup, CardFooter, Divider, Stack, Icon, VStack, Flex } from '@chakra-ui/react';
import { CloseIcon, CheckIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
type QnType = {
    name: string;
    description: string;
    status: string;
    tags: string;
    qnid: string;
    boolcompleted: boolean;
}

function TutorialQuestion(data: QnType) {
    console.log(data)
    return (
        <>
        <Card w='400px' h='400px' bg={data.status === 'new' ? 'white' : 'gray.200'}>
            <CardBody>
                <Stack mt='6' spacing='3'>
                {data.boolcompleted && <Flex justify="flex-end" mr={2}>
                    <Icon as={CheckIcon } color={"green.500"}/>
                </Flex>}
                <VStack>
                    <Heading size='md'>{data.name}</Heading>
                </VStack>
                <Text>
                    {data.name}
                </Text>
                <Text color='blue.600' fontSize='xl'>
                    {data.description}
                </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Link to={`/tutorials/code/${data.qnid}`}>
                        <Button variant='solid' colorScheme='blue' >
                            Start Attempt
                        </Button>
                    </Link>
                </ButtonGroup>
            </CardFooter>
        </Card>
        </>
    );
}

export default TutorialQuestion;
