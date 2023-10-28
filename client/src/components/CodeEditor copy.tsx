import React, { useRef, useEffect, useState } from 'react';
import MonacoEditor, { monaco } from 'react-monaco-editor';

const CodeEditor: React.FC = () => {

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [language, setLanguage] = useState<string>('javascript'); // Initial language

  const handleEditorChange = (newValue: string, e: any) => {
    console.log('Content changed:', newValue);
  };

  const options = {
    selectOnLineNumbers: true,
  };

  const editorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    if (editor) {
      editorRef.current = editor;
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.onDidChangeModelContent(() => {
        const newValue = editorRef.current!.getValue();
        handleEditorChange(newValue, null);
      });

      // Change the editor language when the 'language' state variable changes
      monaco.editor.setModelLanguage(editorRef.current.getModel()!, language);
    }
  }, [language]);

  // Function to change the language
  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const languageOptions = ['javascript', 'python', 'C++']; // Add more languages as needed

  return (
    <div>
      <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
        {languageOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <MonacoEditor
        width="800"
        height="800"
        language={language}
        theme="vs-dark"
        value="// Start coding here..."
        options={options}
        onChange={handleEditorChange}
        editorDidMount={editorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
