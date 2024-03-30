import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import axios, { all } from "axios";
import { Box, Button, Checkbox, Heading, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { submitSourceCode } from "../api/submitSourceCode";
import { arraysEqual } from "../helper/arraysEqual";
import { TestCaseType } from "../types/TestCaseType";
import { saveAttemptDataProps } from "../types/SaveAttemptDataProps";
import { pythonDefault } from "../helper/pythonDefault";
import { pythonDriver } from "../helper/pythonDriver";
// import { fetchSubmissionOutput } from "../api/pollJudge0ForResult";
import { fetchSubmission } from "../api/pollJudge0ForSubmission";
import { updateAttempt } from "../api/updateAttempt";
import { saveAttempt } from "../api/saveAttempt";
import { cDriver } from "../helper/cDriver";
import { cDefault } from "../helper/cDefault";
import { cppDefault } from "../helper/cppDefault";
import { updateStatus } from "../api/updateStatus";

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

function MonacoEditor({ tc, onSuccess }: { tc: TestCaseType | null ; onSuccess: () => void}) {
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
  const updatedPythonDriver = pythonDriver.replace(/ls/, `ls= ${JSON.stringify(allInputs)}`);
  const updatedCDriver = cDriver.replace(/input[]/, `input[]=${JSON.stringify(allInputs)}`);
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
  const [code, setCode] = useState<String>("");
  const [saveAttemptData, setSaveAttemptData] = useState<saveAttemptDataProps>({
    attempt: "",
    language: 71,
    qnid: qnid!,
    status: "Uncompleted", // If submitted is done and passed we will put Completed, in the meantime ignore
    username: localStorage.getItem("username")!,
    speed: 100.01,
    memory: 1000000,
  })
  const file = files[fileName];
  const editorRef = useRef<any>(null);
  const [output, setOutput] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(0); // State to track the current step of the tutorial
  const [showTutorial, setShowTutorial] = useState(true); // State to control the display of the tutorial modal
  const [skipIntroduction, setSkipIntroduction] = useState(false); // State to track whether the introduction should be skipped
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showRunModal, setShowRunModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
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
  
  useEffect(()=>{},[output])
  useEffect(() => {}, [saveAttemptData]);

  function compileAndRunCode() {
    if (editorRef.current) {
      const attempt: string = editorRef.current.getValue();
      // setShowRunModal(false)
      // setShowSaveModal(true)
      setSaveAttemptData((prevData) => ({ ...prevData, attempt }));
      submitSourceCode(attempt, langUsed)
        .then((submissionToken) => {
          // Handle the response from Judge0, which will include the token.
          waitFor3second().then(() => {
            // Poll Judge0 for the result (you can implement this as needed).
            pollJudge0ForResult(submissionToken);
          });
        })
        .catch((error) => {
          console.error('Error compiling code:', error);
        });
    }
  }
  
  async function pollJudge0ForResult(submissionToken: string) {//consider websockets
    fetchSubmission(submissionToken)
    .then((response) => {
      const { stdout } = response;
      setOutput(stdout);
      // if (status === "Processing") {
      //   // Submission is still processing; continue polling.
      //   setTimeout(() => pollJudge0ForResult(submissionToken), 1000);
      // }
    })
    .catch((error) => {
      // Handle errors, if necessary
      console.error('Error polling Judge0 for result:', error);
    });
  }
    
  function submitCode() {
    if (editorRef.current) {
      const attempt: string = editorRef.current.getValue();
      // setShowSubmitModal(false);
      setSaveAttemptData((prevData) => ({ ...prevData, attempt }));
      const submission = `${attempt}\n\n${updatedPythonDriver}`;
      const startTime = performance.now();
      axios
        .post("https://0.0.0.0:2358/submissions", {
          source_code: submission,
          language_id: langUsed,
        })
        .then((response) => {
          const submissionToken: string = response.data.token;
          waitFor3second().then(()=>
            {pollJudge0ForSubmission(submissionToken, startTime);}
          )
        })
        .catch((error) => {
          console.error("Error compiling code:", error);
        });
    }
  }

  function pollJudge0ForSubmission(submissionToken: string, startTime: number) {//consider websockets
    fetchSubmission(submissionToken)
    .then((response) => {
      const { stdout, memory } = response;
      setOutput(stdout);
      checkSolution(stdout, startTime, memory);
      // if (status === "Processing") {
      //   // Submission is still processing; continue polling.
      //   setTimeout(() => pollJudge0ForResult(submissionToken), 1000);
      // }
    })
    .catch((error) => {
      // Handle errors, if necessary
      console.error('Error polling Judge0 for submission:', error);
    });
  }
  const updateAttemptHandler = async (e:{preventDefault: () => void}) => {
    e.preventDefault();
    const updatedSaveAttemptData = {
      ...saveAttemptData,
    };
    try {
      await updateAttempt(qnid, langUsed, username, updatedSaveAttemptData);
      // setShowSaveModal(false);
      // setShowSubmitModal(true);
    } catch (error) {
      console.error("Failed to update attempt:", error);
    }  
  }
  const checkSolution = async (attemptedSolution: string, startTime: number, memory: number) =>{
    if (attemptedSolution) {
      const inputList: string[] = attemptedSolution.split('\n').filter(Boolean);
      if (arraysEqual(allOutputs, inputList)) {
        const endTime = performance.now();
        const elapsedTime = (endTime - startTime)/1000; //since in ms, need to work out the math again
        const updatedSaveAttemptData = {
          ...saveAttemptData,
          // status: "Completed",
          speed: elapsedTime, // Update speed with elapsedTime,
          memory: memory,
        };
        localStorage.setItem("memory", memory.toString())
        localStorage.setItem("speed", elapsedTime.toString())
        onSuccess();
        try {
          const response = await axios.put(`https://34.124.242.8:8080/tutorials/code/attempt/status/${qnid}/${langUsed}/${username}`, updatedSaveAttemptData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.status === 200) {
          } else {
          }
        } catch (error) {
          // console.error('An error occurred:', error);
        }  
      }
    } else {
      // console.error('Invalid input: attemptedSolution is null');
    }
  }
  const clearOutput = () => {
    setOutput("");
  }
  const saveAttemptHandler = async (e:{preventDefault: () => void}) => {
    e.preventDefault();
    try {
      await saveAttempt(saveAttemptData);
      // setShowSaveModal(false); // Close the save modal
      // setShowSubmitModal(true);
    } catch (error) {
      // console.error("Failed to save attempt:", error);
    }
  }
  const fetchPreviousAttempt = async () => {
    try {
      const response = await fetch(`https://34.124.242.8:8080/tutorials/code/attempt/${qnid}/${langUsed}/${username}`);
      const data = await response.json();
      const previousAttemptData: saveAttemptDataProps = data.data.data
      if (isEditorMounted && editorRef.current) {
        editorRef.current.setValue(previousAttemptData.attempt!);
        setCode(editorRef.current.getValue())
      } else {
        editorRef.current.setValue(pythonDefault!);
      }
      setSaveAttemptData(previousAttemptData);
      setLangUsed(previousAttemptData.language);
      setHasPreviousAttempt(true);
    } catch (err) {
      setHasPreviousAttempt(false);
    }
  };
  useEffect(() => {
    fetchPreviousAttempt();
  }, [qnid, langUsed, username, isEditorMounted]);
  const handleSkipIntroduction = () => {
    setCurrentStep(0);
    setSkipIntroduction(true);
    setShowRunModal(true); // Show the Save modal
  };

  const steps = [
    {
      content: (
        <div>
          Select the programming language from the dropdown menu.
        </div>
      ),
      buttonText: "Next",
    },
    {
      content: (
        <div>
          Write your code in the editor.
        </div>
      ),
      buttonText: "Next",
    },
    {
      content: (
        <div>
          Click the 'Run' button to compile and execute your code.
        </div>
      ),
      buttonText: "Next",
    },
    {
      content: (
        <div>
          Click the 'Save' button to save your progress
        </div>
      ),
      buttonText: "Next",
    },
    {
      content: (
        <div>
          If your code runs successfully, click the 'Submit' button to submit your solution.
        </div>
      ),
      buttonText: "Finish",
    },
  ];
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setSkipIntroduction(true); // Close the modal
      setShowRunModal(true); // Show the Save modal
    }
  };
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleCloseSaveModal = () => {
    setShowSaveModal(false);
    // if(hasPreviousAttempt) {updateAttemptHandler()}else { saveAttemptHandler()}
    setShowSubmitModal(true);
  };
  const handleCloseRunModal = () => {
    setShowRunModal(false);
    compileAndRunCode();
    setShowSaveModal(true);
  };
  const handleCloseSubmitModal = () => {
    setShowSubmitModal(false);
  };
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
      <Button onClick={hasPreviousAttempt? updateAttemptHandler: saveAttemptHandler} style={{ marginLeft: '8px' }}>Save</Button>
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
            <Button onClick={clearOutput} style={{ marginRight: '8px' }}>Clear</Button>
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
    <Modal isOpen={!skipIntroduction} onClose={() => {setSkipIntroduction(true); setShowRunModal(true)}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tutorial: How to use MonacoCode Editor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {steps[currentStep].content}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handlePreviousStep} isDisabled={currentStep === 0}>Previous</Button>
          <Button ml={3} onClick={handleNextStep}>{steps[currentStep].buttonText}</Button>
          <Checkbox isChecked={skipIntroduction} onChange={handleSkipIntroduction} style={{ marginLeft: 'auto' }}>Skip Introduction</Checkbox>
        </ModalFooter>
      </ModalContent>
    </Modal>
    <Modal isOpen={showRunModal} onClose={handleCloseRunModal} size="sm" useInert={false} >
      <ModalContent style={{ top: 500, left: 250, margin: '20px' }} >
        <ModalHeader>Test Run</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Please click the "Run" button.
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleCloseRunModal}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    <Modal isOpen={showSaveModal} onClose={handleCloseSaveModal} size="sm" useInert={false} >
      <ModalContent style={{ top: 0, left: 450, margin: '20px' }} >
        <ModalHeader>Test Save</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Please click the "Save" button to save your progress.
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleCloseSaveModal}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    <Modal isOpen={showSubmitModal} onClose={handleCloseSubmitModal} size="sm" useInert={false}>
      <ModalContent style={{ top: 5000, left: 300, margin: '20px' }} >
        <ModalHeader>Test Submit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Please click the "Submit" button to save your progress.
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleCloseSubmitModal}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </Box>
    </>
  );
}

export default MonacoEditor;
