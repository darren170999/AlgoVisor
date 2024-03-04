import { Card, CardBody, Heading, Text, Button, ButtonGroup, CardFooter, Divider, Stack, Icon, VStack, Flex } from '@chakra-ui/react';
import { CloseIcon, CheckIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { QnType } from '../types/QnType';
interface TutorialQuestionProps extends QnType {
    boolCompleted: boolean; // Define boolCompleted prop
  }

function TutorialQuestion({ name, description, status, tags, qnid, boolCompleted }: TutorialQuestionProps) {
    return (
        <>
        <Card w='400px' h='400px' bg={status === 'new' ? 'white' : 'gray.200'}>
            <CardBody>
                <Stack mt='6' spacing='3'>
                {boolCompleted && <Flex justify="flex-end" mr={2}>
                    <Icon as={CheckIcon } color={"green.500"}/>
                </Flex>}
                <VStack>
                    <Heading size='md'>{name}</Heading>
                </VStack>
                <Text>
                    {name}
                </Text>
                <Text color='blue.600' fontSize='xl'>
                    {description}
                </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Link to={`/tutorials/code/${qnid}`}>
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
