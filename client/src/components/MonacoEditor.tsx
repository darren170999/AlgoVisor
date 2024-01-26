import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { Box, Button, Heading } from "@chakra-ui/react";

const files: Record<string, any> = {
  "script.py": {
    name: "script.py",
    language: "python",
    value: "Here is some python text",
  },
  "default.html": {
    name: "default.html",
    language: "html",
    value: "<div> </div>",
  },
};

function MonacoEditor() {
  const [fileName, setFileName] = useState("script.py");
  const file = files[fileName];
  const editorRef = useRef<any>(null);
  const [output, setOutput] = useState<string>("");
    function waitFor3second(){
        return new Promise(resolve =>
            setTimeout(() => resolve("result"),100)
        );
    }
  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }
useEffect(()=>{

},[output])
  function compileAndRunCode() {
    if (editorRef.current) {
      const codeToCompile: string = editorRef.current.getValue();

      // Make a POST request to Judge0 to compile and run the code.
      axios
        .post("http://0.0.0.0:2358/submissions", {
          source_code: codeToCompile,
          language_id: 71,
        })
        .then((response) => {
          // Handle the response from Judge0, which will include the token.
          const submissionToken: string = response.data.token;
          waitFor3second().then(()=>
          // Poll Judge0 for the result (you can implement this as needed).
            {pollJudge0ForResult(submissionToken);}
          )
        })
        .catch((error) => {
          console.error("Error compiling code:", error);
        });
    }
  }

  function pollJudge0ForResult(submissionToken: string) {
    // Implement a function to poll Judge0 for the result of the submission.
    // You can use a timer or WebSocket to check the status of the submission and get the output.
    // Example code for polling Judge0:
    axios
      .get(`http://0.0.0.0:2358/submissions/${submissionToken}`)
      .then((response) => {
            console.log(response)
          const submissionOutput: string = response.data.stdout;
          setOutput(submissionOutput);
    //     if (status === "Processing") {
    //       // Submission is still processing; continue polling.
    //       setTimeout(() => pollJudge0ForResult(submissionToken), 1000);
    //     }
      });
  }

  return (
    <>
    <Box p={4} borderRadius="md" boxShadow="md" bg="white">
      <Button onClick={compileAndRunCode}>Compile and Run</Button>
      <Editor
        height="500px"
        width="100%"
        theme="vs-dark"
        // fontFamily="Menlo, Monaco, 'Courier New', monospace"
        defaultLanguage={file.language}
        defaultValue={file.value}
        path={file.name}
        onMount={handleEditorDidMount}
      />
      <Box mt={4}>
        <Heading as="h3" size="md" mb={2}>
          Output:
        </Heading>
        <Box
          p={2}
          borderRadius="md"
          borderWidth="1px"
          borderColor="gray.200"
          bg="gray.50"
        >
          <pre>{output}</pre>
        </Box>
      </Box>
    </Box>
    </>
  );
}

export default MonacoEditor;
