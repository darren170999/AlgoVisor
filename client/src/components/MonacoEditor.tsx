import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";

const files: any = {
    "script.py": {
        name: "script.py",
        language: "python",
        value: "Here is some python text"
    },
    "default.html" : {
        name: "default.html",
        language: "html",
        value: "<div> </div>"
    }
}
function MonacoEditor() {
    const [fileName, setFileName] = useState("script.py");
    const file = files[fileName];
    const editorRef = useRef(null);
    function handleEditorDidMount(editor: any, monaco: any){
        // if we need to reference this anywhere else in React we can call editorRef.current
        editorRef.current = editor; 
    }
    function getEditorValue(){
        if(editorRef.current){
            // editorRef.current.getValue();
        }
    }
    return(
        <>
            <Editor
            height="100vh"
            width="100%"
            theme="vs-dark"
            defaultLanguage={file.language}
            defaultValue={file.value}
            path={file.name}
            onMount={handleEditorDidMount}
            />
        </>
    )

}
export default MonacoEditor