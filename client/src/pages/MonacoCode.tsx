import { Box, Card, Grid, GridItem } from "@chakra-ui/react";
import Header from "../components/Header";
import MonacoEditor from "../components/MonacoEditor";
import { useParams } from "react-router-dom";
import CodeQuestion from "../components/CodeQuestion";
import { useEffect, useState } from "react";

type QnType = {
  name: string;
  description: string;
  examples: string;
  constraints: string;
  status: string;
  tags: string;
  qnid: string;
};

type TestCaseType = {
  id:string;
  qnid: string;
  testcases: {
      input: string;
      output: string;
  }[];
  hiddentestcases: {
    input: string;
    output: string;
}[];
};

function MonacoCode() {
    let { qnid } = useParams();
    const [question, setQuestion] = useState<QnType | null>(null);
    const [testcase, setTestCase] = useState<TestCaseType | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const GetTestCase = async() => {
      try {
        const response = await fetch(`http://localhost:8080/testcase/${qnid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const res = await response.json();
            setTestCase(res.data.data);
        }
        } catch (error) {
        console.error("Failed to fetch question:", error);
        }
    }
    const GetAQuestion = async () => {
        try {
        const response = await fetch(`http://localhost:8080/tutorials/code/${qnid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const res = await response.json();
            setQuestion(res.data.data);
        }
        } catch (error) {
        console.error("Failed to fetch question:", error);
        }
  };
  const handleSuccess = () => {
    // This function will be called when checkSolution passes
    console.log("Solution passed!");
    setSuccess(true);
    // Do whatever you need to do with the success notification
};
  useEffect(() => {
    GetAQuestion();
    GetTestCase();
    // console.log(testcase)
  }, [qnid]);
  return (
    <>
      <Header />
      <Grid templateColumns="1fr 1fr" gap={4}>
        <GridItem>
          {question ? (
            <CodeQuestion
              data = {question}
              tc = {testcase}
              successflag = {success}
            />
          ) : (
            <p>Loading...</p>
          )}
        </GridItem>
        <GridItem>
          <Card>
            <MonacoEditor 
            tc ={testcase}
            onSuccess={handleSuccess}/>
            
          </Card>
        </GridItem>
      </Grid>
    </>
  );
}

export default MonacoCode;
