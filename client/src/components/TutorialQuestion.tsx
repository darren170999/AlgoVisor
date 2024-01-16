import { Card, CardBody, Heading, Text, Button, ButtonGroup, CardFooter, Divider, Stack } from '@chakra-ui/react';
import { CloseIcon, CheckIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
type QnType = {
    name: string;
    description: string;
    status: string;
    tags: string;
    qnid: string;
}

function TutorialQuestion(data: QnType) {
    // const [items, setItems] = useState<QnType[]>([]);
    console.log(data)
    return (
        <>
        <Card w='400px' h='400px'>
            <CardBody>
                <Stack mt='6' spacing='3'>
                <Heading size='md'>{data.name}</Heading>
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
                    <Button>
                        {/* To change this icon to make more sense */}
                        {data.status === "completed" ? <CheckIcon color={"green"}/> : <CloseIcon color={"red"}/>}
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
        </>
    );
}

export default TutorialQuestion;
