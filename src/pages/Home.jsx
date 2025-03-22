import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css"; // Ensure you create/update Home.css

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "create" or "edit"
  const [docName, setDocName] = useState("");
  const navigate = useNavigate();

  const handleCreateDocument = () => {
    if (docName.trim() !== "") {
      navigate(`/editor?name=${encodeURIComponent(docName)}`);
      setShowModal(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        sessionStorage.setItem("fileContent", e.target.result); // Store file content
        sessionStorage.setItem("fileName", file.name); // Store file name
        navigate(`/editor?file=${encodeURIComponent(file.name)}`);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <h1 className="home-title">Welcome to DocCollab</h1>
      <p className="home-subtitle">
        Online, collaborative documents that help you and your team create and work together.
      </p>

      {/* Features Section */}
      <div className="features">
        <div className="feature-card">
          <h3>Live Editing</h3>
          <p>See changes as they happen with real-time collaboration.</p>
        </div>
        <div className="feature-card">
          <h3>Multi-User Access</h3>
          <p>Work with your team members on the same document simultaneously.</p>
        </div>
        <div className="feature-card">
          <h3>Version Control</h3>
          <p>Track changes and revert to previous versions easily.</p>
        </div>
        <div className="feature-card">
          <h3>Real-Time Sync</h3>
          <p>Your documents update instantly across all devices.</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="button-container">
        <button
          className="action-btn create"
          onClick={() => {
            setModalType("create");
            setShowModal(true);
          }}
        >
          + Create New Document
        </button>
        <button
          className="action-btn edit"
          onClick={() => {
            setModalType("edit");
            setShowModal(true);
          }}
        >
          ✏️ Edit Existing Document
        </button>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {modalType === "create" ? (
              <>
                <h2>Enter Document Name</h2>
                <input
                  type="text"
                  placeholder="Enter document name..."
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="modal-input"
                />
                <div className="modal-buttons">
                  <button className="confirm-btn" onClick={handleCreateDocument}>
                    Confirm
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>Select a Document to Edit</h2>
                <input
                  type="file"
                  accept=".txt,.doc,.docx"
                  onChange={handleFileSelect}
                  className="file-input"
                />
              </>
            )}
            <button className="cancel-btn" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
