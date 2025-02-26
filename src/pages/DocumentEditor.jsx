import { useState, useRef } from "react";

const DocumentEditor = () => {
  const editorRef = useRef(null);

  const applyStyle = (command, value = null) => {
    if (editorRef.current) {
      document.execCommand(command, false, value);
      editorRef.current.focus();
    }
  };

  return (
    <div className="editor-container p-4 h-screen w-full flex flex-col">
      <div className="toolbar flex space-x-2 mb-2">
        <button onClick={() => applyStyle("bold")} className="px-2 py-1 border font-bold">B</button>
        <button onClick={() => applyStyle("italic")} className="px-2 py-1 border italic">I</button>
        <button onClick={() => applyStyle("underline")} className="px-2 py-1 border underline">U</button>
        <select onChange={(e) => applyStyle("fontSize", e.target.value)} className="px-2 py-1 border">
          <option value="1">Small</option>
          <option value="3">Medium</option>
          <option value="5">Large</option>
        </select>
        <select onChange={(e) => applyStyle("fontName", e.target.value)} className="px-2 py-1 border">
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="border p-2 flex-grow text-lg rounded-md resize overflow-auto w-full"
        style={{ border: "2px solid #ccc", borderRadius: "8px", minHeight: "500px" }}
      ></div>
    </div>
  );
};

export default DocumentEditor;
