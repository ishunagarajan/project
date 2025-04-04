import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/editor.css";

const Editor = () => {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState("16px");
  const [fontStyle, setFontStyle] = useState("Arial");
  const [color, setColor] = useState("#000000");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const fileName = params.get("file") || "Untitled.txt";

  useEffect(() => {
    const storedContent = sessionStorage.getItem("fileContent");
    if (storedContent) {
      setText(storedContent);
    }
  }, []); // Load file content when editor mounts

  const handleDownload = () => {
    let name = fileName.trim();
    
    // Ensure it ends with .txt
    if (!name.toLowerCase().endsWith(".txt")) {
      name += ".txt";
    }
  
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
  };
  

  return (
    <div className="editor-container" style={{ backgroundColor: "#808080" }}>
      {/* Toolbar */}
      <div className="toolbar">
        <button onClick={() => setBold(!bold)} style={{ fontWeight: bold ? "bold" : "normal", color: "white" }}>
          B
        </button>
        <button onClick={() => setItalic(!italic)} style={{ fontStyle: italic ? "italic" : "normal", color: "white" }}>
          I
        </button>
        <button onClick={() => setUnderline(!underline)} style={{ textDecoration: underline ? "underline" : "none", color: "white" }}>
          U
        </button>

        <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
          <option value="14px">14</option>
          <option value="16px">16</option>
          <option value="18px">18</option>
          <option value="20px">20</option>
          <option value="24px">24</option>
        </select>

        <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)}>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
        </select>

        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>

      {/* Text Box */}
      <textarea
        className="text-editor"
        style={{
          fontSize: fontSize,
          fontFamily: fontStyle,
          color: color,
          fontWeight: bold ? "bold" : "normal",
          fontStyle: italic ? "italic" : "normal",
          textDecoration: underline ? "underline" : "none",
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing your document..."
      ></textarea>

      {/* Download Button */}
      <button className="download-btn" onClick={handleDownload}>
        Save & Download
      </button>
    </div>
  );
};

export default Editor;
