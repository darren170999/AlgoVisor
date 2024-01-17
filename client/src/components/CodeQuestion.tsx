import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
type QnType = {
    qnid: string;
    name: string;
    description: string;
    status: string;
    tags: string;
}
function CodeQuestion(data: QnType){
    return(
        <>
        <Card bg="white" p={8} h="100%">
            <CardHeader>
                <Heading size='md'>{data.name}</Heading>
            </CardHeader>
            <CardBody>
                {data.description}
            </CardBody>
        </Card>
        </>
    )
}
export default CodeQuestion;