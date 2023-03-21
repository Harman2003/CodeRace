import React, { useState,useRef } from "react";
import { RxCross1 as X } from "react-icons/rx";
import { FaCode } from "react-icons/fa";
import Editor from "@monaco-editor/react";

const CodeModal = ({ setIsModal, setList }) => {
  const [isIssue, setIsIssue] = useState(false);
    const editorRef = useRef();
    
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/25 flex justify-center items-center">
      <div className="absolute z-10 flex flex-col w-[350px] p-3 h-96 bg-white rounded-lg shadow-2xl sm:w-[500px]">
        <X
          className="absolute right-3"
          onClick={() => {
            setIsModal("");
          }}
        />
        <div className="flex items-center font-bold text-2xl text-gray-700">
          <FaCode />
          <span className="mx-1">Add Code</span>
        </div>

        <div className="h-full mt-2">
          <Editor
            height="100%"
            width="100%"
            onMount={(editor) => {
              editorRef.current = editor;
              editorRef.current.getAction("editor.action.formatDocument").run();
            }}
            theme="vs-dark"
            defaultLanguage="java"
          />
        </div>

        <div className="flex items-center justify-end">
          {isIssue && (
            <div className="text-xs text-red-600 mr-3 mt-3">
              Add few lines of code !
            </div>
          )}
          <button
            className="btn-orange w-min mt-4"
            onClick={() => {
              if (!editorRef.current.getValue()) {
                setIsIssue(true);
                return;
                }
                setList(prev=> [...prev, {code: editorRef.current.getValue()}])
              setIsModal("");
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeModal;
