import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import useAuth from "../../../../setup/hooks/useAuth";
import useSubmit from "../useSubmit";

const MonacoEditor = ({id}) => {

  const editorRef = useRef();
  const { auth } = useAuth();
  const username = auth.user;
  const [submit, isLoading, status, data] = useSubmit();

  const handleSubmit = () => {
    submit(id, editorRef.current.getValue(), 'java', username);
  }

  return (
    <>
      {(!isLoading && status===201)?<iframe
          className="overflow-scroll scrollbar-none flex-grow"
          srcDoc={data}
          width={"100%"}
          height={"100%"}
        ></iframe>:
        <div className=" h-[calc(100vh-84px)]">
          <Editor
            height="92%"
            width="100%"
            onMount={(editor) => {
              editorRef.current = editor;
            }}
            theme="vs-dark"
            defaultLanguage="java"
          />
          <div className="bg-white h-[8%] flex items-center rounded-t-sm">
            <button
              className="bg-green-500 w-20 h-8 px-2 py-1 rounded-md font-openSans ml-auto mx-4 overflow-hidden"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loader bottom-3">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default MonacoEditor;
