import React, { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";

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

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  async function compileAndRunCode() {
    if (editorRef.current) {
      const codeToCompile: string = editorRef.current.getValue();
  
      try {
        const response = await axios.post("http://0.0.0.0:2358/submissions", {
          source_code: codeToCompile,
          language_id: 71,
        });
  
        // Handle the response from Judge0, which will include the token.
        const submissionToken: string = response.data.token;
  
        // Wait for the result and set the output
        await pollJudge0ForResult(submissionToken);
      } catch (error) {
        console.error("Error compiling code:", error);
      }
    }
  }
  
  async function pollJudge0ForResult(submissionToken: string) {
    try {
      while (true) {
        const response = await axios.get(
          `http://0.0.0.0:2358/submissions/${submissionToken}`
        );
  
        const status: string = response.data.status.description;
  
        if (status === "Processing") {
          // Submission is still processing; continue polling.
          await new Promise((resolve) => setTimeout(resolve, 10000));
        } else if (status === "Accepted") {
          // Submission is accepted, retrieve the output.
          const submissionOutput: string = response.data.stdout;
          setOutput(submissionOutput);
          break; // Exit the loop once the output is available.
        } else {
          // Handle other submission statuses as needed.
          console.error("Submission status:", status);
          break; // Exit the loop on other statuses as well.
        }
      }
    } catch (error) {
      console.error("Error polling Judge0:", error);
    }
  }

//   function pollJudge0ForResult(submissionToken: string) {
//     // Implement a function to poll Judge0 for the result of the submission.
//     // You can use a timer or WebSocket to check the status of the submission and get the output.
//     // Example code for polling Judge0:
//     axios
//       .get(`http://0.0.0.0:2358/submissions/${submissionToken}`)
//       .then((response) => {
//         const status: string = response.data.status.description;

//         if (status === "Processing") {
//           // Submission is still processing; continue polling.
//           setTimeout(() => pollJudge0ForResult(submissionToken), 10000);
//         } else if (status === "Accepted") {
//           // Submission is accepted, retrieve the output.
//           const submissionOutput: string = response.data.stdout;
//           setOutput(submissionOutput);
//         } else {
//           // Handle other submission statuses as needed.
//           console.error("Submission status:", status);
//         }
//       })
//       .catch((error) => {
//         console.error("Error polling Judge0:", error);
//       });
//   }

  return (
    <>
      <button onClick={compileAndRunCode}>Compile and Run</button>
      <Editor
        height="100vh"
        width="100%"
        theme="vs-dark"
        defaultLanguage={file.language}
        defaultValue={file.value}
        path={file.name}
        onMount={handleEditorDidMount}
      />
      <div>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </>
  );
}

export default MonacoEditor;
