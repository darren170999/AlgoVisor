import { Card, CardBody, Heading, Text, Button, ButtonGroup, CardFooter, Divider, Stack } from '@chakra-ui/react';
import { CloseIcon, CheckIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
type QnType = {
    id: string; // eg T1Q1
    name: string;
    description: string;
    status: string;
    tags: string;
}

function TutorialQuestion(data: QnType) {
    // const [items, setItems] = useState<QnType[]>([]);
    return (
        <>
        <Card minW='300px'>
            <CardBody>
                <Stack mt='6' spacing='3'>
                <Heading size='md'>{data.id}</Heading>
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
                    <Link to="/tutorials/code">
                        <Button variant='solid' colorScheme='blue' >
                            Start Attempt
                        </Button>
                    </Link>
                    <Button>
                        {data.status === "completed" ? <CheckIcon color={"green"}/> : <CloseIcon color={"red"}/>}
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
        </>
    );
}

export default TutorialQuestion;
