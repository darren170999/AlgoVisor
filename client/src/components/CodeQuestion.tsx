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
    testcases: {
        input: string;
        output: string;
    }[];
    hiddentestcases: {
        input: string;
        output: string;
    }[];
};

function CodeQuestion({ data, tc }: { data: QnType; tc: TestCaseType | null }) {
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
            {tc && tc.testcases && tc.testcases.length > 0 && (
            <CardBody>
                <Heading size="sm" mb={4}>
                Test Cases:
                </Heading>
                {tc.testcases.map((testcase, index) => (
                    <Box
                        key={index}
                        bg={testcase.output === 'expectedOutput' ? 'green.200' : 'red.200'} // Adjust the condition based on your criteria
                        p={3}
                        mb={2}
                        borderRadius="md"
                        borderColor={testcase.output === 'expectedOutput' ? 'green.500' : 'red.500'}
                        borderWidth={1}
                    >
                        <Text>
                            Input: {testcase.input}, Output: {testcase.output}
                        </Text>
                    </Box>
                ))}
                <Text>
                    Hidden test cases 0/{tc.hiddentestcases.length}
                </Text>
            </CardBody>
            )}
        </Card>
    </>
  );
}

export default CodeQuestion;
