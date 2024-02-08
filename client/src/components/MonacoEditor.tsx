import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import axios, { all } from "axios";
import { Box, Button, Heading, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
const pythonDefault: string = `
class Solution:
  def main(input):
    # Write code here, do not rename main
`;
const pythonDriver : string = `
  output = []
  ls
  for i in ls:
  # function should return output of format specified
    output.append(main(i))
  for o in output:
    print(o)
`;

const cppDefault: string = `
class Solution:
  def main():
    # Write code here
`;

const cDefault: string = `
class Solution:
  def main():
    # Write code here
`;

const files: Record<string, any> = {
  "script.py": {
    name: "script.py",
    language: "python",
    value: pythonDefault,
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
};

interface LanguageMapping { [key: number]: string; }

type saveAttemptDataProps = {
  attempt: string;
  language: number;
  qnid: string;
  status: string;
  username: string;
}

type TestCaseType = {
  id:string;
  qnid:string;
  testcases: {
      input: string;
      output: string;
  }[];
  hiddentestcases: {
      input: string;
      output: string;
  }[];
};

function MonacoEditor({ tc }: { tc: TestCaseType | null }) {
  const extractInputs = (testCase: TestCaseType | null): string[] => {
    const allInputs: string[] = [];
    const inputsFromTestCases = testCase?.testcases.map((tc) => tc.input);
    const inputsFromHiddenTestCases = testCase?.hiddentestcases.map((htc) => htc.input);
    if(inputsFromTestCases){
      allInputs.push(...inputsFromTestCases);
    }
    if(inputsFromHiddenTestCases){
      allInputs.push(...inputsFromHiddenTestCases);
    }
    return allInputs;
  };
  // Append inputs from React state into the Python driver code
  const extractOutputs = (testCase: TestCaseType | null): string[] => {
    const allOutputs: string[] = [];
    const inputsFromTestCases = testCase?.testcases.map((tc) => tc.output);
    const inputsFromHiddenTestCases = testCase?.hiddentestcases.map((htc) => htc.output);
    if(inputsFromTestCases){
      allOutputs.push(...inputsFromTestCases);
    }
    if(inputsFromHiddenTestCases){
      allOutputs.push(...inputsFromHiddenTestCases);
    }
    return allOutputs;
  };
  const allInputs = extractInputs(tc);
  const allOutputs = extractOutputs(tc);
  // console.log(allOutputs);
  const updatedPythonDriver = pythonDriver.replace(/ls/, `ls= ${JSON.stringify(allInputs)}`);
  // console.log(updatedPythonDriver);
  const [fileName, setFileName] = useState("script.py");
  const [langUsed, setLangUsed] = useState(71); // python is the default
  const updateLanguageUsed = (language: number) => {
    setLangUsed(language);
    setSaveAttemptData(prevData => ({ ...prevData, language }));
  };
  const [isEditorMounted, setIsEditorMounted] = useState(false);
  const fetchedAttemptData = useRef<saveAttemptDataProps | null>(null);
  const [hasPreviousAttempt, setHasPreviousAttempt] = useState(false);

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
          setTimeout(() => resolve("result"),3000) // need more time if C is used, py:3000, C:5000, C++:10000
      );
  }
  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
    setIsEditorMounted(true);
    if (fetchedAttemptData.current && editorRef.current) {
      editorRef.current.setValue(fetchedAttemptData.current.attempt);
    }
  }
  useEffect(()=>{
    // console.log(saveAttemptData)
  },[output])
  useEffect(() => {
    // console.log(saveAttemptData);
  }, [saveAttemptData]);

  function submitCode() {
    if (editorRef.current) {
      const attempt: string = editorRef.current.getValue();
      console.log(attempt)
      setSaveAttemptData((prevData) => ({ ...prevData, attempt }));
      const submission = `${attempt}\n\n${updatedPythonDriver}`;
      console.log(submission);
      axios
        .post("http://0.0.0.0:2358/submissions", {
          source_code: submission,
          language_id: langUsed,
        })
        .then((response) => {
          console.log(response)
          const submissionToken: string = response.data.token;
          waitFor3second().then(()=>
            {pollJudge0ForResult(submissionToken);}
          )
        })
        .catch((error) => {
          console.error("Error compiling code:", error);
        });
    }
  }

  function compileAndRunCode() {
    if (editorRef.current) {
      const attempt: string = editorRef.current.getValue();
      console.log(langUsed)
      setSaveAttemptData((prevData) => ({ ...prevData, attempt }));
      //fucking middleware
      axios
        .post("http://0.0.0.0:2358/submissions", {
          source_code: attempt,
          language_id: langUsed,
        })
        .then((response) => {
          // Handle the response from Judge0, which will include the token.
          console.log(response)
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

  function pollJudge0ForResult(submissionToken: string) {//consider websockets
    axios
      .get(`http://0.0.0.0:2358/submissions/${submissionToken}`)
      .then((response) => {
            console.log(response)
          const submissionOutput: string = response.data.stdout;
          setOutput(submissionOutput);
          checkSolution(submissionOutput);
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
      const response = await fetch(`http://localhost:8080/tutorials/code/attempt/${qnid}/${langUsed}/${username}` , {
          method: "PUT",
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

  const checkSolution = (attemptedSolution: string) =>{
    if (attemptedSolution) {
      const inputList: string[] = attemptedSolution.split('\n').filter(Boolean);
      console.log(inputList);
      console.log(allOutputs);
      if (arraysEqual(allOutputs, inputList)) {
        // write a small BACKEND call to update the question to be done
        console.log("SUCCESS")
      }
    } else {
      console.error('Invalid input: attemptedSolution is null');
    }
  }
  function arraysEqual(arr1: any[], arr2: any[]) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
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
        const data = await response.json();
        const previousAttemptData: saveAttemptDataProps = data.data.data
        if (isEditorMounted && editorRef.current) {
          editorRef.current.setValue(previousAttemptData.attempt);
        } else {
          // fetchedAttemptData.current = previousAttemptData;
          editorRef.current.setValue(pythonDefault);
        }
        setSaveAttemptData(previousAttemptData);
        setLangUsed(previousAttemptData.language);
        setHasPreviousAttempt(true);
      } catch (err) {
        console.log("Error fetching previous attempt:", err);
        setHasPreviousAttempt(false);
      }
    };

    fetchPreviousAttempt();
    
  }, [qnid, langUsed, username, isEditorMounted]);
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
      <Button onClick={hasPreviousAttempt? updateAttempt: saveAttempt} style={{ marginLeft: '8px' }}>Save</Button>
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
            <Button onClick={submitCode}>Submit</Button>
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
