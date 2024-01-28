import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { Box, Button, Heading, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

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
const languageMapping: LanguageMapping = {
  71: 'Python',
  75: 'C',
  76: 'C++',
  91: 'Java',
};
interface LanguageMapping {
  [key: number]: string;
}

function MonacoEditor() {
  const [fileName, setFileName] = useState("script.py");
  const [langUsed, setLangUsed] = useState(71); // python is the default
  const updateLanguageUsed = (language: number) => {
    setLangUsed(language);
  };
  const file = files[fileName];
  const editorRef = useRef<any>(null);
  const [output, setOutput] = useState<string>("");
    function waitFor3second(){
        return new Promise(resolve =>
            setTimeout(() => resolve("result"),3000)
        );
    }
  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }
useEffect(()=>{

},[output])
  function compileAndRunCode() {
    if (editorRef.current) {
      const codeToCompile: string = editorRef.current.getValue(); // what we will try to save in the future
      console.log(codeToCompile)
      // Make a POST request to Judge0 to compile and run the code.
      // account for C:75 and Java:91 and C++:76
      axios
        .post("http://0.0.0.0:2358/submissions", {
          source_code: codeToCompile,
          language_id: langUsed,
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
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {languageMapping[langUsed] || 'Select Language'}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => updateLanguageUsed(71)}>Python</MenuItem>
          <MenuItem onClick={() => updateLanguageUsed(75)}>C</MenuItem>
          <MenuItem onClick={() => updateLanguageUsed(76)}>C++</MenuItem>
          <MenuItem onClick={() => updateLanguageUsed(91)}>Java</MenuItem>
        </MenuList>
      </Menu>
      <Button style={{ marginLeft: '8px' }}>Save</Button>
      <Editor
        height="500px"
        width="100%"
        theme="vs-dark"
        defaultLanguage={file.language}
        defaultValue={file.value}
        path={file.name}
        onMount={handleEditorDidMount}
      />
      <Box mt={4}>
        <Heading as="h3" size="md" mb={2} p={3} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Output:</span>
          <div>
            <Button onClick={compileAndRunCode} style={{ marginRight: '8px' }}>Run</Button>
            <Button style={{ marginRight: '8px' }}>Clear</Button>
            {/* Submit is just to test code against test cases */}
            <Button >Submit</Button>
          </div>
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
