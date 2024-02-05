import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { Box, Button, Heading, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";

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

type saveAttemptDataProps = {
  attempt: string;
  language: number;
  qnid: string;
  status: string;
  username: string;
}

function MonacoEditor() {
  const [fileName, setFileName] = useState("script.py");
  const [langUsed, setLangUsed] = useState(71); // python is the default
  const updateLanguageUsed = (language: number) => {
    setLangUsed(language);
    setSaveAttemptData(prevData => ({ ...prevData, language }));
  };
  let { qnid } = useParams();
  let username = localStorage.getItem("username");
  const [saveAttemptData, setSaveAttemptData] = useState<saveAttemptDataProps>({
    attempt: "",
    language: 71,
    qnid: qnid!,
    status: "Uncompleted", // If submitted is done and passed we will put Completed, in the meantime ignore
    username: localStorage.getItem("username")!,
  })
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
    // console.log(saveAttemptData)
  },[output])
  useEffect(() => {
    // console.log(saveAttemptData);
  }, [saveAttemptData]);
  function compileAndRunCode() {
    if (editorRef.current) {
      const attempt: string = editorRef.current.getValue(); // what we will try to save in the future
      // console.log(codeToCompile)
      setSaveAttemptData((prevData) => ({ ...prevData, attempt }));
      // Make a POST request to Judge0 to compile and run the code.
      // account for C:75 and Java:91 and C++:76
      axios
        .post("http://0.0.0.0:2358/submissions", {
          source_code: attempt,
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
  const updateAttempt = async (e:{preventDefault: () => void}) => {
    e.preventDefault();
    console.log(JSON.stringify(saveAttemptData))
    try{
      const response = await fetch("http://localhost:8080/tutorials/code/attempt/create" , {
          method: "POST",
          headers : {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(saveAttemptData),
      });
      if(response.ok){ // can remove later
          console.log("Form data posted successfully!");
          response.json().then((data) => {
              console.log(data);
          });
      } else {
          console.log(response);
      }
    } catch (err) {
        console.log("Dk wtf happen: ", err)
    }     
  }


  const saveAttempt = async (e:{preventDefault: () => void}) => {
    e.preventDefault();
    console.log(JSON.stringify(saveAttemptData))
    try{
      const response = await fetch("http://localhost:8080/tutorials/code/attempt/create" , {
          method: "POST",
          headers : {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(saveAttemptData),
      });
      if(response.ok){ // can remove later
          console.log("Form data posted successfully!");
          response.json().then((data) => {
              console.log(data);
          });
      } else {
          console.log(response);
      }
    } catch (err) {
        console.log("Dk wtf happen: ", err)
    }     
  }

  useEffect(() => {
    // Fetch the previous attempt data when the component mounts
    const fetchPreviousAttempt = async () => {
      try {
        const response = await fetch(`http://localhost:8080/tutorials/code/attempt/${qnid}/${langUsed}/${username}`);
        if (response.ok) {
          const data = await response.json();
          const previousAttemptData: saveAttemptDataProps = data.data.data
          console.log(previousAttemptData)
          setSaveAttemptData(previousAttemptData);
          setLangUsed(previousAttemptData.language);
          console.log(saveAttemptData);
          if (editorRef.current) {
            editorRef.current.setValue(previousAttemptData.attempt);
          }
        } else {
          console.log(response);
        }
      } catch (err) {
        console.log("Error fetching previous attempt:", err);
      }
    };

    fetchPreviousAttempt();
    
  }, [qnid]);

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
          {/* <MenuItem onClick={() => updateLanguageUsed(91)}>Java</MenuItem> */}
        </MenuList>
      </Menu>
      <Button onClick={saveAttempt} style={{ marginLeft: '8px' }}>Save</Button>
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
            {/* Clear terminal's output */}
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
