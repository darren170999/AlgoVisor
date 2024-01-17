import { Box, Card, Grid, GridItem } from "@chakra-ui/react";
import Header from "../components/Header";
import MonacoEditor from "../components/MonacoEditor";
import { useParams } from "react-router-dom";
import CodeQuestion from "../components/CodeQuestion";
import { useEffect, useState } from "react";

type QnType = {
  name: string;
  description: string;
  status: string;
  tags: string;
  qnid: string;
};
function MonacoCode() {
    let { qnid } = useParams();
    const [question, setQuestion] = useState<QnType | null>(null);

    console.log(qnid)
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

  useEffect(() => {
    GetAQuestion();
  }, [qnid]);

  return (
    <>
      <Header />
      <Grid templateColumns="1fr 1fr" gap={4}>
        <GridItem>
          {question ? (
            <CodeQuestion
              qnid={question.qnid}
              status={question.status}
              tags={question.tags}
              description={question.description}
              name={question.name}
            />
          ) : (
            <p>Loading...</p>
          )}
        </GridItem>
        <GridItem>
          <MonacoEditor />
        </GridItem>
      </Grid>
    </>
  );
}

export default MonacoCode;
