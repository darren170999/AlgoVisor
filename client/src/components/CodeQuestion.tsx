import { Card, CardBody, CardHeader, Heading, Box, Text } from "@chakra-ui/react";

type QnType = {
  qnid: string;
  name: string;
  description: string;
  examples: string;
  constraints: string;
  status: string;
  tags: string;
};

type TestCaseType = {
    testCases: {
        input: string;
        output: string;
    }[];
};

function CodeQuestion({ data, tc }: { data: QnType; tc: TestCaseType | null }) {
    console.log(tc)
  return (
    <>
        <Card bg="white" p={5} h="100%">
            <CardHeader>
                <Heading size="md">{data.name}</Heading>
            </CardHeader>
            <Card mb={1}>
                <CardHeader>
                <Heading size="sm">Descriptions</Heading>
                </CardHeader>
                <CardBody>
                    <Text>{data.description}</Text>
                </CardBody>
            </Card>
            <Card mb={1}>
                <CardHeader>
                <Heading size="sm">Examples</Heading>
                </CardHeader>
                <CardBody>
                    <Text>{data.examples}</Text>
                </CardBody>
            </Card>
            <Card mb={1}>
                <CardHeader>
                <Heading size="sm">Constraints</Heading>
                </CardHeader>
                <CardBody>
                    <Text>{data.constraints}</Text>
                </CardBody>
            </Card>
            {tc && tc.testCases && tc.testCases.length > 0 && (
            <CardBody>
                <Heading size="sm" mb={4}>
                Test Cases:
                </Heading>
                {tc.testCases.map((testCase, index) => (
                <Box key={index}>
                    Input: {testCase.input}, Output: {testCase.output}
                </Box>
                ))}
            </CardBody>
            )}
        </Card>
    </>
  );
}

export default CodeQuestion;
